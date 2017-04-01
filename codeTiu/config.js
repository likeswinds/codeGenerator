var config={type:[
        {mysql:'varchar',java:'String',jdbcType:'varchar'},
        {mysql:'text',java:'String',jdbcType:'varchar'},
        {mysql:'int',java:'Integer',jdbcType:'Integer'},
        {mysql:'bit',java:'Integer',jdbcType:'bit'},
        {mysql:'tinyint(1)',java:'boolean',jdbcType:'Integer'},
        {mysql:'tinyint',java:'Integer',jdbcType:'Integer'},
        {mysql:'datetime',java:'Timestamp',jdbcType:'v'},
        {mysql:'date',java:'Date',jdbcType:'date'},
]}
// 代码生成器生成代码路径
config.targetFile="rimp"
config.basePackage="com.skynet"
config.projectName="rimp"
config.projectPath="rimp/com/skynet"+'/'+config.projectName
config.package = {
        entity: {
                name: 'Entity',
                path: `${config.projectPath}/entity`,
                ex: '.java',
                isEx:false//生成的类是否带扩展，如，class User{},class UserEntity{},
        },
        service: {
                name: 'Service',
                path: `${config.projectPath}/service`,
                ex: '.java',
                isEx:true
        },
        serviceImpl: {
                name: 'ServiceImpl',
                path: `${config.projectPath}/service/impl`,
                ex: '.java',
                isEx:false
        },
        dao: {
                name: 'Dao',
                path: `${config.projectPath}/dao`,
                ex: '.java',
                isEx:true
        },
        map: {
                name: 'Map',
                path: `${config.projectName}/resources/map`,
                ex: '.xml',
                isEx:true
        },
}
module.exports = config 