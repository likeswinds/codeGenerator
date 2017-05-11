var config = require('./config')
let util = {}
/**
 * 获取字段映射
 */
util.getJavaType = mysqlType => {
  let rtn = ''
  for (let con of config.type) {
    if (con.mysql == mysqlType.toLowerCase()) {
      rtn = con.java
      break
    } else if (mysqlType.indexOf(con.mysql.toLowerCase()) >= 0) {
      rtn = con.java
      break
    }
  }
  return rtn
}
/**
 * 获取字段映射
 */
util.getJdbcType = mysqlType => {
  let rtn = ''
  for (let con of config.type) {
    if (con.mysql == mysqlType.toLowerCase()) {
      rtn = con.jdbcType.toUpperCase()
      break
    } else if (mysqlType.indexOf(con.mysql.toLowerCase()) >= 0) {
      rtn = con.jdbcType.toUpperCase()
      break
    }
  }
  return rtn
}
/**
 * 获取字段映射
 */
util.replace = (source, reg, rep) => {
  let rtn = ''
  let arr = source.split(reg)
  for (let str of arr) {
    rtn += '.' + str
  }

  return rtn
}
/**
 * 从mysql命名至java驼峰命名
 */
util.getCamel = source => {
  let arr = source.split('_')
  let rtn = ''
  for (let i in arr) {
    let str = ''
    if (i == 0) {
      str = arr[i].toLowerCase()
    } else {
      str = arr[i].substr(0, 1).toUpperCase()
      str += arr[i].substr(1, arr[i].length).toLowerCase()
    }
    rtn += str
  }
  return rtn
}
/**
 * 函数命名方式，首字母全大写
 */
util.getMethod = source => {
  let arr = source.split('_')
  let rtn = ''
  for (let i in arr) {
    let str = ''
    str = arr[i].substr(0, 1).toUpperCase()
    str += arr[i].substr(1, arr[i].length).toLowerCase()
    rtn += str
  }
  return rtn
}
module.exports = util
