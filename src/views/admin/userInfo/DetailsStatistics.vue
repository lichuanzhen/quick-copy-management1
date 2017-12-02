<!--用户详情统计页 -->
<template>
    <div v-loading.body="listLoading">
        <el-form :inline="true" :model="searchItems" ref="searchItems">
            <el-form-item label="用户微信号">
                <el-input v-model="searchItems.wechatNumber" placeholder="请输入用户微信号"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="searchItems.userName" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" stripe border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="time" label="昵称"></el-table-column>
            <el-table-column prop="newUser" label="微信号"></el-table-column>
            <el-table-column prop="lossUser" label="性别"></el-table-column>
            <el-table-column prop="loginUser" label="发布作品数" ></el-table-column>
            <el-table-column prop="totalUser" label="总阅读量"></el-table-column>
            <el-table-column prop="totalUser" label="总转发量"></el-table-column>
            <el-table-column prop="totalUser" label="注册时间"></el-table-column>
            <el-table-column prop="totalUser" label="最后登录时间"></el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
    </div>
</template>
<script>
import { getDetailsStatisticsList } from '../../../api/admin/userInfo';
export default {
    data() {
        return {
            listLoading: false,
            currentPage: 1,       // 当前页
            totalNum: 0,         // 总条数
            pageSizes: [10, 20, 30, 50],
            pageSize: 10,         // 每页显示条数
            searchItems: {
                wechatNumber: '',     // 用户微信号
                userName: ''    // 昵称
            },
            dataList: []
        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        searchBtn() {
            this.currentPage = 1;
            this.getDataList();
        },
        // 获取列表数据
        getDataList() {
            this.listLoading = true;
            getDetailsStatisticsList(this.searchItems, this.pageSize, this.currentPage).then(response => {
                this.dataList = response.data.list;
                this.totalNum = response.data.total;
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.listLoading = false;
            });
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
            this.getDataList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getDataList();
        }
    }
};
</script>


