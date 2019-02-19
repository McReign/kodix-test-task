<template>
    <div
        :class="{'color-item': true, 'selected': selected}"
        :style="{'background-color': color.value}"
        @click="handleSelect"
    ></div>
</template>

<script>
    export default {
        name: "vColorItem",
        props: {
            color: {
                type: Object,
                default: () => ({
                    name: 'white',
                    value: '#ffffff'
                })
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleSelect () {
                this.$emit('select', this.color.name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .color-item {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        border: 1px solid #dddddd;
        border-radius: 50%;
        cursor: pointer;

        &.selected {
            &::before {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                width: 28px;
                height: 28px;
                background-color: #c4092f;
                border-radius: 50%;
                z-index: -1;
            }
        }
    }
</style>