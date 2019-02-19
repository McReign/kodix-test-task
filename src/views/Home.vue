<template>
    <div class="home">
        <div class="content">
            <div class="content__title"><span>¡Ay caramba!</span></div>
            <div class="content__form">
                <div class="form-item add-btn-container">
                    <v-button class="add-btn" @click="handleAdd" role="secondary">
                        Добавить автомобиль
                    </v-button>
                </div>
                <div class="form-item name">
                    <v-input placeholder="Название" :value="title" @input="handleNameChange"/>
                </div>
                <div class="form-item year">
                    <v-input
                        type="number"
                        placeholder="Год"
                        :value="year"
                        min="1000"
                        :max="new Date().getFullYear()"
                        @input="handleYearChange"
                    />
                </div>
                <div class="form-item price">
                    <v-input type="number" placeholder="Цена" :value="price" @input="handlePriceChange"/>
                </div>
                <div class="form-item desc">
                    <v-input placeholder="Описание" :value="desc" @input="handleDescChange"/>
                </div>
                <div class="form-item colors">
                    <v-color-picker :colors="colors" mode="multiple" :values="colorsValues" @select="handleColorsSelect"/>
                </div>
                <div class="form-item status">
                    <v-select placeholder="Статус" :values="values" :value="status" @change="handleStatusChange"/>
                </div>
                <div class="form-item send-btn-container">
                    <v-button class="send-btn" @click="handleSend">
                        Отфильтровать
                        <img class="right-arrow-icon" src="../assets/arrow_right.svg">
                    </v-button>
                </div>
            </div>
            <div class="content__cars-list">
                <div class="title">
                    <div class="marker"></div>
                    Автомобили в наличии
                </div>
                <v-list :headers="carsHeaders" :data="getCarsData"/>
                <v-list-mobile :data="getCarsData"/>
            </div>
        </div>
    </div>
</template>

<script>
    import vInput from '../components/vInput.vue';
    import vSelect from '../components/vSelect.vue';
    import vButton from '../components/vButton.vue';
    import vColorPicker from '../components/vColorPicker.vue';
    import vList from '../components/vList.vue';
    import vListMobile from '../components/vListMobile.vue';

    export default {
        name: 'home',
        components: {
            'v-input': vInput,
            'v-select': vSelect,
            'v-button': vButton,
            'v-color-picker': vColorPicker,
            'v-list': vList,
            'v-list-mobile': vListMobile
        },
        data () {
            return {
                title: '',
                year: '',
                price: '',
                desc: '',
                colorsValues: [],
                status: null,
                values: [
                    {
                        value: 'in_stock',
                        name: 'В наличии'
                    },
                    {
                        value: 'pednding',
                        name: 'Ожидается'
                    },
                    {
                        value: 'out_of_stock',
                        name: 'Нет в наличии'
                    }
                ],
                colors: [
                    {
                        name: 'white',
                        value: '#ffffff'
                    },
                    {
                        name: 'black',
                        value: '#000000'
                    },
                    {
                        name: 'grey',
                        value: '#cbcbcc'
                    },
                    {
                        name: 'red',
                        value: '#d74345'
                    },
                    {
                        name: 'green',
                        value: '#88c504'
                    }
                ],
                carsHeaders: ['Название', 'Год', 'Цвет', 'Статус', 'Цена']
            }
        },
        computed: {
            getCarsData () {
                return this.$store.getters['getFilteredCarsData']
            }
        },
        methods: {
            handleNameChange (value) {
                this.title = value
            },
            handleYearChange (value) {
                this.year = value
            },
            handlePriceChange (value) {
                this.price = value
            },
            handleDescChange (value) {
                this.desc = value
            },
            handleColorsSelect (values) {
                this.colorsValues = values.map(item => item.name)
            },
            handleStatusChange (value) {
                this.status = value.value
            },
            handleSend () {
                this.$store.dispatch('loadFilteredCarsData', {
                    title: this.title,
                    year: this.year,
                    price: this.price,
                    desc: this.desc,
                    colors: this.colorsValues,
                    status: this.status,
                })
            },
            handleAdd () {
                this.$router.push('/add')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        flex: 1 0 auto;

        .content {
            max-width: 720px;
            height: 100%;
            margin: 0 auto;
            
            &__title {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 60px 0;

                span {
                    color: #282d30;
                    font-size: 42px;
                    font-weight: 700;
                    line-height: 42px;
                }
            }

            &__form {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-left: -10px;
                margin-right: -10px;
                margin-bottom: 158px;

                .form-item {
                    margin-bottom: 30px;
                    padding: 0 10px;

                    &.name {
                        flex-grow: 1;
                    }

                    &.year {
                        flex-grow: 1;
                    }

                    &.price {
                        flex-grow: 1;
                    }

                    &.desc {
                        width: 100%;
                        flex-grow: 1;
                    }

                    &.colors {
                        flex-grow: 1;
                    }

                    &.status {
                        flex-grow: 1;
                    }

                    &.send-btn-container {
                        flex-grow: 1;
                    }

                    &.add-btn-container {
                        width: 100%;
                        flex-grow: 1;
                    }
                }

                .send-btn {
                    .right-arrow-icon {
                        margin-left: 8px;
                    }
                }
            }

            &__cars-list {
                margin-bottom: 158px;

                .title {
                    display: flex;
                    align-items: center;
                    color: #282d30;
                    font-size: 20px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 28px;

                    .marker {
                        width: 3px;
                        height: 18px;
                        background-color: #8b9497;
                        margin-right: 10px;
                    }
                }
            }

            @media all and (max-width: 740px) {
                padding: 0 10px;

                &__form {
                    margin-bottom: 40px;
                }

                &__cars-list {
                    margin-bottom: 60px;
                }
            }

            @media all and (max-width: 506px) {
                padding: 0 10px;

                .form-item {
                    &.name {
                        width: 100%;
                        flex-grow: 1;
                    }

                    &.year {
                        flex-grow: 1;
                    }

                    &.price {
                        flex-grow: 1;
                    }

                    &.desc {
                        width: 100%;
                        flex-grow: 1;
                    }

                    &.colors {
                        width: 100%;
                        flex-grow: 1;
                    }

                    &.status {
                        flex-grow: 1;
                    }

                    &.send-btn-container {
                        flex-grow: 1;
                    }
                }

                &__cars-list {
                    margin-bottom: 0;
                    margin-left: -10px;
                    margin-right: -10px;

                    .title {
                        display: none;
                    }
                }
            }
        }
    }

</style>
