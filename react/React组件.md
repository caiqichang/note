# React Component

## Function Component
```javascript
import React from 'react';

/**
 * 函数组件
 * @param props 父组件传递过来的属性 
 * @return 单一元素模板
 */
function FunctionComponent(props) {

    // variableName 局部变量名
    // setter 该变量的setter方法
    // initValue 该变量的初始值
    const [variableName, setter] = React.useState(initValue);

    // 局部方法
    function localMethdod() {
        // ...
    }

    // 获取局部变量引用快照
    const variableRef = React.useRef(variableName);
    // 监听局部变量值变化
    React.useEffect(() => {
        // 当前值不等于原值
        if (variableName !== variableRef.current) {
            // 每次变更后需要手动修改原值为当前值
            variableRef.current = variableName;

            // ...
        }
    }, [variableName]);  // 需要监听的变量

    return (
        <div>
            {/* 注释... */}
        </div>
    );
}

// props默认值
FunctionComponent.defaultProps = {
    属性: 值,
};

export default FunctionComponent
```

## Class Component
```javascript
import React from 'react';

// 类组件
class ClassComponent extends React.Component {
    // 父组件传递过来的属性
    constructor(props) {
        super(props);

        this.state = {
            // 局部变量
        }
    };

    // 局部方法
    localMethdod = （）=> {
        // ...

        // 更改局部变量
        this.setState({
            ...this.state,
            newValue,
        });
    };

    // 监听局部变量值变化
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 当前值不等于原值
        if (this.state[variableName] !== prevState[variableName]) {
            // ...
        }
    }

    render() {
        // 单一元素模板
        return (
            <div>
                {/* 注释... */}
            </div>
        )；
    };
}
```