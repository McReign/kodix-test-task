<template>
    <div class="v-list-item">
        <div class="v-list-item__cell title">
            <div>{{title}}</div>
            <div class="description" v-if="description">{{description}}</div>
        </div>
        <div class="v-list-item__cell year">{{year}}</div>
        <div class="v-list-item__cell color">
            <v-color-item :color="{value: getColorValueByName}" />
        </div>
        <div class="v-list-item__cell status">{{getStatusNameByValue}}</div>
        <div class="v-list-item__cell price">{{price}}</div>
        <div class="v-list-item__cell remove">
            <div class="remove-btn" @click="remove">Удалить</div>
        </div>
    </div>
</template>

<script>
    import vColorItem from './vColorItem';

    export default {
        name: "vListItem",
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
        font-size: 15px;

        &__cell {
            display: table-cell;
            vertical-align: top;
            padding: 15px;
            border-bottom: 1px solid #e6e9ea;

            &.title {
                color: #323232;

                .description {
                    font-size: 13px;
                    color: #8b9497;
                    margin-top: 4px;
                }
            }

            &.year {
                color: #282d30;
            }

            &.price {
                color: #282d30;
            }

            &.status {
                color: #282d30;
            }

            &.color {
                text-align: center;
            }

            &.remove {
                padding: 10px;

                .remove-btn {
                    display: inline-block;
                    height: 30px;
                    padding: 0 20px;
                    border-radius: 20px;
                    font-size: 14px;
                    color: #8b9497;
                    line-height: 30px;
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