<template>
    <el-menu class="levelbar" mode="horizontal">
        <hamburger></hamburger>
        <el-breadcrumb class="app-levelbar" separator="/">
            <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item">
                <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">
                    {{item.meta.title}}
                </router-link>
                <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </el-menu>
</template>

<script>
import Hamburger from './Hamburger';

export default {
    created() {
        this.getBreadcrumb();
    },
    data() {
        return {
            levelList: null
        };
    },
    components: {
        Hamburger
    },
    methods: {
        getBreadcrumb() {
            this.levelList = this.$route.matched.filter(item => item.meta.title);
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.levelbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .app-levelbar.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
}
</style>
