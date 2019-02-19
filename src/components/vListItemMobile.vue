<template>
    <div class="v-list-item">
        <div class="v-list-item__cell">
            <div class="main-info">
                <div class="title">
                    <div>{{title}}</div>
                </div>
                <div class="color">
                    <v-color-item :color="{value: getColorValueByName}" />
                </div>
                <div class="price">{{price}}</div>
            </div>
            <div class="additional-info">
                <div class="description" v-if="description">{{description}}</div>
            </div>
            <div class="footer-info">
                <div class="year">{{year}}</div>
                <div class="status">{{getStatusNameByValue}}</div>
                <div class="remove">
                    <div class="remove-btn" @click="remove">Удалить</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vColorItem from './vColorItem';

    export default {
        name: "vListItemMobile",
        components: {
            'v-color-item': vColorItem
        },
        props: {
            id: {
                type: [String, Number]
            },
            title: {
                type: [String, Number]
            },
            description: {
                type: [String, Number]
            },
            year: {
                type: [String, Number]
            },
            color: {
                type: [String, Number]
            },
            status: {
                type: [String, Number]
            },
            price: {
                type: [String, Number]
            }
        },
        computed: {
            getStatusNameByValue () {
                switch (this.status) {
                    case 'pednding':
                        return 'Ожидается'
                    case 'out_of_stock':
                        return 'Нет в наличии'
                    case 'in_stock':
                        return 'В наличии'
                }
            },
            getColorValueByName () {
                switch (this.color) {
                    case 'red':
                        return '#d74345'
                    case 'white':
                        return '#ffffff'
                    case 'black':
                        return '#000000'
                    case 'green':
                        return '#88c504'
                    case 'grey':
                        return '#cbcbcc'
                }
            }
        },
        methods: {
            remove () {
                this.$store.dispatch('removeCar', {id: this.id})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-list-item {
        display: table-row;
        background-color: #f5f6f6;
        color: #282d30;
        font-size: 14px;
        font-weight: 300;

        &__cell {
            display: table-cell;
            vertical-align: top;
            padding: 15px;
            border-bottom: 1px solid #e6e9ea;

            .main-info, .additional-info {
                display: flex;
                align-items: flex-start;
            }

            .main-info {
                margin-bottom: 10px;
            }

            .footer-info {
                display: flex;
                align-items: center;
            }

            .title {
                width: 60%;
                color: #323232;
            }

            .description {
                font-size: 13px;
                color: #8b9497;
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .year {
                width: 20%;
                color: #282d30;
            }

            .price {
                width: 20%;
                text-align: right;
                padding-left: 10px;
                color: #282d30;
            }

            .status {
                width: 40%;
                color: #282d30;
            }

            .color {
                width: 20%;
                text-align: right;
            }

            .remove {
                display: flex;
                justify-content: flex-end;
                width: 40%;

                .remove-btn {
                    display: flex;
                    align-items: center;
                    height: 30px;
                    width: fit-content;
                    padding: 0 20px;
                    border-radius: 20px;
                    font-size: 14px;
                    color: #8b9497;
                    transition: .2s;
                    cursor: pointer;

                    &:hover {
                        background-color: #282d30;
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>