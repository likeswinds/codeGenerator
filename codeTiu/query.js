var mysql = require('mysql')
var config = require('./config')
var TEST_DATABASE = 'information_schema'
var DATABASE = config.database.database
let dataSource = {
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  database: 'information_schema'
}
//创建连接
var client = mysql.createConnection(dataSource)

client.connect(config.database)
// client.query("use " + TEST_DATABASE)
module.exports.all = function(callback) {
  client.query(
    `SELECT * FROM TABLES where TABLE_SCHEMA='${DATABASE}' `,
    function select(err, results) {
      if (err) {
        throw err
      }
      callback(results)
    }
  )
}

module.exports.tables = function(tables, callback) {
  let tbs = tables.split(',')
  let params = ''
  for (let t of tbs) {
    params += `'${t}',`
  }
  let sql = `SELECT * FROM TABLES where TABLE_SCHEMA='${DATABASE}' and table_name in (${params.substring(0, params.length - 1)}) `
  client.query(sql, function select(err, results) {
    if (err) {
      throw err
    }
    callback(results)
  })
}

module.exports.table = function(tableName, callback) {
  //SELECT * FROM COLUMNS where  TABLE_SCHEMA='${DATABASE}' and table_name ='${tableName}'
  let sql = `SELECT * FROM COLUMNS where  TABLE_SCHEMA='${DATABASE}' and table_name ='${tableName}'`
  // console.log(sql)
  client.query(sql, function select(err, results) {
    if (err) {
      throw err
    }
    callback(results)
  })
}
