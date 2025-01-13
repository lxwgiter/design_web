import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'//导入elementPlus
import 'element-plus/dist/index.css'//导入emp样式


const app = createApp(App);
app.use(ElementPlus);//安装ElementPlus插件
app.mount('#app')
