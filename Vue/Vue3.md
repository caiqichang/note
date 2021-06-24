# Vue Minimum Project

## Dependency
- vue@next
- vue-router@next
- vuex@next

## DevDependency
- @vue/cli-service
- @vue/compiler-sfc

## Project Content
```
├── public
│   └── index.html
├── src
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── .env
├── .env.prod
├── .gitignore
├── package.json 
└── vue.config.js
```

## File Content

### package.json
```json
{
  "name": "min-vue3",
  "version": "1.0.0",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build:prod": "vue-cli-service build --mode prod"
  },
  "dependencies": {
    "vue": "",
    "vue-router": "",
    "vuex": ""
  },
  "devDependencies": {
    "@vue/cli-service": "",
    "@vue/compiler-sfc": ""
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
/dist
```

### .env and .env.prod
```ini
VUE_APP_PUBLIC_PATH=
```

### vue.config.js
```javascript
module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    devServer: {
        port: 8080,
        // proxy: {

        // }
    },
    productionSourceMap: false,
};
```

### public/index.html
```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="icon" href="<%= VUE_APP_PUBLIC_PATH %>/favicon.ico">
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

### src/router/index.js
```javascript
import {createRouter, createWebHistory} from 'vue-router';
import VueConfig from '../../vue.config.js';

const routes = [

];

const router = createRouter({
    history: createWebHistory(VueConfig.publicPath),
    routes,
});

export default router;
```

### src/store/index.js
```javascript
import {createStore} from 'vuex';

const store = createStore({
    namespaced: true,
});

export default store;
```

### src/App.vue
```html
<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
  
</style>
```

### src/main.js
```javascript
import {createApp} from 'vue';
import App from './App.vue';
import store from './store/index.js';
import router from './router/index.js';

const app = createApp(App).use(store).use(router);
app.config.productionTip = false;
app.mount('#app');
```