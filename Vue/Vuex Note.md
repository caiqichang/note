# Vuex

store is also reactivity, usage:
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

1. get state
```javascript
this.$store.state
```

2. Getter -- `Computed` of Store

3. Mutation -- Update State Synchronized

define setter in Mutation
```javascript
mutations: {
    setter(state, payload) {}
}
```
call setter
```javascript
this.$store.commit('setter', payload);
```

4. Action -- Update State Asynchronized

define setter in Action, `context` is a different instance but with same properties of store 
```javascript
actions: {
    setter(context, payload) {
        // always return Promise
    }
}
```
call setter
```javascript
this.$store.dispatch('setter', payload);
```

5. Module

always using namespace
```
namespaced: true
```

6. other

mapping function 
```
...mapGetters     --  getters    at  completed
...mappMutations  --  mutations  at  methods
...mapActions     --  actions    at  methods
```
