# Vue CLI Config

- location at project root `vue.config.js`
```javascript
module.exports = {
    // recommond not to setup when developing, and read from .env file
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    devServer: {
        port: 9001,
        // API Proxy
        proxy: {
            '/api1': {
                target: 'http://ip1:port1'
            },
            '/api2': {
                target: 'http://ip2:port2'
            }
        }
    },
    productionSourceMap: false,
}
```

- Using Environment `.env`
1. custom variable start with `VUE_APP_`, using at code like `process.env.VUE_APP_*`
3. different environment nemed `.env.[mode]`, like `.env.prod`
4. run script like `build:prod: vue-cli-service build --mode prod`,
attention that hooks `post` and `pre` also need `:prod`