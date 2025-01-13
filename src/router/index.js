// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminLayout from "../views/admin/AdminLayout.vue";
import Address from "../views/admin/Address.vue";
import ConcertCategory from "../views/admin/ConcertCategory.vue";
import AdminAvatar from "../views/admin/AdminAvatar.vue";
import AdminUserDetail from "../views/admin/AdminUserDetail.vue";
import Concert from "../views/admin/Concert.vue";
import AdminResetPassword from "../views/admin/adminResetPassword.vue";

//定义路由关系
const routes = [
    { path: '/adminLogin', component: AdminLogin },
    { path: '/adminLayout', component: AdminLayout ,children: [
            {path: '/adminLayout/address', component: Address},
            {path: '/adminLayout/concertCategory', component: ConcertCategory},
            {path: '/adminLayout/adminAvatar', component: AdminAvatar},
            {path: '/adminLayout/adminUserDetail', component: AdminUserDetail},
            {path: '/adminLayout/concert', component: Concert},
            {path: '/adminLayout/resetPassword', component: AdminResetPassword},
        ]},
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router; // 导出路由实例