<template>
    <div class="v-list">
        <div class="content">
            <v-list-item-mobile v-for="item in data" v-bind="item" :key="item.id"/>
            <div class="no-data" v-if="data.length === 0">Данных нет</div>
        </div>
    </div>
</template>

<script>
    import vListItemMobile from './vListItemMobile.vue';

    export default {
        name: "vListMobile",
        components: {
            'v-list-item-mobile': vListItemMobile
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

        @media all and (min-width: 740px) {
            display: none;
        }
    }
</style>