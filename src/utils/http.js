
import axios from 'axios';
import { ElMessage } from 'element-plus'
import {useTokenStore} from "../store/token.js";



const baseURL = '/api';
//导入路由组件
// import { useRouter } from 'vue-router';
//
// const router = useRouter(); // 获取路由实例
import router from '../router/index.js';

const http = axios.create({
    baseURL: baseURL, // 替换为您的API基础URL
    timeout: 10000, // 请求超时设置
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        // 可以在这里添加请求头，JWT token等
        let tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        //判断业务状态码
        if(response.data.code === 200){
            return response.data;
        }
        ElMessage.error(response.data.message ? response.data.message:'服务异常')
        //异步操作的状态转换为失败
        return Promise.reject(response.data)
    },
    (err) => {
        //判断响应状态码,如果为401,则证明未登录,提示请登录,并跳转到登录页面
        if(err.response.status===401){

            ElMessage.error('请先登录')
            console.log(router)
            router.push('/adminLogin')
        }else{
            ElMessage.error('服务异常')
        }

        return Promise.reject(err);//异步的状态转化成失败的状态
    }
);

export default http;