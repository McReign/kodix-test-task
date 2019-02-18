<template>
    <div class="v-color-picker">
        <label class="label">{{label}}</label>
        <div class="colors-list">
            <div class="colors-line" v-for="(line, lineNumber) in getLinesCount">
                <div
                    :class="{'color-item': true, 'selected': checkSelected(item)}"
                    v-for="item in getSplitedColors[lineNumber]"
                    :style="{'background-color': item}"
                    @click="handleSelect(item)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vColorPicker",
        props: {
            label: {
                type: String,
                default: 'Цвет'
            },
            colors: {
                type: Array,
                default: () => []
            },
            values: {
                type: Array,
                default: () => []
            },
            maxLineSize: {
                type: String,
                default: '5'
            }
        },
        data () {
            return {
                ownValues: []
            }
        },
        computed: {
            getLinesCount () {
                return Math.ceil(this.colors.length / +this.maxLineSize)
            },
            getSplitedColors () {
                return [].concat.apply([],
                    this.colors.map((elem, index) => {
                        return index % +this.maxLineSize ? [] : [this.colors.slice(index,index + +this.maxLineSize)];
                    })
                )
            }
        },
        methods: {
            checkSelected (item) {
                return this.ownValues.includes(item)
            },
            handleSelect (item) {
                this.ownValues.includes(item) ?
                    this.ownValues = this.ownValues.filter(color => color !== item)
                    : this.ownValues.push(item)

                this.$emit('select', this.ownValues)
            }
        },
        created() {
            if (this.values.length) {
                this.ownValues = [...this.values]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-color-picker {

        .label {
            display: block;
            color: #999999;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            margin-bottom: 10px;
            transition: .2s;
        }

        .colors-list {

            .colors-line {
                display: flex;
                align-items: center;
                margin-bottom: 4px;

                &:last-child {
                    margin-bottom: 0;
                }

                .color-item {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 50%;
                    margin: 0 12px;
                    cursor: pointer;

                    &:first-child {
                        margin-left: 0;
                    }

                    &:last-child {
                        margin-right: 0;
                    }

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
            }
        }
    }
</style>