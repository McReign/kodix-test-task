<template>
    <div class="v-color-picker">
        <label class="label">{{label}}</label>
        <div class="colors-list">
            <div class="colors-line" v-for="(line, lineNumber) in getLinesCount">
                <v-color-item
                    v-for="item in getSplitedColors[lineNumber]"
                    :color="item"
                    :selected="checkSelected(item.name)"
                    @select="handleSelect"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import vColorItem from './vColorItem';

    export default {
        name: "vColorPicker",
        components: {
            'v-color-item': vColorItem
        },
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
            },
            mode: {
                type: String,
                default: 'single',
                validator: (value) => {
                    return ['single', 'multiple'].indexOf(value) !== -1
                }
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
            // Splitting colors array into parts with length = maxLineSize
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
                return this.ownValues.map(item => item.name).includes(item)
            },
            handleSelect (item) {
                if (this.ownValues.map(item => item.name).includes(item)) {
                    this.ownValues = this.ownValues.filter(color => color.name !== item)
                }
                else {
                    this.mode === 'single' ? this.ownValues = [] : null
                    this.ownValues.push(this.colors.filter(color => color.name === item)[0])
                }

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
        position: relative;

        .label {
            position: absolute;
            display: block;
            color: #999999;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            padding-bottom: 5px;
            transition: .2s;
            transform: translateY(-100%);
        }

        .colors-list {

            .colors-line {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>