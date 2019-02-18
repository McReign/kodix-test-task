<template>
    <div class="footer">
        <div class="footer__info">
            <span>© 2015 CAPTAIN QUACK</span>
            <span>Десница тысячелетия и моллюск!</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vFooter"
    }
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 102px;
        background-color: #282d30;
        box-sizing: border-box;
        flex: 0 0 auto;

        &__info {
            text-align: center;
            color: #ffffff;
            font-size: 11px;
            font-weight: 300;

            span {
                display: block;
            }
        }
    }
</style>