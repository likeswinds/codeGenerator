//代码生成器
var fs = require("fs")
//path模块，可以生产相对和绝对路径
var path = require("path")
var DateUtils = require('date-utils')
var ejs = require('ejs')
var query = require('./query')
var config = require('./config')
var mk = require('./mkFile')
var util = require('./util')

 

let doGen = (results) => {
    let table_comment = ""
    for (let result of results) {
        // console.log(result)
        table_comment = result.TABLE_COMMENT
        generator(result.TABLE_NAME, config.package.entity, "codeTiu/temp/entity.ejs", result.TABLE_COMMENT)
        generator(result.TABLE_NAME, config.package.service, "codeTiu/temp/service.ejs", result.TABLE_COMMENT)
        generator(result.TABLE_NAME, config.package.dao, "codeTiu/temp/dao.ejs", result.TABLE_COMMENT)
        generator(result.TABLE_NAME, config.package.map, "codeTiu/temp/map.ejs", result.TABLE_COMMENT)
        generator(result.TABLE_NAME, config.package.serviceImpl, "codeTiu/temp/serviceImpl.ejs", result.TABLE_COMMENT)
    }
}
module.exports.all = function () {
    query.tables(function (results) {
        doGen(results)
    })
}
module.exports.tables = function (tables) {
    query.tables(tables, function (results) {
        doGen(results)
    })
}
/**
 * 代码生成主函数
 */
function generator(tab, package, filePath, table_comment) {
    var basefilePath = config.targetFile + '/' + package.path
    var classType = package.name
    mk(basefilePath)
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err)
            console.log("读取文件fail " + err)
        else {
            // 读取成功时  
            // 输出字节数组  
            //console.log(data)
            var pat_auth = ""
            query.table(tab, function (results) {
                let columns = []
                let tablePk = ''
                // 定义字段信息
                for (let result of results) {
                    let column = {}
                    // 字段名称-原始字段
                    column.name = result.COLUMN_NAME
                    // 字段类型-mysql类型
                    column.data_type = result.DATA_TYPE
                    // 是否为主键
                    column.pk = result.COLUMN_KEY == 'PRI' ? 1 : 0
                    // 主键字段名-原始字段
                    if (column.pk) {
                        tablePk = result.COLUMN_NAME
                    }
                    // 字段说明
                    column.comment = result.COLUMN_COMMENT
                    // 字段名称-驼峰命名方式
                    column.camel_name = util.getCamel(result.COLUMN_NAME)
                    // 字段名称-首字母全大写
                    column.method_name = util.getMethod(result.COLUMN_NAME)
                    // 字段类型对应的java类型
                    column.javaType = util.getJavaType(result.COLUMN_TYPE)
                    // 字段类型对应的mybatis中的jdbc类型
                    column.jdbcType = util.getJdbcType(result.COLUMN_TYPE)
                    columns.push(column)
                }
                // 定义模板输出Table相关信息
                let table = {
                    name: util.getMethod(results[0].TABLE_NAME),
                    // 表对应的字段
                    columns: columns,
                    // 方法中对应的实体参数
                    paramName: util.getCamel(results[0].TABLE_NAME),
                    // 原始表名
                    table_name: results[0].TABLE_NAME,
                    // 主键字段-原始字段
                    pk: tablePk,
                    // 主键字段-驼峰命名方式
                    pkCamel: util.getCamel(tablePk),
                    // 表注释
                    comment: table_comment,
                    // 工程名称
                    projectName: config.projectName
                }
                //console.log(table) 
                var da = Date.today()
                let strPack = util.replace(package.path, '/', '.')
                let filePackage = strPack.substr(config.projectName.length + 2, strPack.length)
                var param = {
                    // 当前系统时间
                    now: da.toFormat("YYYY-MM-DD HH:MM:SS"),
                    // 表信息
                    table: table,
                    // 包名
                    package: filePackage,
                    // 基础包，如com.skynet
                    basePackage: config.basePackage,
                    config:config,
                    importEntity:config.basePackage+'.'+config.projectName+'.'+config.package.entity.name.toLowerCase()+'.'+table.name,  
                    importDao:config.basePackage+'.'+config.projectName+'.'+config.package.dao.name.toLowerCase()+'.'+table.name+config.package.dao.name, 
                    importService:config.basePackage+'.'+config.projectName+'.'+config.package.service.name.toLowerCase()+'.'+table.name+config.package.dao.service, 
                    importServiceImpl:config.basePackage+'.'+config.projectName+'.'+config.package.serviceImpl.name.toLowerCase()+'.'+table.name+config.package.dao.serviceImpl
                }
                var str = ejs.render(data, param)

                var savefile = basefilePath + '/' + table.name + classType + package.ex
                console.log(savefile)
                fs.writeFileSync(savefile, str, {
                    encoding: 'utf-8'
                })

            })
        }
    })
} 