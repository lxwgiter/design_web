<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getMe,updateNicknameAndEmail,updatePassword} from '../../services/adminService.js'
import {ElMessage} from "element-plus";
import { User, Lock,Stamp} from '@element-plus/icons-vue'
const formResetPassword = reactive({
  account: '',
  oldPassword: '',
  newPassword: '',
  reNewPassword: ''
})

//表单引用
const myForm=ref('')

//校验密码的函数
const checkReNewPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认新密码'))
  } else if (value !== formResetPassword.newPassword) {
    callback(new Error('请确保两次输入的密码一样'))
  } else {
    callback()
  }
}

const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  reNewPassword: [
    { required: true,validator: checkReNewPassword, trigger: 'blur' }
  ]
}

const executeGet=()=>{
  getMe().then(res => {
    formResetPassword.account = res.data.account
  }).catch(err => ElMessage.error("服务异常",err))
}

onMounted(()=>{
      executeGet()
    }
)

const handleSubmit= ()=>{
  myForm.value.validate((valid) => {
    if (valid) {
      updatePassword({oldPassword: formResetPassword.oldPassword,newPassword: formResetPassword.newPassword}).then(res=>{
        ElMessage.success("修改成功,请牢记新密码")
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
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="formResetPassword" :rules="rules" label-width="100px" size="large" ref="myForm">
          <el-form-item label="账号">
            <el-input :prefix-icon="User" v-model="formResetPassword.account" disabled></el-input>
          </el-form-item>
          <el-form-item  label="原密码" prop="oldPassword">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入原密码" v-model="formResetPassword.oldPassword"></el-input>
          </el-form-item>
          <el-form-item  label="新密码" prop="newPassword">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入新密码" v-model="formResetPassword.newPassword"></el-input>
          </el-form-item>
          <el-form-item  label="确认新密码" prop="reNewPassword">
            <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入新密码" v-model="formResetPassword.reNewPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit()">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>