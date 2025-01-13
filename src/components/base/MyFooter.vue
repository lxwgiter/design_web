<template>
  <footer class="footer">
    <div class="container">
      <p>© {{ currentYear }} xxx. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

// 获取当前年份
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
  width: 100%; /* 让 footer 跨满全宽 */
  background-color: #f8f9fa; /* 背景颜色 */
  text-align: center; /* 文本居中 */
  padding: 20px 0; /* 上下内边距 */
  position: relative; /* 位置属性 */
  bottom: 0; /* 定位在底部 */
}

.container {
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 居中对齐 */
  padding: 0 20px; /* 左右内边距 */
}
</style>