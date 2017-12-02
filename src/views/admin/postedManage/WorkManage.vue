<!--作品管理页 -->
<template>
    <div v-loading.body="listLoading">
        <el-row>
            <el-col>
                <p>模板总数：{{totalNum}} 个</p>
            </el-col>
            <el-col>
                <el-form :inline="true" :model="searchItems" ref="searchItems">
                    <el-form-item label="查询时间">
                            <el-date-picker v-model="searchItems.searchTime" :clearable="false" type="daterange" :picker-options="pickerOptions" placeholder="选择日期范围" @change="getTimeString"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="searchItems.templateType" placeholder="请选择">
                            <el-option label="全部" value="id"></el-option>
                            <el-option label="日签" value="id"></el-option>
                            <el-option label="海报" value="content"></el-option>
                            <el-option label="倒计时" value="content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="searchItems.templateType" placeholder="请选择">
                            <el-option label="全部" value="id"></el-option>
                            <el-option label="未上架" value="id"></el-option>
                            <el-option label="已上架" value="content"></el-option>
                            <el-option label="已下架" value="content"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchBtn" icon="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col>
                <el-button type="danger" @click="batchDel">批量删除</el-button>
                <el-button type="primary" @click="newWork">添加作品</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" stripe border style="width: 100%" ref="worksTable" @selection-change="getWorksIds">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="time" label="分类"></el-table-column>
            <el-table-column prop="time" label="作品ID"></el-table-column>
            <el-table-column prop="newUser" label="作品显示"></el-table-column>
            <el-table-column prop="lossUser" label="使用次数"></el-table-column>
            <el-table-column prop="totalUser" label="状态"></el-table-column>
            <el-table-column prop="loginUser" label="创建时间" ></el-table-column>
		    <el-table-column label="操作"width="200" align="center">
		    	<template scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deletePop(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="upPop(scope.row)">上传</el-button>
                    <el-button type="text" size="small" @click="downPop(scope.row)">下架</el-button>
                </template>
		    </el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
        <!-- 删除弹窗 -->
        <el-dialog title="操作确认" v-model="delPopup" size="tiny">
            <p>确定要删除此作品吗？</p>
            <p>作品ID：{{id}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="deleteRow">确 定</el-button>
                <el-button @click="delPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 批量删除弹窗 -->
        <el-dialog title="操作确认" v-model="batchDelPopup" size="tiny">
            <p>确定要删除吗？</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="batchDelRow">确 定</el-button>
                <el-button @click="batchDelPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 上传弹窗 -->
        <el-dialog title="操作确认" v-model="upPopup" size="tiny">
            <p>确定要上传此作品吗？</p>
            <p>作品ID：{{id}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="upRow">确 定</el-button>
                <el-button @click="upPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 下架弹窗 -->
        <el-dialog title="操作确认" v-model="downPopup" size="tiny">
            <p>确定要将此作品下架吗？</p>
            <p>作品ID：{{id}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="downRow">确 定</el-button>
                <el-button @click="downPopup = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getWorksList, delWork, upWork, downWork, saveWork } from '../../../api/admin/postedManage';
export default {
    data() {
        return {
            listLoading: false,
            delPopup: false, // 删除弹窗
            batchDelPopup: false, // 批量删除弹窗
            editPopup: false, // 编辑弹窗
            upPopup: false, // 上传弹窗
            downPopup: false, // 下架弹窗
            id: '',
            ids: [],
            currentPage: 1,       // 当前页
            totalNum: 0,         // 总条数
            pageSizes: [10, 20, 30, 50],
            pageSize: 10,         // 每页显示条数
            searchItems: {
                beginTime: '',     // 开始时间
                endTime: '',     // 结束时间
                searchTime: ''
            },
            addItems: {
                description: '',
                type: ''
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
            getWorksList(this.searchItems, this.pageSize, this.currentPage).then(response => {
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
            this.$refs.worksTable.clearSelection();
            this.$refs.worksTable.toggleRowSelection(row, true);
        },
        // 操作--删除
        deleteRow() {
            this.ids.push(this.id);
            delWork(this.ids).then(response => {
                this.delPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        // 上传按钮弹窗
        upPop(row) {
            this.upPopup = true;
            this.id = row.id;
            this.$refs.worksTable.clearSelection();
            this.$refs.worksTable.toggleRowSelection(row, true);
        },
        // 操作--上传
        upRow() {
            upWork(this.id).then(response => {
                this.upPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        // 下架钮弹窗
        downPop(row) {
            this.downPopup = true;
            this.id = row.id;
            this.$refs.worksTable.clearSelection();
            this.$refs.worksTable.toggleRowSelection(row, true);
        },
        // 操作--下架
        downRow() {
            downWork(this.id).then(response => {
                this.downPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        // 批量选择作品对应id集合
        getWorksIds(val) {
            this.ids = [];
            for (let i = 0; i < val.length; i++) {
                this.ids.push(val[i].id);
            }
        },
        // 批量删除按钮弹窗
        batchDel() {
            if (this.ids.length) {
                this.batchDelPopup = true;
            } else {
                this.$message({
                    message: '请选择要删除的作品',
                    type: 'warning'
                });
            }
        },
        // 操作--下架
        batchDelRow() {
            delWork(this.ids).then(response => {
                this.batchDelPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        newWork() {
            this.$router.push({ name: 'NewWork', params: { backRoute: this.$route.name } });
        },
        editWork(row) {
            this.$router.push({ name: 'EditWork', params: { id: row.id, backRoute: this.$route.name } });
        }
    }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .el-row{
        margin-bottom: 20px;
    }
    .el-form{
        .el-input, .el-textarea{
            width: 80%;
        }
    }
</style>


