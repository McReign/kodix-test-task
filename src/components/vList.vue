<template>
    <div class="v-list">
        <div class="header">
            <div class="header__title" v-for="item in headers">{{item}}</div>
            <div class="header__title"></div>
        </div>
        <div class="content">
            <v-list-item v-for="item in data" v-bind="item" :key="item.id"/>
            <div class="no-data" v-if="data.length === 0">Данных нет</div>
        </div>
    </div>
</template>

<script>
    import vListItem from './vListItem.vue';

    export default {
        name: "vList",
        components: {
            'v-list-item': vListItem
        },
        props: {
            headers: {
                type: Array,
                default: () => []
            },
            data: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-list {
        display: table;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;

        .header {
            display: table-header-group;

            &__title {
                display: table-cell;
                background-color: #c4092f;
                padding: 15px;
                color: #ffffff;
                font-size: 15px;
                font-weight: 500;
            }
        }

        .content {
            display: table-row-group;

            .no-data {
                padding: 15px;
                opacity: 0.6;
            }
        }

        @media all and (max-width: 740px) {
            display: none;
        }
    }
</style>