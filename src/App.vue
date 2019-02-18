<template>
    <div id="app">
        <v-header />
        <router-view />
        <v-footer />
    </div>
</template>

<script>
    import vHeader from './components/vHeader.vue';
    import vFooter from './components/vFooter.vue';

    export default {
        name: 'App',
        components: {
            'v-header': vHeader,
            'v-footer': vFooter
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    #app {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }
</style>
