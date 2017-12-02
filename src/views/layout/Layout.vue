<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <div class="navbar-wrapper">
            <Navbar></Navbar>
        </div>
        <div class="sidebar-wrapper">
            <sidebar class="sidebar-container"></sidebar>
        </div>
        <div class="levelbar-wrapper">
            <levelbar></levelbar>
        </div>
        <div class="main-container">
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Navbar, Sidebar, Levelbar, AppMain } from './';

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
        Levelbar,
        AppMain
    },
    computed: {
        ...mapGetters(['sidebar'])
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
        .sidebar-wrapper {
            transform: translate(-160px, 0);
            .sidebar-container {
                transform: translate(152px, 0);
            }
            &:hover {
                transform: translate(0, 0);
                .sidebar-container {
                    transform: translate(0, 0);
                }
            }
        }
        .levelbar-wrapper {
            left: 40px;
        }
        .main-container {
            padding-left: 40px;
        }
    }
    .sidebar-wrapper {
        transition: all .28s ease-out;
        width: 200px;
        position: fixed;
        top: 60px;
        bottom: 0;
        left: 0;
        z-index: 1002;
        overflow: hidden;
    }
    .sidebar-container {
        transition: all .28s ease-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        z-index: 1002;
        overflow-y: scroll;
    }
    .navbar-wrapper {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1003;
        overflow: hidden;
    }
    .levelbar-wrapper {
        transition: all .28s ease-out;
        width: 100%;
        position: fixed;
        top: 60px;
        left: 200px;
        z-index: 1001;
        overflow: hidden;
    }
    .main-container {
        transition: all .28s ease-out;
        min-height: 100%;
        padding: 120px 10px 10px 210px;
    }
}
</style>
