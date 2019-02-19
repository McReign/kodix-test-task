<template>
    <div class="v-select-container" :style="{height, width}">
        <div
            :class="{'v-select': true, 'focused': focused}"
            :disabled="disabled"
            @click="handleSelectClick"
        >
            <div class="selected-item">
                {{getNameByValue(ownValue)}}
            </div>
            <img class="down-icon" src="../assets/arrow_down.svg">
        </div>
        <div :class="{'v-select-list': true, 'shown': focused}" @click="handleSelectListClick">
            <div v-for="(item, index) in values" class="list-item" @click="(e) => handleSelect(e, item)" :key="item.value">
                {{item.name}}
            </div>
        </div>
        <label :class="{'label': true, 'label_shown': hasSelected}">{{placeholder}}</label>
    </div>
</template>

<script>
    import { EventBus } from "../main";

    export default {
        name: "vSelect",
        props: {
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
            values: {
                type: Array,
                default: () => []
            },
            value: {
                type: String
            }
        },
        data () {
            return {
                focused: false,
                hasSelected: false,
                ownValue: ''
            }
        },
        methods: {
            handleSelectClick (e) {
                e.stopPropagation()
                this.focused = !this.focused
            },
            handleSelectListClick (e) {
                e.stopPropagation()
                this.focused = true
            },
            handleClose (e) {
                this.focused = false
            },
            handleSelect (e, item) {
                e.stopPropagation()
                this.focused = false
                this.ownValue = item.value
                this.hasSelected = true
                this.$emit('change', item)
            },
            getListItemByValue (value) {
                return this.values.filter(item => item.value === value)[0]
            },
            getNameByValue (value) {
                let listItem = this.getListItemByValue(value)
                return listItem ? listItem.name : ''
            }
        },
        created () {
            EventBus.$on('background-click', this.handleClose)

            if (this.value) {
                this.hasSelected = true
                this.ownValue = this.value
            }
        },
        destroyed () {
            EventBus.$off('background-click', this.handleClose)
        }
    }
</script>

<style lang="scss" scoped>
    .v-select-container {
        position: relative;
        cursor: pointer;

        .phantom-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            box-sizing: border-box;
            opacity: 0;
            cursor: pointer;
        }

        .selected-item {
            display: flex;
            align-items: center;
            height: 100%;
            pointer-events: none;
        }

        .down-icon {
            position: absolute;
            width: 12px;
            top: 0;
            right: 10px;
            height: 100%;
            pointer-events: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
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

            &_shown {
                height: auto;
                top: -70%;
            }
        }

        .v-select {
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
            z-index: 100;

            &:hover {
                border-bottom-color: #c4092f;
            }

            &.focused {
                border-bottom-color: #111111;
            }
        }

        .v-select-list {
            visibility: hidden;
            width: 100%;
            max-height: 180px;
            border: 1px solid #dcdcdc;
            border-top: none;
            background-color: #ffffff;
            padding: 10px;
            opacity: 0;
            box-sizing: border-box;
            overflow: auto;
            transform: translateY(-10%);
            transition: .2s;
            z-index: 90;

            &.shown {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
            }

            .list-item {
                color: #999999;
                font-size: 12px;
                font-weight: 400;
                line-height: 18px;
                transition: .2s;

                &:not(:last-child) {
                    padding-bottom: 10px;
                }

                &:hover {
                    color: #000000;
                }
            }
        }
    }
</style>