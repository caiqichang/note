# React State Management

- Store.js
```javascript
import React from "react";

// 状态
let state = {
    属性,
    // ...
};
// 操作
let action = {
    操作(参数) {
        // ...

        // 调用发布方法更新状态
        publish(newState);
    },
    // ...
};

// 订阅
let subscribe = [];
// 发布
let publish = (newState) => {
    // 更新状态
    state = {...state, ...newState};
    // 通知订阅
    subscribe.forEach(s => s(state));
};

function Store() {
    // 创建订阅，此处newSubscribe相当于React.useState()[1]
    const [, newSubscribe] = React.useState();
    // 监听状态变化
    React.useEffect(() => {
        // 增加订阅
        subscribe.push(newSubscribe);
        // 组件卸载时执行
        return () => {
            // 移除订阅
            subscribe = subscribe.filter(s => s !== newSubscribe);
        };
    }, [state]);
    return {state, action};
}

export default Store;
```

- 组件中使用
```javascript
import Store from 'Store.js';

function Component(props) {
    // 引用
    const store = Store();
    // 或
    const {state, action} = Store();

    // 状态
    store.state.属性
    // 或
    state.属性

    // 操作
    store.action.操作(参数)
    // 或
    action.操作(参数)

    return (
        <div></div>
    );
}
```

- 通用的 Store.js
```javascript
/**
 * 通用Store，通过bind()将组件绑定到this
 *
 * 限制：action不能有嵌套在对象中的方法；action不能定义state()和publish()方法
 *
 * @param react React Hooks只能在组件中使用，需要将React传递进来
 */
function Store(react) {
    // 以便在action方法中可用通过this访问state和publish
    this.action.state = () => {
        return {...state};
    };
    this.action.publish = (newState) => {
        // 更新状态
        state = {...state, ...newState};
        // 通知订阅
        subscribe.forEach(s => s(state));
    };

    // 状态
    let state = this.state;
    // 操作
    let action = this.action;

    // 订阅
    let subscribe = [];

    return () => {
        // 创建订阅，此处newSubscribe相当于React.useState()[1]
        const [, newSubscribe] = react.useState();
        // 监听状态变化
        react.useEffect(() => {
            // 增加订阅
            subscribe.push(newSubscribe);
            // 组件卸载时执行
            return () => {
                // 移除订阅
                subscribe = subscribe.filter(s => s !== newSubscribe);
            };
        }, [state]);
        return {state, action};
    };
}

export default Store;
```

使用方法
```javascript
import React from "react";
import Store from "./Store.js";

export default Store.bind({
    state: {
        属性
        // ...
    },
    action: {
        操作(参数) {
            // ...
            // 使用state
            this.state().属性
            // 更新状态
            this.publish(新状态);
        },
    },
}, React)();
```