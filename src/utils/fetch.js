import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import qs from 'qs';

// 创建axios实例
const service = axios.create({
    withCredentials: true, // 上传cookie
    baseURL: process.env.BASE_API, // api的base_url
    timeout: process.env.TIMEOUT // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.url = config.url + '?_timestamp=' + Date.now();
    config.data = qs.stringify(config.data);
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Message({
        message: '请求错误！',
        type: 'error',
        duration: 5 * 1000
    });
    Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            console.log(response);// for debug
            Message({
                message: '返回错误！',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(response);
        }

        const res = response.data;
        if (res.code === null || res.code === undefined) {
            // 非标准格式数据
            console.log(response);// for debug
            return response.data;
        }

        if (res.code !== 1000) {
            console.log(response);// for debug
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 3003) {
                MessageBox.confirm(res.message + ' 您可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload();// 为了重新实例化vue-router对象 避免bug
                    });
                }).catch(error => {
                    console.log(error);
                });
            } else {
                Message({
                    message: res.message,
                    type: 'error',
                    duration: 5 * 1000
                });
            }
            return Promise.reject(response.data);
        }
        return response.data;
    },
    error => {
        console.log(error);// for debug
        Message({
            message: '返回错误！',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
