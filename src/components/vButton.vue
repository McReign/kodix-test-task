<template>
    <div class="v-button" :style="{height, width}" @click="handleClick">
        <slot>Подтвердить</slot>
    </div>
</template>

<script>
    export default {
        name: "vButton",
        props: {
            type: {
                type: String,
                default: 'button'
            },
            height: {
                type: String,
                default: '40px'
            },
            width: {
                type: String,
                default: '100%'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleClick () {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background-color: #c4092f;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
        line-height: 36px;
        text-transform: uppercase;
        transition: .2s;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
            background-color: darken(#c4092f, 4%);
        }

        &:active {
            background-color: darken(#c4092f, 10%);
        }
    }
</style>