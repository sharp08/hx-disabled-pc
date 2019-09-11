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
  "dicTypes=DIC_1010",    //  培训类型
  "dicTypes=DIC_1011",    //  补助项目
]
export const $$queryDicByTypes = params => $http.get(`dictionaryApi/queryDicByTypes?${arr.join("&")}`, params)
// 基本信息
export const $$postInfoList = params => $http.post(`dpInfo/page/${params.offset}/${params.limit}`, params.query)
export const $$postExportInfoList = params => $http.post(`dpInfo/page/0/10?export=1`, params.query)
export const $$postImportInfoList = params => $http.post(`dpInfo/importDpInfo`, params)
export const $$getInfoDetail = idCard => $http.get(`dpInfo/query/${idCard}`)
export const $$postAddInfo = params => $http.post(`dpInfo/add`, params)
export const $$postUpdateInfo = params => $http.post(`dpInfo/update`, params)
export const $$getDelInfo = idCard => $http.get(`dpInfo/delete/${idCard}`)


// 建档立卡
export const $$postArchiveList = params => $http.post(`dpArchive/page/${params.offset}/${params.limit}`, params.query)
export const $$postImportArchiveList = params => $http.post(`dpArchive/importDpArchive`, params)
export const $$getArchiveDetail = idCard => $http.get(`dpArchive/query/${idCard}`)
export const $$postArchiveAdd = params => $http.post(`dpArchive/add`, params)
export const $$postArchiveUpdate = params => $http.post(`dpArchive/update`, params)
export const $$getDelDoc = id => $http.get(`dpArchive/delete/${id}`)

// 惠农补助
export const $$postAllowanceList = params => $http.post(`dpAllowance/page/${params.offset}/${params.limit}`, params.query)
export const $$getFarmerWinList = params => $http.get(`dpAllowance/queryPageByIdCard`, params)
export const $$postImportAllowanceList = params => $http.post(`dpAllowance/importDpAllowance`, params)
export const $$postFarmerWinAdd = params => $http.post(`dpAllowance/add`, params)
export const $$postFarmerWinUpdate = params => $http.post(`dpAllowance/update`, params)
export const $$getFarmerWinDel = id => $http.get(`dpAllowance/delete/${id}`)
export const $$getFarmerWinDetail = id => $http.get(`dpAllowance/query/${id}`)
export const $$getDelAllowance = id => $http.get(`dpAllowance/delete/${id}`)

// 残疾学生
export const $$postStudentList = params => $http.post(`dpEducation/page/${params.offset}/${params.limit}`, params.query)
export const $$getStudentWinList = params => $http.get(`dpEducation/queryPageByIdCard`, params)
export const $$postImportEducationList = params => $http.post(`dpEducation/importDpEducation`, params)
export const $$postStudentWinAdd = params => $http.post(`dpEducation/add`, params)
export const $$postStudentWinUpdate = params => $http.post(`dpEducation/update`, params)
export const $$getStudentWinDel = id => $http.get(`dpEducation/delete/${id}`)
export const $$getStudentWinDetail = id => $http.get(`dpEducation/query/${id}`)

// 就业培训
export const $$postTrainList = params => $http.post(`DpTrain/page/${params.offset}/${params.limit}`, params.query)
export const $$getPageByIdCard = params => $http.get(`DpTrain/queryPageByIdCard`, params)
export const $$postImportTrainList = params => $http.post(`dpTrain/importDpTrain`, params)
export const $$getTrainDetail = id => $http.get(`DpTrain/query/${id}`)
export const $$postAddTrain = params => $http.post(`DpTrain/add`, params)
export const $$postUpdateTrain = params => $http.post(`DpTrain/update`, params)
export const $$getDelTrain = id => $http.get(`DpTrain/delete/${id}`)


// 康复需求
export const $$postCureList = params => $http.post(`dpCure/page/${params.offset}/${params.limit}`, params.query)
export const $$getCureWinList = params => $http.get(`dpCure/queryPageByIdCard`, params)
export const $$postImportCureList = params => $http.post(`dpCure/importDpCure`, params)
export const $$postCureWinAdd = params => $http.post(`dpCure/add`, params)
export const $$postCureWinUpdate = params => $http.post(`dpCure/update`, params)
export const $$getCureWinDetail = id => $http.get(`dpCure/query/${id}`)
export const $$getDelCure = id => $http.get(`dpCure/delete/${id}`)