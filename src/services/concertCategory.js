import http from "../utils/http.js";

//提供查询所有地址的接口
export const getCategory = ()=>{
    return http.get(`/concertCategory/all?pageNumber`);
}
//分页
export const getCategoryPage = (pageNumber,pageSize)=>{
    return http.get(`/concertCategory/all?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}