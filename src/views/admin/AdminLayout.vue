<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '../../assets/default.jpg'
import { useRouter } from 'vue-router';
import {useTokenStore} from '../../store/token.js'
import {onBeforeUnmount, onMounted, reactive} from "vue";
import {getMe} from '../../services/adminService.js'
import {ElMessage} from "element-plus";
import eventBus from '../../utils/eventBus.js'; // 导入事件总线

const router = useRouter(); // 获取路由实例

//创建pinia实例
const tokenStore = useTokenStore()
const userInfo = reactive({
  nickName : '',
  avatar : '',
})
const receiveData = (data) => {
  userInfo.nickName = data; // 更新接收到的数据
};

onMounted(()=>{
  //绑定自定义事件
  eventBus.on('dataEvent', receiveData);
  getMe().then(res => {
    userInfo.nickName = res.data.nickName
    userInfo.avatar = res.data.avatar
  }).catch(err => ElMessage.error("服务异常",err))
})
// 组件卸载前取消订阅防止内存泄漏
onBeforeUnmount(() => {
  eventBus.off('dataEvent', receiveData);
});
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="250px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
               router>
        <el-menu-item index="/adminLayout/concertCategory">
          <el-icon>
            <CaretBottom />
          </el-icon>
          <span>演唱会分类</span>
        </el-menu-item>
        <el-menu-item index="/adminLayout/address">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>举办地址列表</span>
        </el-menu-item>
        <el-menu-item index="/adminLayout/concert">
          <el-icon>
            <EditPen />
          </el-icon>
          <span>门票管理</span>
        </el-menu-item>
        <el-menu-item >
          <el-icon>
            <Management />
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-sub-menu >
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/adminLayout/adminUserDetail">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/adminLayout/adminAvatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/adminLayout/resetPassword">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>当前管理员：<strong>{{ userInfo.nickName }}</strong></div>
        <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User" @click="router.push('/adminLayout/adminUserDetail')">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop" @click="router.push('/adminLayout/adminAvatar')">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen" @click="router.push('/adminLayout/resetPassword')">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton" @click="tokenStore.removeToken();router.push('/adminLogin')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <div style="width: 100%; height: 100%;">
          <router-view></router-view>
        </div>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>麦麦网 ©2025 All rights reserved.</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('../../assets/maimai.jpg') no-repeat center / 250px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>