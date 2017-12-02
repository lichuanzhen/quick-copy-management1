import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/index';
import E404 from '../views/error/404';
import Layout from '../views/layout/Layout';
import Empty from '../views/layout/Empty';

const _adminImport = file => r => require.ensure([], () => r(require('@/views/admin/' + file + '.vue')), 'admin');

Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/404', component: E404, hidden: true }
];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

export const asyncRouterMap = [

    { path: '/', redirect: '/user_info/data_statistics', hidden: true },


    {
        path: '/user_info', component: Layout, icon: 'consume', redirect: 'noredirect', meta: { role: ['employee'], title: '用户信息' },
        children: [
            { path: 'data_statistics', component: _adminImport('userInfo/DataStatistics'), name: 'DataStatistics', meta: { title: '用户数据统计' } },
            { path: 'detial_statistics', component: _adminImport('userInfo/DetailsStatistics'), name: 'DetailsStatistics', meta: { title: '用户详情统计' } },
            { path: 'works_statistics', component: _adminImport('userInfo/WorksStatistics'), name: 'WorksStatistics', meta: { title: '用户作品统计' } },
            { path: 'review_audit', component: _adminImport('userInfo/ReviewAudit'), name: 'ReviewAudit', meta: { title: '用户评论审核' } }
        ]
    },


    {
        path: '/material_manage', component: Layout, icon: 'consume', redirect: 'noredirect', meta: { role: ['employee'], title: '素材管理' },
        children: [
            { path: 'copywriting_manage', component: _adminImport('materialManage/CopywritingManage'), name: 'CopywritingManage', meta: { title: '文案素材' } }
        ]
    },


    {
        path: '/operation_manage', component: Layout, icon: 'consume', redirect: 'noredirect', meta: { role: ['employee'], title: '运营管理' },
        children: [
            { path: 'pageviews', component: _adminImport('operationManage/Pageviews'), name: 'Pageviews', meta: { title: '浏览量' } },
            { path: 'work_out', component: _adminImport('operationManage/WorkOut'), name: 'WorkOut', meta: { title: '作品排行' } }
        ]
    },


    {
        path: '/posted_manage', component: Layout, icon: 'consume', redirect: 'noredirect', meta: { role: ['employee'], title: '发布管理' },
        children: [
            {
                path: '/work_manage', component: Empty, icon: 'sub', noDropdown: true, meta: { title: '作品管理' },
                children: [
                    { path: '', component: _adminImport('postedManage/WorkManage'), name: 'WorkManage', meta: { keepAlive: true } },
                    { path: 'add', component: _adminImport('postedManage/NewWork'), name: 'NewWork', meta: { title: '新建作品' } },
                    { path: 'edit/:id', component: _adminImport('postedManage/EditWork'), name: 'EditWork', meta: { title: '编辑作品' } }
                ]
            }
        ]
    },


    {
        path: '/systems_manage', component: Layout, icon: 'consume', redirect: 'noredirect', meta: { role: ['employee'], title: '系统管理' },
        children: [
            { path: 'background_user', component: _adminImport('systemsManage/BackgroundUser'), name: 'BackgroundUser', meta: { title: '后台用户管理' } }
        ]
    },


    { path: '*', redirect: '/404', hidden: true }
];
