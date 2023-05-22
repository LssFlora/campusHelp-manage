import request from "./request"

// 登录
export const reqLogin = (data) => {
    return request({
        url: "/api/login",
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
// 获取所有账户信息
export const reqUserInfo = (phone) => {
    return request({
        url: `/api//getAllUser`,
        method: "get",
    })
}
// 删除用户
export const reqDeleteUser = (id) => {
    return request({
        url: `/api/deleteUser?id=${id}`,
        method: "delete",
    })
}
// 添加用户
export const reqRegiUser = (data) => {
    return request({
        url: `/api/register`,
        method: "post",
        data
    })
}
