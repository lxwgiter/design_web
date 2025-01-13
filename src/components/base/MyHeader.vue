<template>
  <div class="header" :style="{ backgroundImage: 'url(../../assets/background.jpg)' }">
    <div class="container">
      <img class="logo" src="../../assets/logo.jpg" alt="Logo" />
      <h1 class="title">麦麦演唱会管理员系统</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const backgroundImage = ref('xxx'); // 背景图片链接
</script>

<style scoped>
.header {
  width: 100%; /* Header 占满全宽 */
  padding: 20px 0; /* 上下内边距 */
  background-size: cover; /* 背景图覆盖整个 Header */
  background-position: center; /* 背景图居中 */
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 中心对齐 */
  align-items: center; /* 垂直居中 */
}

.container {
  display: flex; /* Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
  padding: 0 20px; /* 左右内边距 */
  color: #fff; /* 文字颜色 */
}

.logo {
  height: 50px; /* logo 高度 */
  margin-right: 20px; /* logo 右边距 */
}

.title {
  font-size: 24px; /* 标题字体大小 */
  font-weight: bold; /* 加粗 */
}
</style>