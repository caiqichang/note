# React最小项目

> `package.json`必须有`browserslist`，值可以为`[]` 

## 依赖
- dependency
  - env-cmd
  - http-proxy-middleware
  - react
  - react-dom
  - react-router-dom
  - react-scripts

## 脚本
- react-scripts start
- react-scripts build
> 指定环境变量 env-cmd -f .env.[mode] react-scripts build

## 项目结构
```
public
|- favicon.ico
|- index.html
src
|- assert
|- component
|- router
   |- Router.js
|- store
   |- Store.js
|- view
|- App.js
|- index.js
|- setupProxy.js
.env
.env.prod
.gitignore
package.json 
```

## 主要文件

### package.json
```json
{
  "name": "",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build:prod": "env-cmd -f .env.prod react-scripts build"
  },
  "browserslist": [],
  "dependencies": {
    "env-cmd": "",
    "http-proxy-middleware": "",
    "react": "",
    "react-dom": "",
    "react-router-dom": "",
    "react-scripts": ""
  }
}
```

### .gitignore
```ini
# node
node_modules
package-lock.json

# vscode
.vscode

# jetbrains
.idea
*.iml

# project
/build
```

### .env
```ini
PORT=3000
PUBLIC_URL=
GENERATE_SOURCEMAP=false
BROWSER=none
```

### .env.prod
```ini
PUBLIC_URL=
```

### public/index.html
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    <title></title>
    <style type="text/css">
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>
<div id="app"></div>
<script type="text/javascript">
    'use strict';
</script>
</body>
</html>
```

### src/router/Router.js
```javascript
import {Route, Switch} from 'react-router-dom';
import React from "react";

function Router(props) {
    
    let routes = [];

    return (
        <Switch>
            {
                routes.map(r => <Route key={r.path[0]} path={r.path} exact={r.exact} component={r.component}/>)
            }
        </Switch>
    );
}

export default Router;

```

### src/store/Store.js
```javascript
function Store(react) {
    this.action.state = () => {
        return {...state};
    };
    this.action.publish = (newState) => {
        state = {...state, ...newState};
        subscribe.forEach(s => s(state));
    };

    let state = this.state;
    let action = this.action;

    let subscribe = [];

    return () => {
        const [, newSubscribe] = react.useState();
        react.useEffect(() => {
            subscribe.push(newSubscribe);
            return () => {
                subscribe = subscribe.filter(s => s !== newSubscribe);
            };
        }, [state]);
        return {state, action};
    };
}

export default Store;
```

### src/App.js
```javascript
import Router from "./router/Router.js";
import {BrowserRouter} from "react-router-dom";
import React from "react";

function App() {
    return (
        <div className={'App'}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Router/>
            </BrowserRouter>
        </div>
    );
}

export default App;
```

### src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(
    <React.Fragment>
        <App/>
    </React.Fragment>
    , document.getElementById('app')
);
```

### src/setupProxy.js
```javascript
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = app => {
    
}
```