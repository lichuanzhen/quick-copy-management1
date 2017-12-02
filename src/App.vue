<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        document.title = process.env.TITLE;
    }
};
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
