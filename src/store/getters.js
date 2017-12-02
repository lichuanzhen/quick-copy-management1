const getters = {
    sidebar: state => state.app.sidebar,
    name: state => state.user.name,
    permission_routers: state => state.permission.routers
};
export default getters;
