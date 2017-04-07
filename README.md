# codeGenerator
nodejs，代码生成器
## 使用方法
### 环境准备
npm install -g cnpm
cnpm install
打开vscode，启动应用程序
### 单表生成
var str = generator.tables('hos_dept_info')
### 多表生成
var str = generator.tables('hos_dept_info,hos_area_info')
### 生成所有表
var str = generator.all()
## 配置
所有配置都在config文件中
### mysql数据库配置
  database必须为information_schema

  user: 'root',
  password: 'root',
  host: '192.168.21.190',
  database: 'information_schema', 
