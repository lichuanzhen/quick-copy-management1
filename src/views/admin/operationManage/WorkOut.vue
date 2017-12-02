<!--用户作品排行页 -->
<template>
    <div v-loading.body="listLoading">
        <el-form :inline="true" :model="searchItems" ref="searchItems">
            <el-form-item label="查询时间" prop="sendTimeRange">
                    <el-date-picker v-model="searchItems.searchTime" :clearable="false" type="daterange" :picker-options="pickerOptions" placeholder="选择日期范围" @change="getTimeString"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchBtn" icon="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" stripe border style="width: 100%">
            <el-table-column prop="time" label="排名"></el-table-column>
            <el-table-column prop="newUser" label="作品ID"></el-table-column>
            <el-table-column prop="lossUser" label="查看作品"></el-table-column>
            <el-table-column prop="loginUser" label="浏览量" ></el-table-column>
            <el-table-column prop="totalUser" label="转发量"></el-table-column>
            <el-table-column prop="totalUser" label="上传时间"></el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
    </div>
</template>
<script>
import { getWorkOutList } from '../../../api/admin/operationManage';
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
        // 获取列表数据
        getDataList() {
            this.listLoading = true;
            getWorkOutList(this.searchItems, this.pageSize, this.currentPage).then(response => {
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


