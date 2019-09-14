import Immutable from "immutable";

/**
 * @description: 检测类型
 * @param {any} o 数据源
 * @return: Object,Array,Null,Number...
 */
const getType = (o) => {
  let type = Object.prototype.toString.call(o);
  type = type.slice(8, -1)
  return type
}
/**
* @description: 深拷贝
* @param {any} o  拷贝源
* @param {object} option
*      分两种情况:
*          1.{ 拷贝源属性 A : 新对象属性 B } : 将 A 对应的值拷贝到 B 上
*          2.{ 
*              拷贝源属性A : function(A 对应的值, A 所在的整个对象) {
*                              处理A...
*                              return { 
*                                  C:处理后的A
*                              }
*                           }
*            } 
*            可以将A对应的值进行处理，再放到新对象的C属性上(C与A平级)
* @return: 深拷贝后的新对象
*/
const fmtDeepClone = (o, option) => {
  let newObj;
  if (getType(o) === "Array") {
    newObj = []
  } else if (getType(o) === "Object") {
    newObj = {}
  } else {
    newObj = o
    return newObj
  }
  //  循环拷贝源
  for (let name in o) {
    //  不传 option 参数时，直接克隆
    if (getType(option) === "Undefined") {
      newObj[name] = fmtDeepClone(o[name], option)
      continue;
    }
    //  标识 option 中指定的参数是否存在于拷贝源
    let exist = false
    //  传递了 option 参数，循环配置对象
    for (let oldProp in option) {
      //  处理 option 中指定的原对象的属性
      if (oldProp === name) {
        exist = true
        //  如果配置对象的某个属性值不是函数,则符合情况1
        if (getType(option[oldProp]) !== "Function") {
          newObj[option[oldProp]] = fmtDeepClone(o[name], option)
        }
        //  如果配置对象的某个值是函数,则符合情况2。将函数返回值与新对象合并
        else {
          let rtn = option[oldProp](o[oldProp], o)
          Object.assign(newObj, rtn)
        }
      }
    }
    //  其他未在 option 中指定的属性则直接拷贝
    if (!exist) {
      newObj[name] = fmtDeepClone(o[name], option)
    }
  }
  return newObj
}
/**
 * @description: 时间格式化
 * @param {String,Date} date  
 * @param {String} fmt 转换的格式
 * @param {any} 不传时间时返回值
 * @return: 格式化的时间 String
 */
const fmtDate = (date, fmt = "yyyy-MM-dd HH:mm:ss", rtn = null) => {
  if (!date) return rtn
  let me = new Date(date);
  var o = {
    "M+": me.getMonth() + 1, //月份         
    "d+": me.getDate(), //日         
    "h+": me.getHours() % 12 == 0 ? 12 : me.getHours() % 12, //小时         
    "H+": me.getHours(), //小时         
    "m+": me.getMinutes(), //分         
    "s+": me.getSeconds(), //秒         
    "q+": Math.floor((me.getMonth() + 3) / 3), //季度         
    "S": me.getMilliseconds() //毫秒         
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (me.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[me.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}


/**
 * @description: 时间差
 * @param {Number} startDateStamp   //  时间戳
 * @param {Number} endDateStamp   //  时间戳
 * @param {Boolean} zeroPadding   //  补零
 * @return: 格式化的时间 String
 */
const diffTime = (startDateStamp, endDateStamp, zeroPadding = true) => {
  let diff = endDateStamp - startDateStamp; //  获取毫秒
  //计算出相差天数
  let days = Math.floor(diff / (24 * 3600 * 1000));

  //计算出小时数
  // let leave1 = diff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
  let leave1 = diff;
  let hours = Math.floor(leave1 / (3600 * 1000));

  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数
  let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);

  let rtn;
  if (zeroPadding) {
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`
    rtn = `${hours}:${minutes}:${seconds}`
  } else {
    rtn = `${hours}:${minutes}:${seconds}`
  }
  return rtn
}


/**
 * @description: 存储 sessionStorage 如果 value 是 undefined，则存入 空字符串
 * @param {type} 
 * @return: 
 */
const setSession = (key, value) => {
  const type = getType(value);
  if (["Array", "Object"].includes(type)) {
    value = JSON.stringify(value)
  } else if (type === "Undefined") {
    value = ""
  }
  sessionStorage.setItem(key, value)
}

/**
 * @description: 取出 sessionStorage
 * @param {type} 
 * @return: Null,Object,String
 */
const getSession = key => {
  let r = sessionStorage.getItem(key)
  try {
    r = JSON.parse(r)
  } catch (error) { }
  return r
}
/**
 * @description: 删除 / 清空 sessionStorage
 * @param {any} 传哪个删哪个，不传清空
 * @return: 
 */
const removeSession = key => {
  if (getType(key) === "Undefined") {
    sessionStorage.clear()
  } else {
    sessionStorage.removeItem(key)
  }
}


/**
 * @description: 存储 localStorage 如果 value 是 undefined，则存入 空字符串
 * @param {type} 
 * @return: 
 */
const setLocal = (key, value) => {
  const type = getType(value);
  if (["Array", "Object"].includes(type)) {
    value = JSON.stringify(value)
  } else if (type === "Undefined") {
    value = ""
  }
  localStorage.setItem(key, value)
}

/**
 * @description: 取出 localStorage
 * @param {type} 
 * @return: Null,Object,String
 */
const getLocal = key => {
  let r = localStorage.getItem(key)
  try {
    r = JSON.parse(r)
  } catch (error) { }
  return r
}
/**
 * @description: 删除 / 清空 localStorage
 * @param {any} 传哪个删哪个，不传清空
 * @return: 
 */
const removeLocal = key => {
  if (getType(key) === "Undefined") {
    localStorage.clear()
  } else {
    localStorage.removeItem(key)
  }
}

/**
 * @description: 嵌套数组对象扁平化(会修改原数组)
 * @param {Array} arr 嵌套关系数据
 * @param {String} childKey 关系字段
 * @param {Boolean} delOldKey 扁平后是否删除关系字段
 * @return: 扁平后的数据
 */

const tree2Flat = (arr, childKey = "children", delOldKey = true) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][childKey]) {
      arr.push(...arr[i][childKey])
      if (delOldKey) delete arr[i][childKey]
    }
  }
  return arr
}
/**
 * @description: 扁平关系数据 => 嵌套数据(会修改原数组)
 * @param {Array} data 数据源
 * @param {String} id 关系 id
 * @param {String} pId 关系 id
 * @param {String} childKey 子数据存放的字段
 * @param {any} root 跟数据 pId 标识
 * @return: 嵌套数据
 */
//  root : 根节点 pId 标识
const flat2Tree = (
  data,
  id = "id",
  pId = "parentId",
  childKey = "children",
  root = 0
) => {
  //  第一次遍历
  data.map(it => {
    //  如果是 非根数据
    if (it[pId] !== root) {
      //  进行第二次遍历
      data.map(obj => {
        //  如果第二次遍历的 id 与 第一次遍历的 pId 相同，证明【第二次遍历的数据】是【第一次】的【父级】
        if (obj[id] === it[pId]) {
          if (!obj[childKey]) obj[childKey] = [];
          obj[childKey].push(it);
        }
      });
    }
  });
  //  过滤，只保存根节点数据
  return data.filter(it => it[pId] === root);
}

// 深拷贝
const deepClone = (obj) => {
  return Immutable.fromJS(obj).toJS()
}
//  判断是否为空
const isEmpty = (p) => {
  return Immutable.fromJS(p).isEmpty()
}

/**
 * @description:  生成唯一 id
 * @param {type} 
 * @return: 
 */

const UUID = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  let rtn = s.join("");
  return rtn;
}

/**
 * @description: setTimeout 模拟 setInterval
 * @param {Function} cb 执行的方法，cb 必须返回一个 promise
 * @param {Any} cbParams cb 的参数
 * @param {Number} interval 执行间隔
 * @param {Boolean} immediate 是否立即执行
 * @param {Function} stopFn 停止的方法，返回 true 时停止
 * @return: 
 */
const loop = async (cb, cbParams = null, interval = 1000, immediate = true, stopFn = () => { }) => {
  let stop = stopFn()
  const fn = async () => {
    stop = stopFn()
    if (stop) return
    cbParams === null ? await cb() : await cb(cbParams)
    setTimeout(fn, interval);
  };
  if (stop) return
  if (immediate) {
    cbParams === null ? await cb() : await cb(cbParams)
  };
  setTimeout(fn, interval);
}

// render函数，用于table的文字超过宽度隐藏的显示。
const overflowRender = (key, cb = val => val[key]) => (h, params) => {
  let text = cb(params.row);
  let title = text;
  if (!text) {
    text = '-'
  }
  if (Object.prototype.toString.call(text) === `[object Object]`) {
    title = text.title;
    text = text.text;
  }
  return (< span title={title} class="tableCellwarp"> {text} </span>)
};

// 获取 url 参数
const getQueryString = (key) => {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 生成区间随机数
const random = (min = 0, max = 10) => {
  let rtn = Math.floor(Math.random() * (max - min) + min)
  return rtn
}

// blob 下载
const download = (blob) => {
  let o = window.URL.createObjectURL(blob)
  let a = document.createElement("a")
  a.href = o
  a.setAttribute("download", name)
  a.click()
  a = null
}

export {
  getType,// 查看类型
  fmtDeepClone, // 深拷贝并格式化
  fmtDate,  //  时间格式化
  diffTime,  // 时间差
  setSession,// 存储 sessionStorage
  getSession,// 取出 sessionStorage
  removeSession,//  删除 / 清空 sessionStorage
  setLocal,// 存储 localStorage
  getLocal,// 取出 localStorage
  removeLocal,//  删除 / 清空 localStorage
  tree2Flat,// 嵌套数组对象扁平化
  flat2Tree,//  扁平关系数据 => 嵌套数据
  deepClone,//深拷贝
  isEmpty,//  判断是否为空
  UUID,//  生成唯一ID
  loop,// setTimeout 模拟 setInterval
  getQueryString,// 获取 url 参数
  random,//  生成区间随机数
  download// 下载
}