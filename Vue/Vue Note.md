# Vue Note

## 1. create project
```
npx --package @vue/cli vue create PROJECT_NAME
```
- it means install vue-cli locally, then run vue create
- is able to save setup as preset during installing, preset will save in `%username%/.vuerc` (Windows)

## 2. Vue is reactivity
- it means that vue only can listen value change of property but not remove or add, like: form undefined to 1
- use Vue.set(vm.data, key, value) or vm.$set(data, key, value) to add property and force update

## 3. force update Vue 
Vue.nextTick(callback) or vm.$nextTick(callback)

## 4. scoped css (SFC)
- style only effect to component self, and never changed by other
- alailable for src style, no-scoped can not override scoped style, scoped style effect depend on order
- no-scoped src style never changed by other too 
```html
<style scoped></style>
```
deep selector, change children style by parent
```css
/* add class PARENT_CLASS to children component */
/* parent component */
.PARENT_CLASS >>> .CHILD_CLASS {}
/* or */
.PARENT_CLASS ::v-deep .CHILD_CLASS {}
```

## 5. external css and js (SFC)
css -- available to use scoped
```html
<style src=""></style>
```
js -- import by module
```js
import JS from 'PATH';
```

## 6. props
- one-way pass: parent to children
- array and object are by reference. do not change props in children, usually using data or computed to get props 
```html
<!-- obj = {p1, p2} -->
<child v-bind="obj"/>
<!-- equals to -->
<child v-bind:p1="obj.p1" v-bind:p2="obj.p2"/>
```
limit
```js
props: [
    PROP1: {type, required, default, validator(value)},
    // type: String, Number, Boolean, Array, Object, Date, Function, Symbol, 
    //       CUSTOM_FUNCTION (create by new, one or more（array))
    PROP2,
    // ...
]
```
