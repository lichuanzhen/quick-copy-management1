<template>
    <div>
        <template v-for="item in routes">
            <router-link v-if="!item.hidden&&item.noDropdown" :to="item.path" :key="item.path">
                <el-menu-item :index="item.path">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.meta.title}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.meta.title" v-if="!item.noDropdown&&!item.hidden&&item.children.length>0" :key="item.path">
                <template slot="title">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.meta.title}}
                </template>
                <template v-for="child in item.children" v-if='!child.hidden'>
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]' :key="item.path+'/'+child.path"></sidebar-item>
                    <router-link v-else class="menu-indent" :to="item.path+'/'+child.path" :key="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <icon-svg v-if='child.icon' :icon-class="child.icon" /> {{child.meta.title}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
    margin-right: 10px;
}

.hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
}
</style>
