# Vue Config

- 项目根目录下`vue.config.js`
```javascript
module.exports = {
    // baseURL，建议开发环境下不设置，并从环境变量文件.env*中获取
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    // 开发环境服务器配置
    devServer: {
        // 端口
        port: 9001,
        // 接口代理
        proxy: {
            '/api1': {
                target: 'http://ip1:port1'
            },
            '/api2': {
                target: 'http://ip2:port2'
            }
        }
    },
    // 构建时不生成css和js的map文件
    productionSourceMap: false,
}
```

- 环境变量文件`.env`
1. 变量名以`VUE_APP_`为前缀
2. 代码中通过`process.env.VUE_APP_*`获取
3. 不同环境变量文件命名`.env.[mode]`，例如：`.env.prod`
4. 脚本中通过mode参数指定环境变量，
例如：`build:prod` --> `vue-cli-service build --mode prod`，注意`post`和`pre`钩子也要带`:prod` 