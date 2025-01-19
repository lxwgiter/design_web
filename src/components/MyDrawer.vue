<template>

  <el-drawer
      v-model="drawer"
      :title="myTitle"
      :direction="direction"
      :before-close="handleClose"
      size="900"
  >
    <el-form :inline="true" :model="concertForm" class="demo-form-inline" :rules="rules" ref="formRef">

      <span>演唱会封面</span>
      <el-row>
        <el-col :span="12">
          <el-upload
              ref="uploadRef"
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="handleBeforeUpload"
              accept="image/*"
          >
            <img :src="tempSaveUrl" class="avatar" v-if="tempSaveUrl"  alt="封面"/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <br />
        </el-col>
      </el-row>

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
import {ref, reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import type { DrawerProps } from 'element-plus'
import { getAddressesList } from '../services/address';
const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('rtl') // 设置默认为右到左
import {getCategory} from '../services/concertCategory'
import {addConcert,getDetails,updateConcert} from '../services/concert'
import {Plus, Upload} from '@element-plus/icons-vue'


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
        //清空临时预览图片
        selectedFile.value = ''
        console.log(tempSaveUrl.value)
        if(myTitle.value === '编辑门票信息'){
          tempSaveUrl.value=concertForm.coverImageUrl
        }
        tempSaveUrl.value = ''
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

const tempSaveUrl = ref('')//此变量临时保存图片URL
const displayUpdate = (id) => {
  getDetails(id).then(response => {
    concertForm.addressId=response.data.addressId
    concertForm.categoryId=response.data.categoryId
    concertForm.concertId=response.data.concertId
    concertForm.coverImageUrl=response.data.coverImageUrl
    tempSaveUrl.value=response.data.coverImageUrl
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

  const formData = new FormData();
  // 添加普通字段
  formData.append('name', concertForm.name);
  formData.append('performers', concertForm.performers);
  formData.append('addressId', concertForm.addressId);
  formData.append('categoryId', concertForm.categoryId);
  formData.append('detailedLocation', concertForm.detailedLocation);
  formData.append('startTime', new Date(concertForm.startTime).toISOString());
  formData.append('price', concertForm.price);
  formData.append('stock', concertForm.stock);
  formData.append('projectDetails', concertForm.projectDetails);
  formData.append('ticketInfo', concertForm.ticketInfo);
  formData.append('viewingInfo', concertForm.viewingInfo);

  // 添加文件字段
  if (selectedFile.value) {
    formData.append('file', selectedFile.value); // 这里的 'file' 应与控制器中@RequestParam的名称一致
  }else {
    ElMessage.error("请先选择图片")
    return;
  }
  // 调用表单的验证方法
  formRef.value.validate((valid) => {
    if (valid) {
      // 校验成功，执行提交逻辑
      executeAdd(formData)
      //隐藏抽屉
      drawer.value = false;
      //清除临时保存图片
      selectedFile.value = ''
      tempSaveUrl.value=''
      //清空数据
      clearData()
      //刷新页面
      setTimeout(()=>{
        props.flush()
      },1500)
      // 这里可以调用 API 进行提交
    } else {
      ElMessage.error("请按照要求填写")
      return false;
    }
  });
}

const executeUpdate = (formData) => {
  updateConcert(formData).then(res => {
    ElMessage.success("修改成功")
  }).catch(error => {
    ElMessage.error("服务异常", error)
  })
}

const onUpdate = () => {
  const formData = new FormData();
  // 添加普通字段
  formData.append('concertId', concertForm.concertId);
  formData.append('name', concertForm.name);
  formData.append('performers', concertForm.performers);
  formData.append('addressId', concertForm.addressId);
  formData.append('categoryId', concertForm.categoryId);
  formData.append('detailedLocation', concertForm.detailedLocation);
  formData.append('startTime', new Date(concertForm.startTime).toISOString());
  formData.append('price', concertForm.price);
  formData.append('stock', concertForm.stock);
  formData.append('projectDetails', concertForm.projectDetails);
  formData.append('ticketInfo', concertForm.ticketInfo);
  formData.append('viewingInfo', concertForm.viewingInfo);

  // 添加文件字段，若不存在则为null即可
  if (selectedFile.value) {

    formData.append('file', selectedFile.value); // 这里的 'file' 应与控制器中@RequestParam的名称一致
  }else {
    formData.append('coverImageUrl', concertForm.coverImageUrl);
  }
  // 调用表单的验证方法
  formRef.value.validate((valid) => {
    if (valid) {
      // 校验成功，执行提交逻辑
      executeUpdate(formData)
      //隐藏抽屉
      drawer.value = false;
      //清空临时缓存图片数据
      selectedFile.value = ''
      tempSaveUrl.value = ''
      //刷新页面
      setTimeout(() => {
        props.flush();
      }, 1500);
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
const executeAdd = (formData) => {
      addConcert(formData).then(res => {
        ElMessage.success("新增成功")
      }).catch(error => {
        ElMessage.error("服务异常", error)
      })
}

const uploadRef = ref();
const selectedFile = ref(null); // 新增一个 ref 来保存选中的文件

// 图片选择后回调
const handleBeforeUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    tempSaveUrl.value = e.target.result; // 更新头像预览
  };
  reader.readAsDataURL(file); // 以 Data URL 的形式读取文件
  selectedFile.value = file; // 保存选中的文件
  return false; // 阻止自动上传
};

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
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  max-width: 100%; /* 限制最大宽度为100% */
  max-height: 200px; /* 设置最大高度为200px，可以根据需要调整 */
  width: auto; /* 宽度自动 */
  height: auto; /* 高度自动 */
  object-fit: cover; /* 保持图像比例，裁剪多余部分 */
  border-radius: 6px; /* 可选，设置圆角 */
}

</style>