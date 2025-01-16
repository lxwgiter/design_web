<template>

  <el-drawer
      v-model="drawer"
      :title="myTitle"
      :direction="direction"
      :before-close="handleClose"
      size="900"
  >
    <el-form :inline="true" :model="concertForm" class="demo-form-inline" :rules="rules" ref="formRef">

      <el-form-item label="演唱会封面" label-width="100" prop="coverImageUrl">
        <el-input v-model="concertForm.coverImageUrl" placeholder="输入封面" clearable style="width: 500px;"/>
      </el-form-item><br>

      <el-form-item label="演唱会名称" label-width="100" prop="name">
        <el-input v-model="concertForm.name" placeholder="输入演唱会名称" clearable style="width: 500px;"/>
      </el-form-item><br>

      <el-form-item label="参演明星" label-width="100" prop="performers">
        <el-input v-model="concertForm.performers" placeholder="输入参演明星" clearable style="width: 500px;"/>
      </el-form-item>

      <el-form-item label="地址" label-width="100" prop="addressId">
        <el-select
            v-model="concertForm.addressId"
            placeholder="请选择地址"
            clearable
            @click="getAddresses()"
        >
          <el-option v-if="myTitle==='编辑门票信息'" :label="otherDetailsOnUpdate.address+'(当前地址)'" :value="otherDetailsOnUpdate.addressId"  :key="0" disabled/>
          <el-option :label="address.location" :value="address.id" v-for="address in addresses" :key="address.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="类别" label-width="70" prop="categoryId">
        <el-select
            v-model="concertForm.categoryId"
            placeholder="请选择类别"
            clearable
            @click="getConcertCategory()"
        >
          <el-option v-if="myTitle==='编辑门票信息'" :label="otherDetailsOnUpdate.category+'(当前分类)'" :value="otherDetailsOnUpdate.categoryId"  :key="0" disabled/>

          <el-option :label="category.category" :value="category.id" v-for="category in concertCategory" :key="category.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" label-width="100" prop="detailedLocation">
        <el-input v-model="concertForm.detailedLocation" placeholder="请输入详细地址" clearable style="width: 500px;"/>
      </el-form-item>
      <el-form-item label="举办时间" label-width="100" prop="startTime">
        <el-date-picker
            v-model="concertForm.startTime"
            type="datetime"
            placeholder="点击选择日期"
            format="YYYY/MM/DD HH:mm:ss"
        />
      </el-form-item><br>

      <el-form-item label="价格" label-width="100" prop="price">
        <el-input-number v-model="concertForm.price" :min="1"  size="large">
          <template #suffix>
            <span>RMB</span>
          </template>
        </el-input-number>
      </el-form-item><br>

      <el-form-item label="库存" label-width="100" prop="stock">
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
      </el-form-item><br>


      <el-form-item style="margin-left: 300px">
        <el-button v-if="myTitle==='编辑门票信息'" type="primary" @click="onUpdate">确认修改</el-button>
        <el-button  v-if="myTitle !== '编辑门票信息'"  type="primary" @click="onSubmit">确认添加</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>


</template>

<script lang="ts" setup>
import {ref, defineExpose, reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import type { DrawerProps } from 'element-plus'
import { getAddressesList } from '../services/address';
const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('rtl') // 设置默认为右到左
import {getCategory} from '../services/concertCategory'
import {addConcert,getDetails,updateConcert} from '../services/concert'


//接受父组件的信息
const props = defineProps({
  flush: {
    type: Function,
    required: true, // 确保这个 prop 被传递
  },
});


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('此时关闭会导致未保存的数据丢失，您确定关闭吗？')
      .then(() => {
        //关闭窗口就清空数据
        clearData()
        done()
      })
}

function openDrawer() {
  direction.value = 'rtl'; // 设置方向为右到左
  drawer.value = true; // 打开抽屉
}
const otherDetailsOnUpdate = reactive({
  address :'',
  addressId:'',
  category :'',
  categoryId:''
})

const displayUpdate = (id) => {
  getDetails(id).then(response => {
    concertForm.addressId=response.data.addressId
    concertForm.categoryId=response.data.categoryId
    concertForm.concertId=response.data.concertId
    concertForm.coverImageUrl=response.data.coverImageUrl
    concertForm.detailedLocation=response.data.detailedLocation
    concertForm.name=response.data.name
    concertForm.performers=response.data.performers
    concertForm.price=response.data.price
    concertForm.projectDetails=response.data.projectDetails
    concertForm.startTime=new Date(response.data.startTime).toISOString()
    concertForm.stock=response.data.stock
    concertForm.ticketInfo=response.data.ticketInfo
    concertForm.viewingInfo=response.data.viewingInfo
    otherDetailsOnUpdate.address=response.data.address
    otherDetailsOnUpdate.addressId=response.data.addressId
    otherDetailsOnUpdate.category=response.data.category
    otherDetailsOnUpdate.categoryId=response.data.categoryId
  }).catch(err => {
    ElMessage.error("服务异常",err)
  })
}

//定义当前状态是新增还是删除
const myTitle = ref('')
const chooseTitle = (operate,concertId) =>{
  myTitle.value = operate
  if(operate == '编辑门票信息'){
    displayUpdate(concertId)
  }
}

const formRef = ref(null); // 表单引用
const onSubmit = () => {
  // 调用表单的验证方法
  formRef.value.validate((valid) => {
    if (valid) {
      // 校验成功，执行提交逻辑
      executeAdd(concertForm)
      //隐藏抽屉
      drawer.value = false;
      //刷新页面
      setTimeout(()=>{
        props.flush()
      },1000)
      // 这里可以调用 API 进行提交
    } else {
      ElMessage.error("请按照要求填写")
      return false;
    }
  });
}

const executeUpdate = (concertForm) => {
  console.log(concertForm)
  updateConcert(concertForm).then(res => {
    ElMessage.success("修改成功")
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

const onUpdate = () => {
  // 调用表单的验证方法
  formRef.value.validate((valid) => {
    if (valid) {
      // 校验成功，执行提交逻辑
      executeUpdate(concertForm)
      //隐藏抽屉
      drawer.value = false;
      //刷新页面
      setTimeout(() => {
        props.flush();
      }, 1000);
      // 这里可以调用 API 进行提交
    } else {
      ElMessage.error("请按照要求填写")
      return false;
    }
  });
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

//定义清空数据模型函数
const clearData = () => {
  concertForm.concertId = '',
  concertForm.name = '',
  concertForm.addressId = '',
  concertForm.detailedLocation = '',
  concertForm.startTime = '',
  concertForm.categoryId = '',
  concertForm.performers = '',
  concertForm.price = 1,
  concertForm.stock = 0,
  concertForm.coverImageUrl = '',
  concertForm.projectDetails = '',
  concertForm.ticketInfo = '',
  concertForm.viewingInfo = ''
}

//校验库存的函数
const checkStock = (rule, value, callback) => {
  if (!Number.isInteger(value)) {
    callback(new Error('库存只能是整数'))
  } else {
    callback()
  }
}
const commonRule =[{ required: true, message: '必填项', trigger: 'blur' }]
const rules = {
  name: commonRule,
  addressId: commonRule,
  detailedLocation: commonRule,
  startTime: commonRule,
  categoryId: commonRule,
  performers: commonRule,
  price: commonRule,
  coverImageUrl: commonRule,
  stock: [
    { validator: checkStock, trigger: 'blur' ,required: true}
  ]
}



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

const executeAdd = (data) => {
  addConcert(data).then(res => {
    ElMessage.success("添加成功")
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}



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