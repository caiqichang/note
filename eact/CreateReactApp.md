# Create React App

- api代理
1. 依赖 `http-proxy-middleware`
2. `src` 目录下新建 `setupProxy.js`
```javascript
const {createProxyMiddleware} = require('http-proxy-middleware');

/**
 * api代理
 * @param app
 */
// eslint-disable-next-line import/no-anonymous-default-export
module.exports = app => {
    app.use('/api1', createProxyMiddleware({
        target: 'http://ip1:port1'
    }));
    app.use('/api2', createProxyMiddleware({
        target: 'http://ip2:port2'
    }));
}
```

- 环境变量文件`.env*`
1. 依赖 `env-cmd`
2. 变量名以`REACT_APP_`为前缀
3. 代码中通过`process.env.REACT_APP_*`获取
4. 不同环境变量文件命名`.env.[mode]`，例如：`.env.prod`
5. 脚本中指定环境变量，
例如：`build:prod` --> `env-cmd -f .env.prod react-scripts build`，注意`post`和`pre`钩子也要带`:prod` 
6. 通用 `.env`
```ini
# 端口
PORT=9002
# baseUrl，建议开发环境下不设置
PUBLIC_URL=
# 构建时不生成css和js的map文件
GENERATE_SOURCEMAP=false
# 运行后不打开浏览器
BROWSER=none
```