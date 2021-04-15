# Create React App

- API Proxy
1. npm install http-proxy-middleware
2. create file `setupProxy.js` at `src`, and config:
```javascript
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api1', createProxyMiddleware({
        target: 'http://ip1:port1'
    }));
    app.use('/api2', createProxyMiddleware({
        target: 'http://ip2:port2'
    }));
    // ...
}
```

- Using Environment `.env`
1. npm install `env-cmd`
2. custom variable start with `REACT_APP_`, using at code like `process.env.REACT_APP_*`
3. different environment nemed `.env.[mode]`, like `.env.prod`
4. run script like `build:prod: env-cmd -f .env.prod react-scripts build`, 
attention that hooks `post` and `pre` also need `:prod` 
5. general `.env`:
```ini
PORT=9002
# recommond not to setup when developing (due to proxy)
PUBLIC_URL=
GENERATE_SOURCEMAP=false
# never open browser after start
BROWSER=none
```