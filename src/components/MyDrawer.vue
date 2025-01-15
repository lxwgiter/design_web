<template>

  <el-drawer
      v-model="drawer"
      :title="myTitle"
      :direction="direction"
      :before-close="handleClose"
      size="1000"
  >
    <el-form :inline="true" :model="concertForm" class="demo-form-inline">

      <el-form-item label="演唱会封面" label-width="100">
        <el-input v-model="concertForm.coverImageUrl" placeholder="输入封面" clearable style="width: 500px;"/>
      </el-form-item><br>

      <el-form-item label="演唱会名称" label-width="100">
        <el-input v-model="concertForm.name" placeholder="输入演唱会名称" clearable style="width: 500px;"/>
      </el-form-item><br>

      <el-form-item label="参演明星" label-width="100">
        <el-input v-model="concertForm.performers" placeholder="出入参演明星" clearable style="width: 500px;"/>
      </el-form-item>

      <el-form-item label="地址" label-width="100">
        <el-select
            v-model="concertForm.addressId"
            placeholder="请选择地址"
            clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="类别" label-width="50">
        <el-select
            v-model="concertForm.categoryId"
            placeholder="请选择类别"
            clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" label-width="100">
        <el-input v-model="concertForm.detailedLocation" placeholder="请输入详细地址" clearable style="width: 500px;"/>
      </el-form-item>
      <el-form-item label="举办时间" label-width="100">
        <el-date-picker
            v-model="concertForm.startTime"
            type="datetime"
            placeholder="点击选择日期"
            format="YYYY/MM/DD HH:mm:ss"
        />
      </el-form-item><br>

      <el-form-item label="价格" label-width="100">
        <el-input-number v-model="concertForm.price" :min="1"  size="large">
          <template #suffix>
            <span>RMB</span>
          </template>
        </el-input-number>
      </el-form-item><br>

      <el-form-item label="库存" label-width="100">
        <el-input-number v-model="concertForm.stock" :min="0"  size="large">
        </el-input-number>
      </el-form-item><br>

      <el-form-item label="项目详情" label-width="100">
        <el-input
            v-model="concertForm.projectDetails"
            style="width: 500px"
            :rows="5"
            type="textarea"
            placeholder="请输入...."
        />
      </el-form-item>

      <el-form-item label="购票须知" label-width="100">
        <el-input
            v-model="concertForm.ticketInfo"
            style="width: 500px"
            :rows="5"
            type="textarea"
            placeholder="请输入...."
        />
      </el-form-item>

      <el-form-item label="观影须知" label-width="100">
        <el-input
            v-model="concertForm.viewingInfo"
            style="width: 500px"
            :rows="5"
            type="textarea"
            placeholder="请输入...."
        />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>


</template>

<script lang="ts" setup>
import {ref, defineExpose, reactive} from 'vue'
import { ElMessageBox } from 'element-plus'
import type { DrawerProps } from 'element-plus'
const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('rtl') // 设置默认为右到左


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('此时关闭会导致未保存的数据丢失，您确定关闭吗？')
      .then(() => {
        done()
      })
}

function openDrawer() {
  direction.value = 'rtl'; // 设置方向为右到左
  drawer.value = true; // 打开抽屉
}

const myTitle = ref('')
const chooseTitle = (operate) =>{
    myTitle.value = operate
}

const onSubmit = () => {
  console.log('submit!')
}

//定义数据模型
const concertForm = reactive({
  concertId : '',
  name : '',
  addressId : '',
  detailedLocation : '',
  startTime : '',
  categoryId : '',
  performers : '',
  price : 1,
  stock : 0,
  coverImageUrl : '',
  projectDetails : '',
  ticketInfo : '',
  viewingInfo : ''
})

// 暴露 openDrawer 方法给父组件
defineExpose({ openDrawer,chooseTitle });
</script>
<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>