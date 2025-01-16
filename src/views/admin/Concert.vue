<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'

import {onMounted, reactive, ref} from 'vue'
import {
  getAllConcert,
  getConcertPage,
  getTViewingInfo,
  getProjectDetails,
  getTicketInfo,
  updateDetails,
  deleteConcert,
  searchConcertByConditions
} from "../../services/concert.js";
import {ElMessage, ElMessageBox} from "element-plus";
import MyDrawer from "../../components/MyDrawer.vue";
import SearchByCondition from "../../components/SearchByCondition.vue";

//定义数据模型
const concerts =reactive({
  list : [],
  pageNumber: 1,
  pageSize: 10,
  total: 0,
})

//组件挂载时调用，还要传给抽屉子组件，让子组件调用实现页面刷新
const firstGet = () => {
  getAllConcert().then((res) => {
    concerts.list = res.data.list
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
    concerts.total = res.data.total
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

onMounted(() => {
    firstGet()
})

const handleSizeChange = (pageSize) => {
  //改变每页展示大小时，初始为第一页
  getConcertPage(1, pageSize).then(res => {
    concerts.list = res.data.list
    concerts.total = res.data.total
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

const handleCurrentChange = (pageNumber) => {
  getConcertPage(pageNumber, concerts.pageSize).then(res => {
    concerts.list = res.data.list
    concerts.total = res.data.total
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

const dialogFormVisible = ref(false)


const formForDetails = reactive({
  selectDetails: 'projectDetail',
})
//定义详细信息操作数据模型
const details = ref('')

const tempId = ref('')

const handleDetail = (concertId) => {
  if (concertId === undefined) {
    concertId=tempId.value
  }
  tempId.value = concertId
  dialogFormVisible.value = true
  if(formForDetails.selectDetails === 'projectDetail'){
    getProjectDetails(concertId).then(res => {
      details.value = res.data
    }).catch(error => {
      ElMessage.error("服务异常", error)
    })
  }
  if(formForDetails.selectDetails === 'ticketInfo'){
    getTicketInfo(concertId).then(res => {
      details.value = res.data
    }).catch(error => {
      ElMessage.error("服务异常", error)
    })
  }
  if(formForDetails.selectDetails === 'viewingInfo'){
    getTViewingInfo(concertId).then(res => {
      details.value = res.data
    }).catch(error => {
      ElMessage.error("服务异常", error)
    })
  }
}

const handleSubmitDetails = () => {
  let data = {}
  if(formForDetails.selectDetails === 'projectDetail'){
    data={concertId:tempId.value,projectDetails :details.value}
  }
  if(formForDetails.selectDetails === 'ticketInfo'){
    data={concertId:tempId.value,ticketInfo :details.value}
  }
  if(formForDetails.selectDetails === 'viewingInfo'){
    data={concertId:tempId.value,viewingInfo :details.value}
  }
  updateDetails(data).then(res => {
    details.value = res.data
    ElMessage.success("编辑成功")
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}
//定义对话框关闭之前的回调
const beforeClose = () => {
  formForDetails.selectDetails='projectDetail';
  dialogFormVisible.value=false
}
//抽屉子组件的引用
const childRef = ref(null);
//拿到子组件暴露的函数
function callOpenDrawer() {
  if (childRef.value) {
    childRef.value.openDrawer();
  }
}
//拿到子组件暴露的函数
function chooseTitle(operate,id) {
  if (childRef.value) {
    childRef.value.chooseTitle(operate,id);
  }
}
function formatDate(timeString) {
  return timeString.split(':').slice(0, 2).join(':').replace('T', ' ');
}


const handleDelete = (id) => {
  ElMessageBox.confirm(
      '你确认要删除该分类信息吗?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    deleteConcert(id).then(res => {
      ElMessage.success("删除成功")
      //刷新页面
      setTimeout(() => {
        firstGet()
      },1000)
    }).catch(error => {
      ElMessage.error("服务异常", error)
    })}
  ).catch(() => {
    ElMessage({
      type: 'info',
      message: '撤销删除',
    })
  })
}
const handleData = (data) => {
  searchConcertByConditions({...data,pageNumber:concerts.pageNumber,pageSize:concerts.pageSize}).then(res => {
    concerts.list = res.data.list
    concerts.total = res.data.total
    concerts.pageNumber = res.data.pageNum
    concerts.pageSize = res.data.pageSize
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
};

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>门票管理</span>
        <SearchByCondition @get:data="handleData"></SearchByCondition>
        <div class="extra">
          <el-button type="primary" @click="callOpenDrawer();chooseTitle('添加门票',-1)">添加门票</el-button>
        </div>
      </div>
    </template>
    <!-- 文章列表 -->
    <el-table :data="concerts.list" style="width: 100%">
      <template v-show = "false">
        <el-table-column label="id"  prop="concertId" ></el-table-column>
      </template>
      <el-table-column label="封面" width="150" prop="coverImageUrl">
        <template #default="{ row }">
          <!-- 在这里渲染图片 -->
          <img :src="row.coverImageUrl" alt="封面" style="width: 100%; height: auto;"/>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200" prop="name"></el-table-column>
      <el-table-column label="出场人" prop="performers"></el-table-column>
      <el-table-column label="类别" prop="category"> </el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="详细地址" prop="detailedLocation"></el-table-column>
      <el-table-column label="时间" >
        <template v-slot="scope">
          {{ formatDate(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>
      <el-table-column label="详情" width="100">
        <template #default="{ row }">
          <el-button round @click="handleDetail(row.concertId)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="callOpenDrawer();chooseTitle('编辑门票信息',row.concertId)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="handleDelete(row.concertId)"></el-button>
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
  <el-dialog v-model="dialogFormVisible" title="编辑详细信息" width="500" :before-close="beforeClose">
    <el-form :model="formForDetails">

      <el-form-item label="" label-width="50px">
        <el-select v-model="formForDetails.selectDetails" placeholder="请选择"  @change="handleDetail()">
          <el-option label="项目详情" value="projectDetail" />
          <el-option label="购票须知" value="ticketInfo" />
          <el-option label="观影须知" value="viewingInfo" />
        </el-select>

      </el-form-item>
      <el-form-item label="" label-width="50px">
        <el-input
            v-model="details"
            style="width: 450px"
            :rows="10"
            type="textarea"
            placeholder="请输入...."
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="beforeClose()">Cancel</el-button>
        <el-button type="primary" @click=" handleSubmitDetails();beforeClose()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <MyDrawer ref="childRef" :flush="firstGet"></MyDrawer>
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