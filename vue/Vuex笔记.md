# Vuex笔记

Store是响应式的
```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {}
});
```

1. 获取状态State
```javascript
this.$store.state
```

2. Getter -- 相当于Store的Computed，简化取值操作

3. Mutation -- 同步修改State

Store中定义setter
```javascript
mutations: {
    setter(state, payload) {}
}
```
组件调用
```javascript
this.$store.commit('setter', payload);
```

4. Action -- 异步修改State

Store中定义setter，参数context是与store具有相同的属性和方法不同实例
```javascript
actions: {
    setter(context, payload) {
        // 通常返回Promise
    }
}
```
组件调用
```javascript
this.$store.dispatch('setter', payload);
```

5. Module

命名空间
```
namespaced: true
```

6. 其他

映射方法
```
...mapGetters       映射    getters      位于组件的    completed
...mappMutations    映射    mutations    位于组件的    methods
...mapActions       映射    actions      位于组件的    methods
```
