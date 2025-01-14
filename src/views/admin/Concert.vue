<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'

import {onMounted, reactive, ref} from 'vue'
import {getAllConcert} from "../../services/concert.js";
import {getCategory, getCategoryPage} from "../../services/concertCategory.js";
import {ElMessage} from "element-plus";



//用户搜索时选中的分类id
const categoryId=ref('')

//用户搜索时选中的发布状态
const state=ref('')



//定义数据模型
const concerts =reactive({
  list : [],
  pageNumber: 1,
  pageSize: 10,
  total: 0,
})


onMounted(() => {
  getAllConcert().then((res) => {
    concerts.list = res.data.list
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
    concerts.total = res.data.total
    console.log(res.data)
  }).catch(err => {
    ElMessage.error("服务异常", error)
  })
})

const handleSizeChange = (pageSize) => {
  //改变每页展示大小时，初始为第一页
  getCategoryPage(1, pageSize).then(res => {
    concerts.list = res.data.list
    concerts.total = res.data.total
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
  }).catch(err => {
    ElMessage.error("服务异常", error)
  })
}

const handleCurrentChange = (pageNumber) => {
  getCategoryPage(pageNumber, concerts.pageSize).then(res => {
    concerts.list = res.data.list
    concerts.total = res.data.total
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
  }).catch(err => {
    ElMessage.error("服务异常", error)
  })
}

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>门票管理</span>
        <div class="extra">
          <el-button type="primary">添加门票</el-button>
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
<!--    <el-form inline>-->
<!--      <el-form-item label="文章分类：">-->
<!--        <el-select placeholder="请选择" v-model="categoryId">-->
<!--          <el-option-->
<!--              v-for="c in categorys"-->
<!--              :key="c.id"-->
<!--              :label="c.categoryName"-->
<!--              :value="c.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="发布状态：">-->
<!--        <el-select placeholder="请选择" v-model="state">-->
<!--          <el-option label="已发布" value="已发布"></el-option>-->
<!--          <el-option label="草稿" value="草稿"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary">搜索</el-button>-->
<!--        <el-button>重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <!-- 文章列表 -->
    <el-table :data="concerts.list" style="width: 100%">
      <template v-show = "false">
        <el-table-column label="id"  prop="id" ></el-table-column>
      </template>
      <el-table-column label="封面" width="200" prop="coverImageUrl">
        <template #default="{ row }">
          <!-- 在这里渲染图片 -->
          <img :src="row.coverImageUrl" alt="封面" style="width: 100%; height: auto;"/>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200" prop="name"></el-table-column>
      <el-table-column label="出场人" prop="performers"></el-table-column>
      <el-table-column label="类别" prop="categoryId"> </el-table-column>
      <el-table-column label="地址" prop="addressId"></el-table-column>
      <el-table-column label="详细地址" prop="detailedLocation"></el-table-column>
      <el-table-column label="时间" prop="startTime"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="concerts.pageNumber"
          v-model:page-size="concerts.pageSize"
          :page-sizes="[10, 15, 20, 25]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="concerts.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
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