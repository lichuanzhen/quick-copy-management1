import { login, logout, getInfo } from '../../api/login';
import { setToken, getToken, removeToken } from '../../utils/auth';
import Cookies from 'js-cookie';

const user = {
    state: {
        id: '',
        name: '',
        roles: []
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const account = userInfo.account.trim();
            return new Promise((resolve, reject) => {
                login(account, userInfo.password).then(response => {
                    const sessionId = response.sessionId;
                    setToken(sessionId);
                    Cookies.set('roles', ['employee']);
                    resolve();
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },
        // 获取用户信息
        GetInfo({ commit }, sessionId) {
            return new Promise((resolve, reject) => {
                getInfo(sessionId).then(response => {
                    const data = response.data;
                    commit('SET_NAME', data.userName);
                    const role = ['employee'];
                    commit('SET_ROLES', role);
                    commit('SET_ID', getToken());
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    if (error.code !== 50008 && error.code !== 50012 && error.code !== 50014) {
                        reject(error);
                    }
                });
            });
        },
        // // 修改密码
        // ChangePassword({ commit }, password) {
        //     return new Promise((resolve, reject) => {
        //         changePassword(password.old, password.new).then(() => {
        //             commit('SET_ROLES', []);
        //             removeToken();
        //             resolve();
        //         }).catch(error => {
        //             console.log(error);
        //             reject(error);
        //         });
        //     });
        // },

        // 登出
        LogOut({ commit }, { sessionId }) {
            return new Promise((resolve, reject) => {
                logout(sessionId).then(() => {
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve();
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_ROLES', []);
                removeToken();
                resolve();
            });
        }
    }
};

export default user;
