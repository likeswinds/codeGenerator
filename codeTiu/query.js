var mysql = require('mysql');
var TEST_DATABASE = 'information_schema';
var DATABASE = 'rimpdb';
//创建连接  
var client = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: '192.168.21.190',
    database : 'information_schema'
});

client.connect();
// client.query("use " + TEST_DATABASE);
module.exports.all = function (callback) {

    client.query(`SELECT * FROM TABLES where TABLE_SCHEMA='${DATABASE}' `,
        function select(err, results) {
            if (err) {
                throw err;
            }
            callback(results)
        }
    )
}

module.exports.tables = function (tables,callback) {
    let tbs = tables.split(',')
    let params=''
    for(let t of tbs){
        params += `'${t}',`
    }
    let sql = `SELECT * FROM TABLES where TABLE_SCHEMA='${DATABASE}' and table_name in (${params.substring(0,params.length-1)}) `
    client.query(sql,
        function select(err, results) {
            if (err) {
                throw err;
            }
            callback(results)
        }
    )
}

module.exports.table = function (tableName, callback) { 

    //SELECT * FROM COLUMNS where  TABLE_SCHEMA='${DATABASE}' and table_name ='${tableName}'
    let sql = `SELECT * FROM COLUMNS where  TABLE_SCHEMA='${DATABASE}' and table_name ='${tableName}'`
    // console.log(sql)
    client.query(sql,
        function select(err, results) {
            if (err) {
                throw err;
            } 
            callback(results)
        }
    )
}