//代码生成器

var fs = require("fs");
//path模块，可以生产相对和绝对路径
var path = require("path");
var DateUtils = require('date-utils');
var ejs = require('ejs');
var query = require('../codeTiu/query');
var config = require('../codeTiu/config');

module.exports = function () {
    query.tables(function (results) {
        let table_comment=""
        for (let result of results) {
            console.log(result)
            table_comment=result.TABLE_COMMENT
            generator(result.TABLE_NAME, config.package.entity, "codeTiu/temp/entity.txt",result.TABLE_COMMENT )
            generator(result.TABLE_NAME, config.package.service, "codeTiu/temp/service.txt",result.TABLE_COMMENT )
           generator(result.TABLE_NAME, config.package.service, "codeTiu/temp/dao.txt",result.TABLE_COMMENT )
           generator(result.TABLE_NAME, config.package.map, "codeTiu/temp/map.txt",result.TABLE_COMMENT )
            generator(result.TABLE_NAME, config.package.serviceImpl, "codeTiu/temp/serviceImpl.txt",result.TABLE_COMMENT )
        }
    })
}

function generator(tab, package, filePath,table_comment) {
    var basefilePath = 'java/'+package.path 
     var classType = package.name 
    if (!fs.existsSync(basefilePath)) {
        fs.mkdirSync(basefilePath);
    }
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err)
            console.log("读取文件fail " + err);
        else {
            // 读取成功时  
            // 输出字节数组  
            //console.log(data);
            var pat_auth = ""
            query.table(tab, function (results) {
                let columns = []
                let tablePk=''
                for (let result of results) {
                    let column = {}
                    column.name = result.COLUMN_NAME
                    column.data_type = result.DATA_TYPE
                    column.pk = result.COLUMN_KEY == 'PRI' ? 1 : 0
                    if(column.pk ){
                        tablePk=result.COLUMN_NAME
                    }
                    column.comment = result.COLUMN_COMMENT
                    column.camel_name = getCamel(result.COLUMN_NAME)
                    column.method_name = getMethod(result.COLUMN_NAME)
                    column.type = getType(result.COLUMN_TYPE)
                    columns.push(column)
                }
                let table = {
                    name: getMethod(results[0].TABLE_NAME),
                    columns: columns,
                    paramName:getCamel(results[0].TABLE_NAME),
                    table_name:results[0].TABLE_NAME,
                    pk:tablePk,
                    pkCamel:getCamel(tablePk),
                    comment:table_comment,
                    projectName:config.projectName
                }
                //console.log(table) 
                var da = Date.today()
                let strPack=replace(package.path,'/','.') 
                let basePackage=strPack.substr(config.projectName.length+2,strPack.length)
                var param = {
                    now: da.toFormat("YYYY-MM-DD HH:MM:SS"),
                    table: table,
                    package: basePackage
                }
                var str = ejs.render(data, param); 
                
                
                var savefile=  basefilePath+'/'+table.name+classType+package.ex 
                console.log(savefile)
                fs.writeFileSync(savefile, str, {
                    encoding: 'utf-8'
                });

            })
        }
    });
}
/**
 * 获取字段映射
 */
function getType(mysqlType) {
    let rtn = ""
    for (let con of config.type) {
        if (con.mysql == mysqlType.toLowerCase()) {
            rtn = con.java
            break
        } else if (mysqlType.indexOf(con.mysql.toLowerCase()) >= 0) {
            rtn = con.java
            break
        }
    }
    return rtn;

}
/**
 * 获取字段映射
 */
function replace(source,reg,rep) {
    let rtn = "" 
    let arr = source.split(reg)
    for (let str of arr) {
        rtn+='.'+str
    }

    return rtn;

}
/**
 * 从mysql命名至java驼峰命名
 */
function getCamel(source) {
    let arr = source.split('_')
    let rtn = ""
    for (let i in arr) {
        let str = ""
        if (i == 0) {
            str = arr[i].toLowerCase();
        } else {
            str = arr[i].substr(0, 1).toUpperCase();
            str += arr[i].substr(1, arr[i].length).toLowerCase();
        }
        rtn += str;
    }
    return rtn;
}
/**
 * 函数命名方式，首字母全大写
 */
function getMethod(source) {
    let arr = source.split('_')
    let rtn = ""
    for (let i in arr) {
        let str = ""
        str = arr[i].substr(0, 1).toUpperCase();
        str += arr[i].substr(1, arr[i].length).toLowerCase();
        rtn += str;
    }
    return rtn;
}