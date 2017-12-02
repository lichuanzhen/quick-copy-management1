<template>
    <el-menu class="navbar" theme="dark" mode="horizontal">
        <div class="title-container">
            <router-link to="/">
                <img class="logo" src="">
                <span>{{ title }}</span>
            </router-link>
        </div>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <icon-svg icon-class="account" /> {{ name }}
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <el-dropdown-item>
                    <span @click="logout" style="display:block;">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['name'])
    },
    data() {
        return {
            title: process.env.TITLE
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('LogOut', this.$store.state.user.id).then(() => {
                location.reload();  // 为了重新实例化vue-router对象 避免bug
            }).catch(error => {
                console.log(error);
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 60px;
    line-height: 60px;
    border-radius: 0 !important;
    background-color: #1f2d3d;
    .title-container {
        height: 60px;
        float: left;
        padding-left: 10px;
        color: #bfcbd9;
        .logo {
            height: 32px;
            vertical-align: middle;
        }
        span {
            font-size: 18px;
            vertical-align: middle;
        }
    }
    .avatar-container {
        height: 60px;
        display: inline-block;
        position: absolute;
        right: 10px;
        .avatar-wrapper {
            cursor: pointer;
            position: relative;
            color: #bfcbd9;
            right: 20px;
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
