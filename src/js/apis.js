// 登录
export const $$login = params => $http.post("SysUser/login", params)
// 登出
export const $$logout = params => $http.get("SysUser/logout", params)
// 拉取字典项
let arr = [
  "dicTypes=DIC_1000",    //  残疾类型
  "dicTypes=DIC_1001",    //  残疾等级
  "dicTypes=DIC_1002",    //  户口类型
  "dicTypes=DIC_1003",    //  脱贫属性
  "dicTypes=DIC_1004",    //  贫困属性
  "dicTypes=DIC_1005",    //  致贫原因
  "dicTypes=DIC_1006",    //  文化程度
  "dicTypes=DIC_1007",    //  康复需求
  "dicTypes=DIC_1008",    //  乡镇
  "dicTypes=DIC_1009",    //  婚姻状况
]
export const $$queryDicByTypes = params => $http.get(`dictionaryApi/queryDicByTypes?${arr.join("&")}`, params)
// 基本信息
export const $$postInfoList = params => $http.post(`dpInfo/page/${params.offset}/${params.limit}`, params.query)
export const $$getInfoDetail = cardId => $http.get(`dpInfo/query/${cardId}`)
export const $$postAddInfo = params => $http.post(`dpInfo/add`, params)
export const $$postUpdateInfo = params => $http.post(`dpInfo/update`, params)
export const $$getDelInfo = cardId => $http.get(`/dpInfo/delete/${cardId}`)


// 建档立卡
export const $$postArchiveList = params => $http.post(`dpArchive/page/${params.offset}/${params.limit}`, params.query)
export const $$getArchiveDetail = cardId => $http.get(`dpArchive/query/${cardId}`)


// 惠农补助
export const $$postAllowanceList = params => $http.post(`dpAllowance/page/${params.offset}/${params.limit}`, params.query)


// 残疾学生
export const $$postStudentList = params => $http.post(`dpEducation/page/${params.offset}/${params.limit}`, params.query)


// 就业培训
export const $$postTrainList = params => $http.post(`DpTrain/page/${params.offset}/${params.limit}`, params.query)


// 康复需求
export const $$postCureList = params => $http.post(`dpCure/page/${params.offset}/${params.limit}`, params.query)