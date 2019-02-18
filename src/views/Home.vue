<template>
    <div class="home">
        <div class="content">
            <div class="content__title"><span>¡Ay caramba!</span></div>
            <v-select placeholder="Статус" :values="values" @change="handleStatusChange"/>
            <!--<v-button class="send-btn" @click="handleSend">-->
                <!--Отправить-->
                <!--<img class="right-arrow-icon" src="../assets/arrow_right.svg">-->
            <!--</v-button>-->
            <!--<v-color-picker :colors="colors" />-->
        </div>
    </div>
</template>

<script>
    import vInput from '../components/vInput.vue';
    import vSelect from '../components/vSelect.vue';
    import vButton from '../components/vButton.vue';
    import vColorPicker from '../components/vColorPicker.vue';

    export default {
        name: 'home',
        components: {
            'v-input': vInput,
            'v-select': vSelect,
            'v-button': vButton,
            'v-color-picker': vColorPicker
        },
        data () {
            return {
                name: '234',
                status: null,
                value: "In stock",
                values: [
                    {
                        value: 'In stock',
                        name: 'В наличии'
                    },
                    {
                        value: 'Waiting',
                        name: 'Ожидается'
                    },
                    {
                        value: 'Not in stock',
                        name: 'Нет в наличии'
                    }
                ],
                colors: ['#ffffff', '#000000', '#cbcbcc', '#d74345', '#88c504'],
            }
        },
        methods: {
            handleNameChange (value) {
                this.name = value
            },
            handleStatusChange (value) {
                this.status = value
                this.value = value.value
            },
            handleSend () {
                console.log('Sended')
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

            .send-btn {
                .right-arrow-icon {
                    margin-left: 8px;
                }
            }
        }
    }

</style>
