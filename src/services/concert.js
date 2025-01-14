import http from "../utils/http.js";

//提供查询所有演唱会门票的接口
export const getAllConcert = ()=>{
    return http.get('/concert/allConcert');
}

//提供分页查询门票的接口
export const getConcertPage = (pageNumber,pageSize)=>{
    return http.get(`/concert/allConcert?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

//提供查询门票项目详情的接口
export const getProjectDetails = (concertId)=>{
    return http.get(`/concert/projectDetails?concertId=${concertId}`);
}

//提供查询门票购票须知的接口
export const getTicketInfo = (concertId)=>{
    return http.get(`/concert/ticketInfo?concertId=${concertId}`);
}

//提供查询门票观影须知须知的接口
export const getTViewingInfo = (concertId)=>{
    return http.get(`/concert/viewingInfo?concertId=${concertId}`);
}

//提供修改门票详情的接口
export const updateDetails = (data)=>{
    return http.patch('/concert/updateDetails',data);
}

