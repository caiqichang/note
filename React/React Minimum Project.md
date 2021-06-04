# React Minimum Project

## Dependency
- env-cmd
- http-proxy-middleware
- react
- react-dom
- react-router-dom
- react-scripts
- recoil

## Project Structure
```
├── public
│   └── index.html
├── src
│   ├── router
│   │   └── Router.js
│   ├── store
│   │   └── StoreBuilder.js
│   ├── App.js
│   ├── index.js
│   └── setupProxy.js
├── .env
├── .env.prod
├── .gitignore
└── package.json 
```

## File Content

### package.json
- attention: `browserslist` is required, value cloud be `[]`
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
    "react-scripts": "",
    "recoil": ""
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
    
    let routes = [

    ];

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

### src/store/StoreBuilder.js
```javascript
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';

export default function (key, state, action) {
    const keyAtom = atom({
        key: `${key}Atom`,
        default: JSON.parse(JSON.stringify(state)),
    });

    const keySelector = selector({
        key: `${key}Selector`,
        set: ({set}, value) => set(keyAtom, JSON.parse(JSON.stringify(value))),
    });

    return function () {
        const setState = useSetRecoilState(keySelector);

        let actionWrapper = {};
        Object.keys(action).forEach(k => {
            actionWrapper[k] = function () {
                let result = action[k].apply(null, [].slice.call(arguments));
                setState(state);
                return result;
            };
        });

        return {state: useRecoilValue(keyAtom), action: actionWrapper};
    };
};
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
import {RecoilRoot} from 'recoil';

ReactDOM.render(
    <React.Fragment>
       <RecoilRoot>
            <App/>
        </RecoilRoot>
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