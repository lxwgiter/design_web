<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
const isRegister = ref(false)

// 定义数据模型
const LoginData = reactive({
  account: '',
  password: '',
  rePassword: ''
})
//定义函数,清空数据模型的数据
const clearLoginData = ()=>{
  LoginData.account = ''
  LoginData.password = ''
  LoginData.rePassword = ''
}


//校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== LoginData.password) {
    callback(new Error('请确保两次输入的密码一样'))
  } else {
    callback()
  }
}
// 定义表单校验规则
const rules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  rePassword: [
    { validator: checkRePassword, trigger: 'blur' }
  ]
}


</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg">麦麦管理员面板</el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister":model="LoginData" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="account">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="LoginData.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="LoginData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="LoginData.rePassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = !isRegister;clearLoginData()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="!isRegister" :model="LoginData" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="account">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="LoginData.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="LoginData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = !isRegister;clearLoginData()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('../assets/background.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100%; /* 确保背景高度已有，保证垂直居中 */
    user-select: none; /* 禁止文本选中 */
    font-size: 50px;
    color: #333; /* 设置字体颜色为深灰色 */
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>