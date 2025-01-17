<script setup>
import { reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import { User, Lock,Menu} from '@element-plus/icons-vue'
import {forgetPassword} from "../services/adminService.js";
import {useTokenStore} from '../store/token.js'

//创建pinia实例
const tokenStore = useTokenStore()

const formForgetPassword = reactive({
  account: '',
  email: '',
  newPassword: '',
  reNewPassword: ''
})


const centerDialogVisible = ref(false)

function openDialog() {
  centerDialogVisible.value = true; // 打开对话框
}
//暴露给父组件

defineExpose({ openDialog });


//表单引用
const myForm=ref('')

//校验密码的函数
const checkReNewPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认新密码'))
  } else if (value !== formForgetPassword.newPassword) {
    callback(new Error('请确保两次输入的密码一样'))
  } else {
    callback()
  }
}

const rules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  reNewPassword: [
    { required: true,validator: checkReNewPassword, trigger: 'blur' }
  ]
}


function clearData() {
  formForgetPassword.account=''
  formForgetPassword.newPassword=''
  formForgetPassword.reNewPassword=''
  formForgetPassword.email=''
}

const handleSubmit= ()=>{
  myForm.value.validate((valid) => {
    if (valid) {
      forgetPassword(formForgetPassword).then(res=>{
        //清除当前用户的登录
        tokenStore.removeToken()
        ElMessage.success("设置新密码成功")
        clearData()
      }).catch(err=>{
        ElMessage.error("服务异常",err)
      })
    }else {
      ElMessage.error("请按要求输入")
      return false // 返回 false，停止进一步的处理
    }
  })

}
</script>
<template>
  <el-dialog
      v-model="centerDialogVisible"
      title="忘记密码"
      width="500"
      align-center
  >
    <el-form :model="formForgetPassword" :rules="rules" label-width="100px" size="large" ref="myForm">
      <el-form-item label="账号" prop="account">
        <el-input :prefix-icon="User" v-model="formForgetPassword.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item  label="邮箱" prop="email">
        <el-input :prefix-icon="Menu"  placeholder="请输入邮箱" v-model="formForgetPassword.email"></el-input>
      </el-form-item>
      <el-form-item  label="新密码" prop="newPassword">
        <el-input :prefix-icon="Lock" type="password" placeholder="请输入新密码" v-model="formForgetPassword.newPassword"></el-input>
      </el-form-item>
      <el-form-item  label="确认新密码" prop="reNewPassword">
        <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入新密码" v-model="formForgetPassword.reNewPassword"></el-input>
      </el-form-item>
      <el-form-item  :label-width="200">
        <el-button type="primary" @click="handleSubmit()">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>