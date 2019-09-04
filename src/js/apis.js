// 登录
export const $$login = params => $http.post("SysUser/login", params)
// 分享任务列表
export const $$queryShareTaskList = params => $http.get("TaskController/shareTaskList", params)
// 更换头像
export const $$changeAvator = params => $http.form("AppUserController/changeHeadImgUrl", params)
