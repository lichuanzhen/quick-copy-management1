import { asyncRouterMap, constantRouterMap } from '../../router/index';

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0);
    } else {
        return true;
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    return asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, roles));
                resolve();
            });
        }
    }
};

export default permission;
