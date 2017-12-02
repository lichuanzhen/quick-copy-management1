<template>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path">
        <!--<el-menu mode="vertical" theme="dark">-->
        <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
    components: { SidebarItem },
    computed: {
        ...mapGetters(['permission_routers'])
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
    min-height: 100%;
    border-radius: 0 !important;
    //background-color: #1f2d3d;
    background-color: #324157;
}
</style>
