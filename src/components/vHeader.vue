<template>
    <div class="header">
        <img class="header__logo" src="../assets/duck_logo.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "vHeader"
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 102px;
        text-align: center;
        background-color: #282d30;
        box-sizing: border-box;

        &__logo {
            width: 100%;
            height: 100%;
            margin-top: 6px;
        }

        @media all and (max-width: 506px) {
            height: 81px;
            padding: 0 10px;
        }
    }
</style>