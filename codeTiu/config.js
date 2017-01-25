var config={type:[
        {mysql:'varchar',java:'String'},
        {mysql:'text',java:'String'},
        {mysql:'int',java:'Integer'},
        {mysql:'bit',java:'Integer'},
        {mysql:'tinyint(1)',java:'boolean'},
        {mysql:'tinyint',java:'Integer'},
        {mysql:'datetime',java:'Timestamp'},
]}
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
                name: 'map',
                path: `${config.projectName}/resources/map`,
                ex: '.xml',
                isEx:true
        },
}
module.exports = config 