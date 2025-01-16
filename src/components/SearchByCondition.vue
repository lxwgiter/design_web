<template>
  <el-form :inline="true" :model="formSearch" class="demo-form-inline">

    <el-form-item label="名称" label-width="50px">
      <el-input v-model="formSearch.name" placeholder="请输入.." clearable style="width: 100px"/>
    </el-form-item>

    <el-form-item label="出场人" label-width="80px">
      <el-input v-model="formSearch.performers" placeholder="请输入.." clearable style="width: 100px"/>
    </el-form-item>

    <el-form-item label="类别" label-width="50px">
      <el-select
          v-model="formSearch.categoryId"
          placeholder=""
          clearable
          style="width: 80px"
          @click="getConcertCategory()"
      >
        <el-option :label="category.category" :value="category.id" v-for="category in concertCategory" :key="category.id"/>
      </el-select>
    </el-form-item>

    <el-form-item label="地址" label-width="50px">
      <el-select
          v-model="formSearch.addressId"
          placeholder=""
          clearable
          style="width: 80px"
          @click="getAddresses()"
      >
        <el-option :label="address.location" :value="address.id" v-for="address in addresses" :key="address.id" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <div class="block">
        <el-date-picker
            v-model="value1"
            type="monthrange"
            range-separator="To"
            start-placeholder="Start month"
            end-placeholder="End month"
            size="small"
            style="width: 100px"
        />
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="sendData()">筛选</el-button>
      <el-button type="info" @click="reset()">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive,ref,defineEmits  } from 'vue'
import { getAddressesList } from '../services/address';
import {getCategory} from '../services/concertCategory'
import {ElMessage} from "element-plus";

const value1 = ref('')

const reset = () => {
  console.log(value1.value)
  formSearch.name = '';
  formSearch.performers = '';
  formSearch.categoryId = '';
  formSearch.addressId = '';
}

// 定义自定义事件
const emit = defineEmits(['get:data']);

const sendData = () => {
  emit('get:data', formSearch); // 触发事件并传递数据
}

//定义数据模型
const formSearch = reactive({
  name:'',
  addressId:'',
  categoryId:'',
  performers:''
})

//定义地址数据模型
const addresses = ref([])

//得到地址列表
const getAddresses = () =>{
  getAddressesList().then(res => {
    addresses.value = res.data
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

//定义分类数据模型
const concertCategory =ref([])
//得到分类列表
const getConcertCategory = () => {
  getCategory().then(res => {
    concertCategory.value = res.data.list
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>