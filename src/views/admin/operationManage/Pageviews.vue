<!--浏览量页 -->
<template>
    <div v-loading.body="listLoading">
        <el-row>
            <el-button type="primary" @click="newPop">新 增</el-button>
        </el-row>
        <el-table :data="dataList" stripe border style="width: 100%">
            <el-table-column prop="time" label="设置浏览量"></el-table-column>
            <el-table-column prop="newUser" label="文本内容"></el-table-column>
		    <el-table-column label="操作"width="120" align="center">
		    	<template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="editPop(scope.row)"></el-button>
                    <el-button type="danger" size="small" icon="delete" @click="deletePop(scope.row)"></el-button>
                </template>
		    </el-table-column>
        </el-table>
        <div class="block foot">
            <el-pagination v-if="totalNum!=0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
        </div>
        <!-- 删除弹窗 -->
        <el-dialog title="操作确认" v-model="delPopup" size="tiny">
            <p>确定要删除此浏览量吗？</p>
            <p>ID：{{id}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="deleteRow">确 定</el-button>
                <el-button @click="delPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 新建弹窗 -->
        <el-dialog title="操作确认" v-model="newPopup" size="tiny">
            <el-form :model="addItems" ref="addItems" label-width="100px">
                <el-form-item label="设置浏览量" prop="pageviews">
                    <el-input  autosize v-model="addItems.pageviews" placeholder="请设置浏览量"></el-input>
                </el-form-item>
                <el-form-item label="文本内容" prop="appName">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="addItems.content" placeholder="请输入文本内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="newPageviews">确 定</el-button>
                <el-button @click="newPopup = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog title="操作确认" v-model="editPopup" size="tiny">
            <el-form :model="editItems" ref="editItems" label-width="100px">
                <el-form-item label="设置浏览量" prop="pageviews">
                    <el-input  autosize v-model="editItems.pageviews" placeholder="请设置浏览量"></el-input>
                </el-form-item>
                <el-form-item label="文本内容" prop="appName">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="editItems.content" placeholder="请输入文本内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="editPageviews">确 定</el-button>
                <el-button @click="editPopup = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getPageviewsList, delPageviews, savePageviews } from '../../../api/admin/operationManage';
export default {
    data() {
        return {
            listLoading: false,
            delPopup: false, // 删除弹窗
            editPopup: false, // 编辑弹窗
            newPopup: false, // 新建弹窗
            id: '',
            currentPage: 1,       // 当前页
            totalNum: 0,         // 总条数
            pageSizes: [10, 20, 30, 50],
            pageSize: 10,         // 每页显示条数
            dataList: [],
            addItems: {
                pageviews: '',
                content: ''
            },
            editItems: {
                pageviews: '',
                content: ''
            }
        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        // 获取列表数据
        getDataList() {
            this.listLoading = true;
            getPageviewsList().then(response => {
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
            delPageviews(this.id).then(response => {
                this.delPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
        },
        // 编辑按钮弹窗
        editPop(row) {
            this.editPopup = true;
            this.id = row.id;
            this.editItems.pageviews = row.pageviews;
            this.editItems.content = row.content;
        },
        // 操作--编辑
        editPageviews() {
            savePageviews(this.editItems, this.id).then(response => {
                this.editPopup = false;
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
        newPageviews() {
            savePageviews(this.addItems).then(response => {
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
    .el-row{
        margin-bottom: 20px;
    }
    .el-form{
        .el-input, .el-textarea{
            width: 80%;
        }
    }
</style>



