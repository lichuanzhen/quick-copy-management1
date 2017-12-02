<!--文案素材页 -->
<template>
    <div v-loading.body="listLoading">
        <el-row>
            <el-col>
                <p>文案总数：{{totalNum}} 条</p>
            </el-col>
            <el-col>
                <el-button type="primary">添加文案</el-button>
                <el-button type="danger" @click="batchDel">批量删除</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" stripe border style="width: 100%" ref="copywritingTable" @selection-change="getCopywritingIds">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="time" label="配图显示"></el-table-column>
            <el-table-column prop="newUser" label="文案显示"></el-table-column>
            <el-table-column prop="lossUser" label="添加时间"></el-table-column>
            <el-table-column prop="loginUser" label="使用次数" ></el-table-column>
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
            <p>确定要删除此文案吗？</p>
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
                <el-button type="primary" @click.native.prevent="editCopywriting">确 定</el-button>
                <el-button @click="editPopup = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getCopywritingList, delCopywriting, saveCopywriting } from '../../../api/admin/materialManage';
export default {
    data() {
        return {
            listLoading: false,
            delPopup: false, // 删除弹窗
            batchDelPopup: false, // 批量删除弹窗
            editPopup: false, // 编辑弹窗
            id: '',
            ids: [],
            currentPage: 1,       // 当前页
            totalNum: 0,         // 总条数
            pageSizes: [10, 20, 30, 50],
            pageSize: 10,         // 每页显示条数
            dataList: [],
            editItems: ''
        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        // 获取列表数据
        getDataList() {
            this.listLoading = true;
            getCopywritingList(this.pageSize, this.currentPage).then(response => {
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
        // 批量选择作品对应id集合
        getCopywritingIds(val) {
            this.ids = [];
            for (let i = 0; i < val.length; i++) {
                this.ids.push(val[i].id);
            }
        },
        // 删除按钮弹窗
        deletePop(row) {
            this.$refs.copywritingTable.clearSelection();
            this.$refs.copywritingTable.toggleRowSelection(row, true);
            this.delPopup = true;
            this.id = row.id;
        },
        // 操作--删除
        deleteRow() {
            this.ids.push(this.id);
            delCopywriting(this.ids).then(response => {
                this.delPopup = false;
                this.$message({
                    message: response.msg,
                    type: 'success'
                });
                this.getDataList();
            });
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
        // 编辑按钮弹窗
        editPop(row) {
            this.$refs.copywritingTable.clearSelection();
            this.$refs.copywritingTable.toggleRowSelection(row, true);
            this.editPopup = true;
            this.id = row.id;
        },
        // 操作--编辑
        editCopywriting() {
            saveCopywriting(this.editItems, this.id).then(response => {
                this.editPopup = false;
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
</style>



