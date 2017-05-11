var config = {
  // jdbc、mysql 与java 的转换
  type: [
    {
      mysql: 'varchar',
      java: 'String',
      jdbcType: 'varchar'
    },
    {
      mysql: 'text',
      java: 'String',
      jdbcType: 'varchar'
    },
    {
      mysql: 'int',
      java: 'Integer',
      jdbcType: 'Integer'
    },
    {
      mysql: 'bit',
      java: 'Integer',
      jdbcType: 'boolean'
    },
    {
      mysql: 'tinyint(1)',
      java: 'boolean',
      jdbcType: 'Integer'
    },
    {
      mysql: 'tinyint',
      java: 'Integer',
      jdbcType: 'Integer'
    },
    {
      mysql: 'datetime',
      java: 'Timestamp',
      jdbcType: 'java.sql.Timestamp'
    },
    {
      mysql: 'date',
      java: 'Date',
      jdbcType: 'java.sql.Date'
    },
    {
      mysql: 'numeric',
      java: 'BigDecimal',
      jdbcType: 'java.math.BigDecimal'
    }
  ]
}

config.company = '天网软件股份有限公司'
config.author = 'gaowei'
config.version = '1.0'
// 数据库连接配置
config.database = {
  user: 'root',
  password: 'root',
  host: '192.168.21.190',
  database: 'dhpdb'
}
// 代码生成器生成代码路径
config.targetFile = 'code'
// 应用根包名
config.basePackage = 'com.tiuweb'
// 工程名
config.projectName = 'code'
// 工程代码路径，一般和包名，工程名对应
config.projectPath = 'code/com/tiuweb' + '/' + config.projectName
config.package = {
  //实体类设置
  entity: {
    name: 'Entity', //包名，首字母必须大写
    path: `${config.projectPath}/entity`, //文件路径
    ex: '.java', //扩展名
    isEx: false //生成的类是否带扩展，如，class User{},class UserEntity{},
  },
  service: {
    name: 'Service',
    path: `${config.projectPath}/service`,
    ex: '.java',
    isEx: true
  },
  serviceImpl: {
    name: 'ServiceImpl',
    path: `${config.projectPath}/service/impl`,
    ex: '.java',
    isEx: false
  },
  dao: {
    name: 'Dao',
    path: `${config.projectPath}/dao`,
    ex: '.java',
    isEx: true
  },
  map: {
    name: 'Map',
    path: `${config.projectName}/resources/map`,
    ex: '.xml',
    isEx: true
  }
}
module.exports = config
