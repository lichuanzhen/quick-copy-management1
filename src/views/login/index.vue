<template>
    <div class="login-container">
        <el-form autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title"><img class="logo" src="">{{ title }}</h3>
            <el-form-item prop="account">
                <span class="svg-container">
                    <icon-svg icon-class="account"></icon-svg>
                </span>
                <el-input name="account" type="text" v-model="loginForm.account" autoComplete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <icon-svg icon-class="password"></icon-svg>
                </span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { validateUserName, validatePassword } from '../../utils/validate';

export default {
    name: 'login',
    data() {
        const validateAccount = (rule, value, callback) => {
            const result = validateUserName(value);
            if (!result.success) {
                callback(new Error(result.message));
            } else {
                callback();
            }
        };
        const validatePwd = (rule, value, callback) => {
            const result = validatePassword(value);
            if (!result.success) {
                callback(new Error(result.message));
            } else {
                callback();
            }
        };
        return {
            title: process.env.TITLE,
            loginForm: {
                account: '',
                password: ''
            },
            loginRules: {
                account: [
                    { required: true, trigger: 'blur', validator: validateAccount }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePwd }
                ]
            },
            loading: false
        };
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        this.loading = false;
                        this.$router.push({ path: '/' });
                    }).catch(() => {
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../../../src/styles/mixin.scss";

.login-container {
    @include relative;
    height: 100vh;
    background-color: #2d3a4b;
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: #eeeeee;
        height: 47px;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
    }
    .title {
        font-size: 30px;
        color: #eeeeee;
        margin: 0 auto 20px auto;
        text-align: center;
        font-weight: bold;
        .logo {
            height: 40px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 420px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
    .el-button {
        width: 100%;
    }
}
</style>
