import http from "../utils/http.js";

//提供查询所有演唱会门票的接口
export const getAllConcert = ()=>{
    return http.get('/concert/allConcert');
}

//提供分页查询门票的接口
export const getConcertPage = (pageNumber,pageSize)=>{
    return http.get(`/address/all?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}