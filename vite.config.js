import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 目标 API 服务器
        changeOrigin: true, // 支持虚拟托管
        rewrite: (path) => path.replace(/^\/api/, ''), // 移除/api前缀
      },
    },
  },
})
