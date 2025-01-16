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

//提供添加门票详情的接口
export const addConcert = (data)=>{
    return http.post('/concert/add',data);
}

//修改门票时数据回显
export const getDetails = (concertId)=>{
    return http.get(`/concert/getConcertById?concertId=${concertId}`);
}

//修改门票
export const updateConcert = (data)=>{
    return http.put('/concert/updateConcert',data);
}

//根据concertId删除门票
export const deleteConcert = (concertId)=>{
    return http.delete(`/concert/deleteConcert?concertId=${concertId}`);
}

