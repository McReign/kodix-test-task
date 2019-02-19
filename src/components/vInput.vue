<template>
    <div :class="{'v-input-container': true, 'invalid': invalid}" :style="{height, width}">
        <input
            class="v-input"
            :type="type"
            :disabled="disabled"
            :value="ownValue"
            :min="min"
            :max="max"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
            @input="handleInput"
            @change="handleChange"
        >
        <label :class="{'label': true, 'shown': focused || ownValue}">{{placeholder}}</label>
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
                default: '100%'
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
                type: [String, Number]
            },
            min: {
                type: [String, Number]
            },
            invalid: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                focused: false,
                ownValue: ''
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

                this.ownValue = value
                this.$emit('input', value)
            },
            handleChange (e) {
                let value = e.target.value

                if (this.type === 'number' && value) {
                    +value > +this.max ?
                        value = this.max.toString()
                        : +value < +this.min ?
                        value = this.min.toString()
                        : null
                }

                this.ownValue = value
                this.$emit('input', value)
            }
        },
        created () {
            if (this.value) {
                this.ownValue = this.value
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-input-container {
        position: relative;

        &.invalid {
            .label {
                color: #c4092f;
            }

            .v-input {
                border-bottom-color: #c4092f;
            }
        }

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