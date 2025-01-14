<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref,reactive,onMounted } from 'vue'
import {getAllAddresses,getAddresses} from "../../services/address.js";
import { ElMessage } from 'element-plus'

//控制对话框是否显示
const centerDialogVisible = ref(false)
const handleSizeChange = (pageSize) => {
  //改变每页展示大小时，初始为第一页
  getAddresses(1, pageSize).then(res => {
    addresses.list = res.data.list
    addresses.total = res.data.total
    addresses.pageNumber = res.data.pageNum
    addresses.pageSize = res.data.pageSize
  }).catch(err => {
    ElMessage.error("服务异常", error)
  })
}

const handleCurrentChange = (pageNumber) => {
  getAddresses(pageNumber, addresses.pageSize).then(res => {
    addresses.list = res.data.list
    addresses.total = res.data.total
    addresses.pageNumber = res.data.pageNum
    addresses.pageSize = res.data.pageSize
  }).catch(err => {
    ElMessage.error("服务异常", error)
  })

}

const addresses =reactive({
  list : [],
  pageNumber: 1,
  pageSize: 10,
  total: 0,
})
onMounted(() => {
  getAllAddresses().then(res => {
    addresses.list = res.data.list
    addresses.total = res.data.total
    addresses.pageNumber = res.data.pageNumber
    addresses.pageSize = res.data.pageSize
  }).catch(err => {
    ElMessage.error("服务异常", error)
  })
})

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>地址列表</span>
        <div class="extra">
          <el-button type="primary" @click="centerDialogVisible = true">添加地址</el-button>
        </div>
      </div>
    </template>
    <el-table :data="addresses.list" style="width: 100%">
      <el-table-column label="序号" width="200"  prop="id"> </el-table-column>
      <el-table-column label="地址" prop="location" ></el-table-column>
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
          v-model:current-page="addresses.pageNumber"
          v-model:page-size="addresses.pageSize"
          :page-sizes="[10, 15, 20, 25]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="addresses.total"
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
    <span>禁止对地址增删改</span>
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