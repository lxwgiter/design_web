<script setup>
import { Plus, Upload } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { getMe,updateAvatar } from "../../services/adminService.js";
import {ElMessage} from "element-plus";
import {useAdminAvatarStore} from "../../store/adminAvatarStore.js";

const avatarStore = useAdminAvatarStore();

const uploadRef = ref();
const avatarUrl = ref('');
const selectedFile = ref(null); // 新增一个 ref 来保存选中的文件

// 组件挂载后获取用户头像
onMounted(() => {
  getMe().then(res => {
    avatarUrl.value = res.data.avatarUrl;
    avatarStore.setAvatarUrl(res.data.avatarUrl)
  }).catch(err => {
    console.error("服务异常",err);
  });
});

// 图片选择后回调
const handleBeforeUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarUrl.value = e.target.result; // 更新头像预览
  };
  reader.readAsDataURL(file); // 以 Data URL 的形式读取文件
  selectedFile.value = file; // 保存选中的文件
  return false; // 阻止自动上传
};



// 手动上传文件
const uploadAvatar = async () => {
  if (!selectedFile.value) {
    ElMessage.error("请先选择图片")
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value); // 将文件添加到 FormData

  updateAvatar(formData).then(() => {
    ElMessage.success("修改头像成功")
    setTimeout(() => {
      getMe().then(res => {
        avatarUrl.value = res.data.avatarUrl;
        avatarStore.setAvatarUrl(res.data.avatarUrl)
      });
    },1500)
  }).catch(err => {
    ElMessage.error("服务异常",err)
  })

}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>更换头像</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-upload
            ref="uploadRef"
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            accept="image/*"
        >
        <img :src="avatarUrl" class="avatar" v-if="avatarUrl" />
        </el-upload>
        <br />
        <el-button
            type="primary"
            :icon="Plus"
            size="large"
            @click="uploadRef.$el.querySelector('input').click()"
        >
          选择图片
        </el-button>
        <el-button
            type="success"
            :icon="Upload"
            size="large"
            @click="uploadAvatar"
        >
        上传头像
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>