# VueRouter笔记

安装
```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default new VueRouter({
    mode, // 默认为hash，history模式下后端最好配置其他url都返回入口文件
    base, // 路由根路径，建议导入获取vue.config.js的publicPath
    routers,
});
```

定义路由规则
```javascript
const routers = [
    {name, path, component}, // 模糊参数以:开头，e.g. /user/:id/order/:num
    {name, path, component}, // 匹配程度越低放在越后面，/*放最后，通常对应404页面
    {name, path, component: {
        default, view1, view2  // 默认视图名为default
    }, children:[]}, // children嵌套路由，子路由的path不用/开头，默认子路由的path为''
    {path,redirect: name_or_path}, // 重定向
    {path,redirect: to => name_or_path}, // to为目标路由
    {name, path, component, props: route => {}}, // 路由参数，route为目标路由，prop的s返回值会成为组件props，但不覆盖组件的data
    {name, path, component: () => {return import(/* webpackChunkName: "NAME" */ 'COMPONENT_DIRECTORY');}}, // 懒加载
    // ...
    scrollBehavior(to, from, savePosition) { // 滚动
        return savePosition; // 浏览器默认行为，历史位置
        return {x, y}; // 指定位置
        return {selector: to.hash}; // 锚点
    },
];

// 相同组件url变化时组件会复用，通过watch监听路由
watch: {
    $route(to, from) {}
}
```

使用
```html
<!-- HTML -->
<router-link v-bind:to="{name,params,query}">label</router-link>
<router-link v-bind:to="{path,query}">label</router-link> <!-- path下params无效 -->
<transition> <!-- 过渡动画 -->
    <router-view name="view-name"></router-view> <!-- 没有name，则使用default组件 -->
</transition>

<!-- JS -->
<script>
vm.$router // 访问路由器
vm.$router.push({name,path,params,query}, onComplete, onAbort); // path下params无效
vm.$router.replace(); // 同push()，但会替换history
vm.$router.go(n); // 类似window.history.go()

vm.$route //访问当前路由
vm.$route.params // 路径参数
vm.$route.query // url参数 ?
vm.$route.hash // #参数
</script>
```

守卫 hook
```javascript
// 全局
router
.beforeEach((to, from, next) -> { 
    // 前置
    next(); // 参数：无--默认跳转；path或route--跳转到指定路由；false--阻止跳转
})
.afterEach((to, from) => {
    // 后置
});

// 路由独立
routes: [{name, path, component, beforeEnter(to, from, next){}}]

// 组件内部
beforeRouterEnter(to, from, next) {
    // 无法访问 this， 组件还未实例化
    next(vm => { 
        // 通过回调访问组件 
    });
}
beforeRouteUpdate(to, from, next) {
    // 路由复用时调用
}
beforeRouteLeave(to, from next) {}
```
