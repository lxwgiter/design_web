import http from "../utils/http.js";

//提供查询所有地址的接口
export const getAllAddresses = ()=>{
    return http.get('/address/allByPage');
}

//提供查询所有地址的接口
export const getAddresses = (pageNumber,pageSize)=>{
    return http.get(`/address/allByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

//提供查询所有地址的接口
export const getAddressesList = ()=>{
    return http.get('/address/all');
}