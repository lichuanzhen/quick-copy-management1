<!--运营管理评论审核页 -->
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
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="time" label="作品ID"></el-table-column>
            <el-table-column prop="newUser" label="用户注册手机号"></el-table-column>
            <el-table-column prop="lossUser" label="评论内容"></el-table-column>
            <el-table-column prop="loginUser" label="评论时间" ></el-table-column>
            <el-table-column prop="totalUser" label="状态"></el-table-column>
		    <el-table-column label="操作"width="150" align="center">
		    	<template scope="scope">
                    <el-button type="danger" size="small" @click="deletePop(scope.row)">删除</el-button>
                    <el-button type="primary" size="small" @click="recoveryPop(scope.row)">恢复</el-button>
                </template>
		    </el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
        <!-- 删除弹窗 -->
        <el-dialog title="操作确认" v-model="delPopup" size="tiny">
            <span>确定要删除此评论吗？</span><br />
            <span>ID：{{id}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="deleteRow">确 定</el-button>
                <el-button @click="delPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 恢复弹窗 -->
        <el-dialog title="操作确认" v-model="recoveryPopup" size="tiny">
            <span>确定要恢复此评论吗？</span><br />
            <span>ID：{{id}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="recoveryRow">确 定</el-button>
                <el-button @click="recoveryPopup = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getReviewAuditList, delReviewAudit, recoveryReviewAudit } from '../../../api/admin/userInfo';
export default {
    data() {
        return {
            listLoading: false,
            delPopup: false, // 删除弹窗
            recoveryPopup: false, // 恢复弹窗
            id: '',
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
            getReviewAuditList(this.searchItems, this.pageSize, this.currentPage).then(response => {
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
        },
        // 删除按钮弹窗
        deletePop(row) {
            this.delPopup = true;
            this.id = row.id;
        },
        // 操作--删除
        deleteRow() {
            delReviewAudit(this.id).then(response => {
                this.delPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        // 恢复按钮弹窗
        recoveryPop(row) {
            this.recoveryPopup = true;
            this.id = row.id;
        },
        // 操作--恢复
        recoveryRow() {
            recoveryReviewAudit(this.id).then(response => {
                this.recoveryPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        }
    }
};
</script>


