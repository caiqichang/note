# Recoil Store

## Installation
```
npm install recoil
```

## Usage
- `RecoilRoot` in `index.js` 
```javascript
import {RecoilRoot} from 'recoil';

ReactDOM.render(
    <React.Fragment>
        <RecoilRoot>
            <App/>
        </RecoilRoot>
    </React.Fragment>
    , document.getElementById('app')
);
```

- Store Builder
```javascript
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';

export default function (key, state, action) {
    const keyAtom = atom({
        key: `${key}Atom`,
        default: JSON.parse(JSON.stringify(state)),
    });

    const keySelector = selector({
        key: `${key}Selector`,
        set: ({set}, value) => set(keyAtom, JSON.parse(JSON.stringify(value))),
    });

    return function () {
        const setState = useSetRecoilState(keySelector);

        let actionWrapper = {};
        Object.keys(action).forEach(k => {
            actionWrapper[k] = function () {
                let result = action[k].apply(null, [].slice.call(arguments));
                setState(state);
                return result;
            };
        });

        return {state: useRecoilValue(keyAtom), action: actionWrapper};
    };
};
```

- Define a store use Store Builder.
```javascript
const defaultValue = () => {
    return {
        // properties ...
    };
};

const state = defaultValue();

const action = {
    // action ... 
    // able to use state and action
};

export default StoreBuilder('UniqueKey', state, action);
```

- Use store in component.
```javascript
const xxxStore = XxxxStore();

xxxStore.state....

xxxStore.action....()
```