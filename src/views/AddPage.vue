<template>
    <div class="add-page">
        <div class="content">
            <div class="content__header">
                <v-button class="cancel-btn" @click="handleCancel" width="160px" role="secondary">
                    Отмена
                </v-button>
                <div class="title"><span>Добавление</span></div>
            </div>
            <div class="content__form">
                <div class="form-item name">
                    <v-input placeholder="Название" :value="title" @input="handleNameChange" :invalid="!titleIsValid"/>
                </div>
                <div class="form-item year">
                    <v-input type="number" placeholder="Год" :value="year" @input="handleYearChange" :invalid="!yearIsValid"/>
                </div>
                <div class="form-item price">
                    <v-input type="number" placeholder="Цена" :value="price" @input="handlePriceChange" :invalid="!priceIsValid"/>
                </div>
                <div class="form-item desc">
                    <v-input placeholder="Описание" :value="desc" @input="handleDescChange"/>
                </div>
                <div class="form-item colors">
                    <v-color-picker :colors="colors" :values="colorsValues" @select="handleColorsSelect"/>
                </div>
                <div class="form-item status">
                    <v-select placeholder="Статус" :values="values" :value="status" @change="handleStatusChange"/>
                </div>
                <div class="form-item send-btn-container">
                    <v-button class="send-btn" @click="handleAdd">
                        Добавить
                        <img class="right-arrow-icon" src="../assets/arrow_right.svg">
                    </v-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import uuid from 'uuid';
    import vInput from '../components/vInput.vue';
    import vSelect from '../components/vSelect.vue';
    import vButton from '../components/vButton.vue';
    import vColorPicker from '../components/vColorPicker.vue';
    import vList from '../components/vList.vue';
    import vListMobile from '../components/vListMobile.vue';

    export default {
        name: 'add-page',
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
                titleIsValid: true,
                yearIsValid: true,
                priceIsValid: true
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
            handleCancel () {
                this.$router.push('/')
            },
            handleAdd () {
                !this.title ? this.titleIsValid = false :  this.titleIsValid = true
                !this.year ? this.yearIsValid = false :  this.yearIsValid = true
                !this.price ? this.priceIsValid = false :  this.priceIsValid = true

                if (this.titleIsValid && this.yearIsValid && this.priceIsValid) {
                    this.$store.dispatch('addCar', {
                        id: uuid.v4(),
                        title: this.title,
                        year: this.year,
                        price: this.price,
                        description: this.desc,
                        color: this.colorsValues[0],
                        status: this.status ? this.status : 'in_stock',
                    })
                        .then(resp => {
                            this.$router.push('/')
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .add-page {
        flex: 1 0 auto;

        .content {
            max-width: 720px;
            height: 100%;
            margin: 0 auto;
            
            &__header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                padding: 60px 0;

                .title {
                    span {
                        color: #282d30;
                        font-size: 42px;
                        font-weight: 700;
                        line-height: 42px;
                    }
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

            @media all and (max-width: 740px) {
                padding: 0 10px;

                &__form {
                    margin-bottom: 40px;
                }
            }

            @media all and (max-width: 506px) {
                padding: 0 10px;

                .cancel-btn {
                    width: 100%;
                    margin-bottom: 20px;
                }

                .title {
                    width: 100%;
                }

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

            }
        }
    }

</style>
