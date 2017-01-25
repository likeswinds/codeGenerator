module.exports = function() {
    var fs = require('fs') //文件读取
    var papa = require('../node_modules/babyparse/babyparse.js') //csv文件解析
        //读取文件
    fs.readFile('./file/model.csv', 'utf8', function(err, data) {
        if (err) {
            return console.error(err);
        }
        let csv = papa.parse(data)
        let tbs = []
        let sql = ''
        for (let d of csv.data) {
            if (d[0] != '') {
                let table = d[0].toUpperCase()
                tbs.push(table)
                sql += `update t_sys_table set model='医疗服务' where table_name='${table}' ;\n`
            }
        }
        console.log(JSON.stringify(tbs))
            //写入文件
        fs.writeFile(`./sql/t_sys_table_his.sql`, sql, function(err) {
            if (err) throw err;
            console.log(`文件保存成功`); //文件被保存
        });
    });

}