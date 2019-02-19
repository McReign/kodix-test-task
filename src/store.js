import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import uuid from 'uuid';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carsData: [],
        filteredCarsData: []
    },
    getters: {
        getCarsData (state, getters) {
            return state.carsData
        },
        getFilteredCarsData (state, getters) {
            return state.filteredCarsData
        }
    },
    mutations: {
        setCarsData (state, payload) {
            state.carsData = payload
        },
        setFilteredCarsData (state, payload) {
            state.filteredCarsData = payload
        },
        removeCar (state, payload) {
            state.carsData = state.carsData.filter(item => item.id.toString() !== payload.id.toString())
        },
        addCar (state, payload) {
            state.carsData.push(payload)
        }
    },
    actions: {
        removeCar ({commit, state, getters}, payload) {
            return new Promise((res, rej) => {
                commit('removeCar', payload)
                commit('setFilteredCarsData', state.carsData)
                res(state.filteredCarsData)
            })
        },
        addCar ({commit, state, getters}, payload) {
            return new Promise((res, rej) => {
                commit('addCar', {...payload, id: uuid.v4(), color: payload.colors[0]})
                commit('setFilteredCarsData', state.carsData)
                console.log('filtered', state.filteredCarsData)
                res(state.filteredCarsData)
            })
        },
        loadCarsData ({commit, state, getters}, payload) {
            let url = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json'

            return axios.get(url)
                .then((response) => {
                    commit('setCarsData', response.data)
                    commit('setFilteredCarsData', response.data)
                    return response.data
                })
        },
        loadFilteredCarsData ({commit, state, getters}, payload) {
            return new Promise((res, rej) => {
                commit('setFilteredCarsData', state.carsData.filter(item => {
                    return (
                        (payload.title ? item.title === payload.title : true) &&
                        (payload.year ? +item.year === +payload.year : true) &&
                        (payload.price ? +item.price === +payload.price : true) &&
                        (payload.desc ? item.description.indexOf(payload.desc) !== -1 : true) &&
                        (payload.colors.length ? payload.colors.includes(item.color) : true) &&
                        (payload.status ? item.status === payload.status : true)
                    )
                }))
                res(state.filteredCarsData)
            })
        }
    }
})
