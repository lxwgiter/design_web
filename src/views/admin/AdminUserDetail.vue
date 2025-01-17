<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getMe,updateNicknameAndEmail} from '../../services/adminService.js'
import {ElMessage} from "element-plus";

//定义表单 引用
const detailForm =ref('')

const userInfo = reactive({
  account: '',
  nickName: '',
  email: '',
  createdTime:''
})
const rules = {
  nickName: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {min: 2, max: 50, message: '长度为2~50位非空字符', trigger: 'blur'}
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const executeGet=()=>{
  getMe().then(res => {
    userInfo.account = res.data.account
    userInfo.nickName = res.data.nickName
    userInfo.email = res.data.email
    userInfo.createdTime = res.data.createdTime
  }).catch(err => ElMessage.error("服务异常",err))
}

onMounted(()=>{
  executeGet()
    }
)

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
};

const handleSubmit= ()=>{
  detailForm.value.validate((valid) => {
    if (valid) {
      updateNicknameAndEmail(userInfo.nickName,userInfo.email).then(res=>{
        ElMessage.success("修改成功")
        setTimeout(executeGet,1000)
      }).catch(err=>{
        ElMessage.error("服务异常",err)
      })
    } else {
      ElMessage.error("请按要求输入")
      return false // 返回 false，停止进一步的处理
    }
  })
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" label-width="100px" size="large" ref="detailForm">
          <el-form-item label="账号">
            <el-input v-model="userInfo.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input :value="formatDate(userInfo.createdTime)" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="userInfo.nickName"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit()">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>