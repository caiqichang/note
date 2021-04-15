# Vue Router Note

config:
```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default new VueRouter({
    mode, // default is hash, recommand to history
    base, // public path, recommond to read from vue.config.js
    routers,
});
```

define route: 
```javascript
const routers = [
    {name, path, component}, // param start with :, like /user/:id/order/:num
    {name, path, component}, // /* always for page 404
    {name, path, component: {
        default, view1, view2  
    }, children:[]}, // children is nested route, there path start without left-slash/ and default is ''
    {path,redirect: name_or_path}, // redirect
    {path,redirect: to => name_or_path}, // lazy redirect
    {name, path, component, props: route => {}}, // with props, route is target, the return of props with be props to component, but do not rewrite data (with same name)
    {name, path, component: () => {return import(/* webpackChunkName: "NAME" */ 'COMPONENT_DIRECTORY');}}, // lazy loading
    // ...
    scrollBehavior(to, from, savePosition) { // retore scroll
        return savePosition; // browser default, last position
        return {x, y}; // custom position
        return {selector: to.hash}; // to hash
    },
];

// listen route change in component
watch: {
    $route(to, from) {}
}
```

usage:
```html
<!-- HTML -->
<router-link v-bind:to="{name,params,query}">label</router-link>
<router-link v-bind:to="{path,query}">label</router-link> <!-- params are unavailable when use path -->
<transition> <!-- use animotion on transition when route change  -->
    <router-view name="view-name"></router-view> <!-- if without name, use default -->
</transition>

<!-- JS -->
<script>
vm.$router // call router
vm.$router.push({name,path,params,query}, onComplete, onAbort); // params are unavailable when use path
vm.$router.replace(); // like push(), but will replace history
vm.$router.go(n); // like window.history.go()

vm.$route // get current route
vm.$route.params // path parameter
vm.$route.query // query of url
vm.$route.hash // hash of url
</script>
```

guards:
```javascript
// global
router
.beforeEach((to, from, next) -> { 
    // before
    next(); // param: null -- default; path or route: change route; false: stop route
})
.afterEach((to, from) => {
    // after
});

// in route
routes: [{name, path, component, beforeEnter(to, from, next){}}]

// in component
beforeRouterEnter(to, from, next) {
    // can not access component (this), because it has not initialized
    next(vm => { 
        // access component (this) here 
    });
}
beforeRouteUpdate(to, from, next) {
    // called when route reuse
}
beforeRouteLeave(to, from next) {}
```
