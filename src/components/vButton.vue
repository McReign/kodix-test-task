<template>
    <div :class="{'v-button': true, [role]: true }" :style="{height, width}" @click="handleClick">
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
            },
            role: {
                type: String,
                default: 'primary'
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
        font-size: 16px;
        font-weight: 700;
        line-height: 36px;
        text-transform: uppercase;
        transition: .2s;
        cursor: pointer;
        box-sizing: border-box;

        &.primary {
            background-color: #c4092f;
            color: #ffffff;

            &:hover {
                background-color: darken(#c4092f, 4%);
            }

            &:active {
                background-color: darken(#c4092f, 10%);
            }
        }

        &.secondary {
            background-color: #ffffff;
            color: #282d30;
            border: 2px solid #c4092f;

            &:hover {
                background-color: darken(#ffffff, 1%);
            }

            &:active {
                background-color: darken(#ffffff, 4%);
            }
        }
    }
</style>