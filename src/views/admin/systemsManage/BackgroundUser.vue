<!--后台用户页 -->
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
             <el-button type="primary" @click="newPop">新增</el-button>
        </el-col>
        <el-table :data="dataList" stripe border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="time" label="用户昵称"></el-table-column>
            <el-table-column prop="newUser" label="创建时间"></el-table-column>
            <el-table-column prop="lossUser" label="操作记录"></el-table-column>
		    <el-table-column label="操作" width="80" align="center">
		    	<template scope="scope">
                    <el-button type="danger" size="small" icon="delete" @click="deletePop(scope.row)"></el-button>
                </template>
		    </el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
        <!-- 删除弹窗 -->
        <el-dialog title="操作确认" v-model="delPopup" size="tiny">
            <span>确定要删除此用户吗？</span><br />
            <span>ID：{{id}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="deleteRow">确 定</el-button>
                <el-button @click="delPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 新建弹窗 -->
        <el-dialog title="操作确认" v-model="newPopup" size="tiny">
            <el-form :model="addItems" ref="addItems" label-width="80px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addItems.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addItems.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="addItems.description" placeholder="请输入描述"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="newBackgroundUser">确 定</el-button>
                <el-button @click="newPopup = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getBackgroundUserList, delBackgroundUser, saveBackgroundUser } from '../../../api/admin/systemsManage';
export default {
    data() {
        return {
            listLoading: false,
            delPopup: false, // 删除弹窗
            newPopup: false, // 新建弹窗
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
            },
            addItems: {
                userName: '',
                password: '',
                description: ''
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
            getBackgroundUserList(this.searchItems, this.pageSize, this.currentPage).then(response => {
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
            delBackgroundUser(this.id).then(response => {
                this.delPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        // 新建按钮弹窗
        newPop() {
            this.newPopup = true;
            if (this.$refs.addItems) {
                this.$refs.addItems.resetFields();
            }
        },
        // 操作--新建
        newBackgroundUser() {
            saveBackgroundUser(this.addItems).then(response => {
                this.newPopup = false;
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
<style scoped rel="stylesheet/scss" lang="scss">
    .el-form{
        .el-input, .el-textarea{
            width: 80%;
        }
    }
</style>


