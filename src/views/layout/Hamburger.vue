<template>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened">
    </hamburger>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '../../components/Hamburger/index.vue';

export default {
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters(['sidebar'])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar');
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
}
</style>
