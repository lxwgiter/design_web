<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref,reactive,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {getCategory,getCategoryPage} from "../../services/concertCategory.js";

//控制对话框是否显示
const centerDialogVisible = ref(false)
const handleSizeChange = (pageSize) => {
  //改变每页展示大小时，初始为第一页
  getCategoryPage(1, pageSize).then(res => {
    categories.list = res.data.list
    categories.total = res.data.total
    categories.pageNumber = res.data.pageNum
    categories.pageSize = res.data.pageSize
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

const handleCurrentChange = (pageNumber) => {
  getCategoryPage(pageNumber, categories.pageSize).then(res => {
    categories.list = res.data.list
    categories.total = res.data.total
    categories.pageNumber = res.data.pageNum
    categories.pageSize = res.data.pageSize
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })

}

const categories =reactive({
  list : [],
  pageNumber: 1,
  pageSize: 10,
  total: 0,
})
onMounted(() => {
  getCategory().then(res => {
    categories.list = res.data.list
    categories.total = res.data.total
    categories.pageNumber = res.data.pageNumber
    categories.pageSize = res.data.pageSize
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
})

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>分类列表</span>
        <div class="extra">
          <el-button type="primary" @click="centerDialogVisible = true">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categories.list" style="width: 100%">
      <el-table-column label="序号" width="200"  prop="id"> </el-table-column>
      <el-table-column label="类别名" prop="category" ></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="centerDialogVisible = true"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="centerDialogVisible = true"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="categories.pageNumber"
          v-model:page-size="categories.pageSize"
          :page-sizes="[10, 15, 20, 25]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="categories.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <!--对话框  -->
  <el-dialog
      v-model="centerDialogVisible"
      title="警告"
      width="500"
      align-center
  >
    <span>禁止对类别增删改</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.demo-pagination-block  {
  margin-top: 15px;
  float: right;
}
</style>