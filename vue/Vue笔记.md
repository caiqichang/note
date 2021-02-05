# Vue笔记

## 1. 创建项目
```
npx --package @vue/cli vue create 项目名称
```
解释：<br/>
先安装局部的vue-cli，再执行 vue create 命令。<br/>
安装过程中会提示是否保存为预置配置（默认为否），预置配置将保存在 %username%/.vuerc文件中（Windows系统）。

## 2. Vue是响应式的。
即vue只能监听属性的值的变化，无法监听属性有无的变化，比如由undefined（未定义）变为1。<br/>
可通过 Vue.set(vm.data, key, value) 或 vm.$set(data, key, value) 设置属性。<br/>

## 3. 手动更新Vue
Vue.nextTick(callback) 或 vm.$nextTick(callback)

## 4. scoped css (单文件组件)
样式不受父组件的样式影响。<br/>
src的样式也可以是scoped，非scoped无法覆盖scoped是样式，都是scoped则取决于先后顺序。 <br/>
src的样式即使没有scoped也不受父组件影响。 <br/>
```html
<style scoped></style>
```
父组件影响子组件scoped样式
```css
/* 在子组件标签上增加class PARENT_CLASS */
/* 父组件样式 */
.PARENT_CLASS >>> .CHILD_CLASS {}
/* 或 */
.PARENT_CLASS ::v-deep .CHILD_CLASS {}
```

## 5. 导入外部css和js (单文件组件)
css -- 可以添加scoped属性
```html
<style src=""></style>
```
js -- 以模块的形式导入
```js
import JS from 'PATH';
```

## 6. props
单向传递：父组件 -> 子组件 <br/>
数组、对象为按引用传递，子组件修改props会影响父组件，不应该直接使用props，而是通过data或computed引用。 <br/>
```html
<!-- obj = {p1, p2} -->
<child v-bind="obj"/>
<!-- 等价于 -->
<child v-bind:p1="obj.p1" v-bind:p2="obj.p2"/>
```
验证
```js
props: [
    // 类型、必选、默认值、检验
    PROP1: {type, required, default, validator(value)},
    // type: String, Number, Boolean, Array, Object, Date, Function, Symbol, 
    //       CUSTOM_FUNCTION (create by new), 一个或多个（数组）
    PROP2,
    // ...
]
```
