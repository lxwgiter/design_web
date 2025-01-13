import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'//导入elementPlus
import 'element-plus/dist/index.css'//导入emp样式
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';//pinia持久化插件


const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);

app.use(ElementPlus);//安装ElementPlus插件
app.mount('#app')
