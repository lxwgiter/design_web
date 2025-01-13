import http from "../utils/http.js";

//提供调用注册接口的函数
export const adminRegisterService = (registerData)=>{
    return http.post('/admin/register',registerData);
}
//登录接口
export const adminLoginService = (LoginData)=>{
    return http.post('/admin/login',LoginData);
}
