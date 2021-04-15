# React State Management

1. Class and function Component both available.
2. Also work with Vue, and Vue do not need `StoreManage` and `StoreRegister`.

## StoreBuilder.js
- Template to create store instance.
```javascript
/**
 * store builder to create store by state and action
 * 
 * attention:
 * 1. `state` is data object, `action` is only one level, and all properties are function.
 * 2. only change state in `action`.
 * 3. `state` and `action` are available in `action`, use `this.state` and `this.action`.
 * 4. change properties of `state` instead of the whole `state`, never use: `this.state = something` .
 * 
 * usage:
 * 1. store
 * export default StoreBuilder({state, action})();
 * 2. component
 * let store = Store.getInstance();
 * store.state ...
 * store.action ...
 *  
 * @param store include state and action
 * @returns function to create store
 */
function StoreBuilder(store) {
    /**
     * create singleton store
     * @param publish callback after action
     */
    function GenerateStore(publish) {
        this.state = {...{}, ...store.state};
        this.action = {};

        // copy of action
        let actionTemp = {...{}, ...store.action};

        // wrapper action
        Object.keys(store.action).forEach(key => {
            let _this = this;
            this.action[key] = function () {
                // enable to use this.state and this.action
                let result = actionTemp[key].bind({
                    state: _this.state,
                    action: _this.action,
                })(...arguments);
                // publish after actioin
                publish();
                return result;
            }
        });
    }

    return (function () {
        // instance of store using at component
        let instance = {};
        // instance of store
        let store = null;
        // listener of component
        let listeners = [];

        return {
            /**
             * get store instance
             * @param subscribe callback when store update, cloud be null if the component's parent use StoreManage
             */
            getInstance(subscribe) {
                // singleton, only init once
                if (!store) {
                    // create store with publish()
                    store = new GenerateStore(() => {
                        // update instance state
                        instance.state = {...{}, ...store.state};
                        // publish to listeners
                        listeners.forEach(listener => listener());
                    });
                    // copy from store
                    instance = {
                        state: {...{}, ...store.state},
                        action: {...{}, ...store.action},
                    };
                }
                // add listener
                if (typeof subscribe === 'function') listeners.push(subscribe);
                return instance;
            },
            /**
             * remove listener when component unmount, only call if component getInstance with subscribe
             * @param subscribe same as subscribe at getInstance
             */
            unSubscribe(subscribe) {
                listeners = listeners.filter(listener => listener !== subscribe);
            },
        };
    });
}

export default StoreBuilder;
```
- Usage: `AppStore.js`
```javascript
export default StoreBuilder({
    state: {
        // ...
    },
    action: {
        // ...
    }
})();
```
```javascript
const appStore = AppStore.getInstance();
appStore.state. // ...
appStore.action. //...
```

## StoreRegister.js
```javascript
/**
 * store list that use in Store Manage
 */
export default [
    AppStore,
    // ...
];
```

## StoreManage.js
- Function Type
```javascript
/**
 * store manage, general use at root component
 * children must be a function
 */
function StoreManage(props) {

    // update trigger
    let [trigger, setTrigger] = useState(0);
    let triggerRef = useRef(trigger);

    useEffect(() => {
        triggerRef.current = trigger;
        return () => {

        };
    }, [trigger]);

    // callback when store update
    let storeUpdate = () => setTrigger(triggerRef.current + 1);

    useEffect(() => {
        // subscribe to store
        StoreRegister.forEach(store => store.getInstance(storeUpdate));
        return () => {
            // unsubscribe from store
            StoreRegister.forEach(store => store.unSubscribe(storeUpdate));
        };
    }, []);

    return (
        <>{props.children()}</>
    );
}

StoreManage.defaultProps = {};

export default StoreManage;
```
- Class Type
```javascript
/**
 * store manage, general use at root component
 * children must be a function
 */
class StoreManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // update trigger
            trigger: 0
        }
        this.storeUpdate = this.storeUpdate.bind(this);
    }

    // callback when store update
    storeUpdate() {
        this.setState({...this.state, ...{trigger: this.state.trigger + 1}});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
        // subscribe to store
        StoreRegister.forEach(store => store.getInstance(this.storeUpdate));
    }

    componentWillUnmount() {
        // unsubscribe from store
        StoreRegister.forEach(store => store.unSubscribe(this.storeUpdate));
    }

    render() {
        return (
            <>{this.props.children()}</>
        );
    }

}

StoreManage.defaultProps = {};

export default StoreManage;
```
- Usage:
```javascript
<StoreManage>
    {() => <App/>}
</StoreManage>
```
