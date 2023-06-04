import request from "./request"

// 登录
export const reqLogin = (data) => {
    return request({
        url: "/user/login/workerIn",
        method: "post",
        data,
    })
}
// 登出
export const reqLogOut = () => {
    return request({
        url: "/login/out",
        method: "get",
    })
}
// 获取员工信息
export const reqGetEmp = () => {
    return request({
        url: "/user/maintenanceWorkerInfo/getWokerInfo",
        method: "get",
    })
}
// 修改员工信息
export const reqChangeEmp = (data) => {
    return request({
        url: " /user/userInfo/reset",
        method: "post",
        data
    })
}
// 删除员工
export const reqDelEmp = (worderId) => {
    return request({
        url: `/user/userInfo/delUser?id=${worderId}`,
        method: "post",
    })
}
// 新增员工
export const reqAddEmp = (data) => {
    return request({
        url: `/user/maintenanceWorkerInfo/addWokerInfo`,
        method: "put",
        data
    })
}
// 
// 获取用户信息
export const reqGetUser = () => {
    return request({
        url: "/user/userInfo/getAllUserInfo",
        method: "get",
    })
}
// 修改用户信息
export const reqReset = (id) => {
    return request({
        url: `/user/userInfo/reset?id=${id}`,
        method: "post",
    })
}
// 删除用户
export const reqDelUser = (id) => {
    return request({
        url: `/user/userInfo/delUser?id=${id}`,
        method: "post",
    })
}
// 新增用户
export const reqAddUser = (data) => {
    return request({
        url: `/user/userInfo/addUser`,
        method: "post",
        data
    })
}
// 新增广告
export const reqAddPost = (data) => {
    return request({
        url: `/task/advertisementInfo/add`,
        method: "put",
        data
    })
}
// 获取全部投诉
export const reqAllSue = (data) => {
    return request({
        url: `/task/complaintInfo/getAllComplaint`,
        method: "get",
    })
}
// 处理完成
export const reqEndSue = (id) => {
    return request({
        url: `/task/complaintInfo/complete?id=${id}`,
        method: "post",
    })
}
// 获取维修单
export const reqFix = (id) => {
    return request({
        url: `/task/repairOrderInfo/getAllInfo?id=${id}`,
        method: "get",
    })
}
// 
export const reqFixEnd = (data) => {
    return request({
        url: `/task/repairOrderInfo/complete`,
        method: "post",
        data
    })
}