<!--用户数据统计页 -->
<template>
    <div v-loading.body="listLoading">
        <el-col :span="20">
            <el-form :inline="true" :model="searchItems" ref="searchItems">
                <el-form-item label="查询时间" prop="sendTimeRange">
                        <el-date-picker v-model="searchItems.searchTime" :clearable="false" type="daterange" :picker-options="pickerOptions" placeholder="选择日期范围" @change="getTimeString"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchBtn" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="4">
             <el-button type="primary" icon="upload2">导出</el-button>
        </el-col>
        <el-table :data="dataList" stripe border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column prop="addUserCount" label="新增用户"></el-table-column>
            <el-table-column prop="loseUserCount" label="损失用户数"></el-table-column>
            <el-table-column prop="loginCount" label="登录用户数" ></el-table-column>
            <el-table-column prop="UserCount" label="总用户数"></el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
    </div>
</template>
<script>
import { getDataStatisticsList, exportDataStatisticsList } from '../../../api/admin/userInfo';
export default {
    data() {
        return {
            listLoading: false,
            currentPage: 1,       // 当前页
            totalNum: 0,         // 总条数
            pageSizes: [10, 20, 30, 50],
            pageSize: 10,         // 每页显示条数
            searchItems: {
                beginTime: '',     // 开始时间
                endTime: '',     // 结束时间
                searchTime: ''
            },
            dataList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
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
        getTimeString(val) {
            if (!val) {
                this.searchItems.beginTime = '';
                this.searchItems.endTime = '';
            } else {
                const temp_time = val.split(' - ');
                this.searchItems.beginTime = temp_time[0];
                this.searchItems.endTime = temp_time[1];
            }
        },
        // 导出列表数据
        exportList() {
            this.listLoading = true;
            exportDataStatisticsList(this.searchItems, this.pageSize, this.currentPage).then(response => {
                this.message({
                    message: response.message,
                    type: 'success'
                });
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.listLoading = false;
            });
        },
        // 获取列表数据
        getDataList() {
            this.listLoading = true;
            getDataStatisticsList(this.searchItems, this.pageSize, this.currentPage).then(response => {
                this.dataList = response.data;
                this.totalNum = response.count;
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


