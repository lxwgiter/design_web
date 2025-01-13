// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from "../views/AdminLogin.vue";

//定义路由关系
const routes = [
    { path: '/adminLogin', component: AdminLogin }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router; // 导出路由实例