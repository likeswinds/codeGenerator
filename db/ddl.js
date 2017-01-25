module.exports = function() {
    //引入包
    var fs = require('fs') //文件读取
    var papa = require('./node_modules/babyparse/babyparse.js') //csv文件解析

    //根据国标地址生成字段类型
    function getType(str) {
        if (typeof str != 'string') {
            return ''
        }
        let type = str.toUpperCase()
        let rtn = ''
            //AN，或A开头
        if (type.indexOf('A') >= 0) {
            //当有..时，取右边的最大值
            if (type.indexOf('..') >= 0) {
                let n = type.split('..')[1]
                if (n.indexOf('X') >= 0) {
                    //str=AN..20X3
                    let a = n.split('X')[0]
                    let b = n.split('X')[1]
                    let max = new Number(a)
                    max = max * new Number(b)
                    rtn = `varchar2(${max})`
                } else {
                    //str=AN..10 或 str=AN4..10
                    rtn = `varchar2(${n})`
                }
            } else {
                let n = str.replace(/[^0-9]/ig, "")
                rtn = `varchar2(${n})`

            }
        } else if (type.indexOf('N') >= 0) {
            //N开头，数字
            if (type.indexOf(',') >= 0) {
                //N2..4,2 或 N4,2 
                let i = '1'
                let left = type.split(',')[0]
                if (left.indexOf('..') >= 0) {
                    //N2..4,2
                    i = left.split('..')[1]
                } else {
                    //N4,2
                    i = left.replace(/[^0-9]/ig, "")
                }
                let d = type.split(',')[1]
                rtn = `number(${i},${d})`
            } else {
                let n = 1
                if (type.indexOf('..') >= 0) {
                    n = type.split('..')[1]
                } else {
                    n = type.replace(/[^0-9]/ig, "")
                }
                rtn = `number(${n})`
            }
        } else if (type.indexOf('D') >= 0) {
            rtn = `date`
        } else if (type.indexOf('T/F') >= 0) {
            rtn = 'number(1)'
        } else if (type.indexOf('B1OB') >= 0) {
            rtn = 'blob'
        } else if (type.indexOf('T26') >= 0 || type.indexOf('T14') >= 0) {
            rtn = 'timestamp'
        }

        return rtn
    }
    /*
    console.info(getType('N2..4,2'))
    console.info(getType('N4,2'))
    console.info(getType('N1'))
    console.info(getType('N2..4'))
    console.info(getType('AN2..4'))
    console.info(getType('A2..4'))
    console.info(getType('A2..3x4'))
    */
    //读取文件列表
    var files = ['space_his', 'space_fp', 'space_ph', 'space_sys']
    for (let space_name of files) {
        let filename = `file/${space_name}.csv`
            //读取文件
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                return console.error(err);
            }
            let csv = papa.parse(data)
            let tbs = []
                //转换数据
            for (let d of csv.data) {
                let obj = {}
                obj.tb = d[0]
                obj.tbName = d[1]
                obj.name = d[2]
                obj.en = d[3]
                obj.zh = d[4]
                obj.comment = d[5]
                obj.type = d[6]
                obj.len = d[7]
                obj.dic = d[8]
                obj.isnull = d[9]
                obj.remark = d[10]
                tbs.push(obj)
            }
            getdata(tbs, space_name)
        });
    }
    //获取DDL SQL
    function getdata(data, space_name) {
        let tables = []
        let tbs = []
        let str = ''
        let id = 0
            //获取所有表
        for (let d of data) {
            var tb = {}
            tb.name = d.tb.trim().toUpperCase()
            if (str == tb.name) {
                d.id = id
                continue
            } else {
                id++;
                tb.comment = d.tbName
                tb.id = id
                tables.push(tb)
                str = tb.name
                d.id = id
            }
        }
        //console.log(JSON.stringify(data))
        //获取所有表字段
        for (let t of tables) {
            let tb = {}
            let columns = []
            for (let d of data) {
                var tb1 = t.id
                var tb2 = d.id
                if (tb1 == tb2) {
                    var column = {}
                    column.name = d.en //.split('.').join('_')
                    column.comment = d.zh
                    column.type = getType(d.len)
                    let isNull = ''
                    if (d.isnull.toUpperCase() == 'Y') {
                        isNull = 'null'
                    } else if (d.isnull.toUpperCase() == 'N') {
                        isNull = 'not null'
                    }
                    column.isNull = isNull
                    columns.push(column)
                }
            }
            //console.log(JSON.stringify(columns))
            tb.name = t.name
            tb.comment = t.comment
            tb.column = columns
            tbs.push(tb)
        }
        //console.log(JSON.stringify(tbs))
        //表空间sql
        let space = `tablespace ${space_name}
pctfree 10
initrans 1
maxtrans 255
storage
    (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
);
`
        let sql = ''
            //创建ddl 字段sql
        for (let t of tbs) {
            let col = ''
                //表注释部分
            let comments = `-- Add comments to the table
comment on table ${t.name} is '${t.comment}'; 
-- Add comments to the columns \n`
                //创建字段、字段注释
            let clen = 0
            for (let c of t.column) {
                clen++
                let spl = ','
                if (clen == t.column.length) {
                    spl = ''
                }
                col += `    ${c.name} ${c.type} ${c.isNull} ${spl} -- ${c.comment}\n`
                comments += `comment on column ${t.name}.${c.name} is '${c.comment}';\n`
            }

            sql += `-- Create table ${t.comment}
create table ${t.name}(
${col})
${space}
${comments}`
        }

        //写入文件
        fs.writeFile(`${space_name}.sql`, sql, function(err) {
            if (err) throw err;
            console.log(`${space_name}.sql,文件保存成功`); //文件被保存
        });

    }



}