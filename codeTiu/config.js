var config = {
  type: [
    {mysql: 'varchar', java: 'String', jdbcType: 'varchar'},
    {mysql: 'text', java: 'String', jdbcType: 'varchar'},
    {mysql: 'int', java: 'Integer', jdbcType: 'Integer'},
    {mysql: 'bit', java: 'Integer', jdbcType: 'bit'},
    {mysql: 'tinyint(1)', java: 'boolean', jdbcType: 'Integer'},
    {mysql: 'tinyint', java: 'Integer', jdbcType: 'Integer'},
    {mysql: 'datetime', java: 'Timestamp', jdbcType: 'v'},
    {mysql: 'date', java: 'Date', jdbcType: 'date'},
  ],
}
config.database = {
  user: 'root',
  password: 'root',
  host: '192.168.21.190',
  database: 'information_schema',
}
// 代码生成器生成代码路径
config.targetFile = 'rimp'
// 应用根包名
config.basePackage = 'com.skynet'
// 工程名
config.projectName = 'rimp'
// 工程代码路径，一般和包名，工程名对应
config.projectPath = 'rimp/com/skynet' + '/' + config.projectName
config.package = {
  //实体类设置
  entity: {
    name: 'Entity', //包名
    path: `${config.projectPath}/entity`, //文件路径
    ex: '.java', //扩展名
    isEx: false, //生成的类是否带扩展，如，class User{},class UserEntity{},
  },
  service: {
    name: 'Service',
    path: `${config.projectPath}/service`,
    ex: '.java',
    isEx: true,
  },
  serviceImpl: {
    name: 'ServiceImpl',
    path: `${config.projectPath}/service/impl`,
    ex: '.java',
    isEx: false,
  },
  dao: {
    name: 'Dao',
    path: `${config.projectPath}/dao`,
    ex: '.java',
    isEx: true,
  },
  map: {
    name: 'Map',
    path: `${config.projectName}/resources/map`,
    ex: '.xml',
    isEx: true,
  },
}
module.exports = config
