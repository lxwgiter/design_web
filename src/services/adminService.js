import http from "../utils/http.js";

//提供调用注册接口的函数
export const adminRegisterService = (registerData)=>{
    return http.post('/admin/register',registerData);
}
//登录接口
export const adminLoginService = (LoginData)=>{
    return http.post('/admin/login',LoginData);
}

//得到管理员本身的信息
export const getMe = ()=>{
    return http.get('/admin/me');
}

//修改昵称和邮箱
export const updateNicknameAndEmail = (nickname,email)=>{
    return http.patch(`/admin/updateNicknameAndEmail?nickname=${nickname}&email=${email}`);
}

//修改密码
export const updatePassword = (data)=>{
    return http.post('/admin/updatePassword',data);
}

//忘记密码
export const forgetPassword = (data)=>{
    return http.post('/admin/forgetPassword',data);
}

//修改头像
export const updateAvatar = (formData)=>{
    return http.post('/admin/updateAvatarUrl', formData,{
        headers: {
            'Content-Type': 'multipart/form-data' // 需要指定为表单数据
        }});
}
