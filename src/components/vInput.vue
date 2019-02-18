<template>
    <div class="v-input-container" :style="{height, width}">
        <input
            class="v-input"
            :type="type"
            :disabled="disabled"
            :value="value"
            :min="min"
            :max="max"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
            @input="handleInput"
        >
        <label :class="{'label': true, 'shown': focused || value}">{{placeholder}}</label>
    </div>
</template>

<script>
    export default {
        name: "vInput",
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: '40px'
            },
            width: {
                type: String,
                default: '260px'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            max: {
                type: String
            },
            min: {
                type: String
            }
        },
        data () {
            return {
                focused: false
            }
        },
        methods: {
            handleInputFocus () {
                this.focused = true
            },
            handleInputBlur () {
                this.focused = false
            },
            handleInput (e) {
                let value = e.target.value

                // Make it works //////////////////////////////////////////////
                // console.log(+this.value, +this.min, +this.value, +this.max)

                // if (this.type === 'number') {
                //     +this.value < +this.min ?
                //         value = this.min
                //         : +this.value > +this.max ?
                //             value = this.max
                //             : null
                // }

                this.$emit('input', value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-input-container {
        position: relative;

        .label {
            position: absolute;
            display: flex;
            align-items: center;
            top: 0;
            height: 100%;
            color: #999999;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            padding: 5px 10px;
            box-sizing: border-box;
            pointer-events: none;
            transition: .2s;

            &.shown {
                height: auto;
                top: -70%;
            }
        }

        .v-input {
            width: 100%;
            height: 100%;
            padding: 0 10px;
            color: #111111;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            border: 1px solid #dcdcdc;
            border-bottom-width: 2px;
            outline: none;
            box-sizing: border-box;
            transition: .2s;

            &:hover {
                border-bottom-color: #c4092f;
            }

            &:focus {
                border-bottom-color: #111111;
            }
        }
    }
</style>