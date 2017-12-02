// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import 'normalize.css/normalize.css';

import './assets/iconfont/iconfont';
import IconSvg from './components/Icon-svg/index.vue';
import { getToken } from './utils/auth';
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg);
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (!getToken()) {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    } else if (to.path === '/login') {
        next({ path: '/' });
    } else if (store.state.user.roles.length === 0) {
        store.dispatch('GetInfo', getToken()).then(() => {
            const roles = store.state.user.roles;
            store.dispatch('GenerateRoutes', { roles }).then(() => {
                router.addRoutes(store.state.permission.addRouters);
                next({ ...to });
            });
        }).catch(() => {
            store.dispatch('FedLogOut');
            next('/login');
            NProgress.done();
        });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
