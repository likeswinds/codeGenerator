// var ddl = require('./db/ddl.js');
// var sys = require('./db/sys_table.js');
// var xlsx = require('./excel/zy.js');
// var comp = require('./excel/comp.js');

var generator = require('./codeTiu/generator');

 
var str=generator.tables('hos_dept_info,hos_area_info')
console.log(str)
// generator()

// var date =new Date
// var year=Number(date.getFullYear())
// var df=""
// for(let i=2016;i<=year;i++){ 
//     df+="year："+i
// }
// console.log(df)
// // function year(year){
// //   if(year%4==0 && year%100!=0 || year%400==0){
// //       console.log("yes")
// //   }else { 
// //       console.log("false")
// //   }
// // }
// // year(104)
// //comp();
//  var del = require('./fs/delFileByDate.js');
//  del("E:/osc/webapp", "2017-01-01 00:00:00")

// var data = { name: "zs", age: '12' }

// function getSome(data, show) {
//     console.log(JSON.stringify(data))
//     show(data)
//     return 1;
// }

// var d = getSome(data, function(pram) {
//     console.log(JSON.stringify(pram.age))
// })