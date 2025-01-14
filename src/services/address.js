import http from "../utils/http.js";

//提供查询所有地址的接口
export const getAllAddresses = ()=>{
    return http.get('/address/all');
}

//提供查询所有地址的接口
export const getAddresses = (pageNumber,pageSize)=>{
    return http.get(`/address/all?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}