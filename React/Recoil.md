# Recoil

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

- Define store.
```javascript
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';

const defaultValue = () => {
    return {
        // properties ...
    };
};

let state = defaultValue();

const ${NAME}Atom = atom({
    key: '${NAME}Atom',
    default: defaultValue(),
});

const ${NAME}Selector = selector({
    key: '${NAME}Selector',
    set: ({set}, value) => set(${NAME}Atom, JSON.parse(JSON.stringify(value))),
});

export default function () {
    const setState = useSetRecoilState(${NAME}Selector);

    const action = {
        action1() {
            let s = { ...state };
            // change state by s ....

            // update state
            setState(s);
        },
        action2(arg) {
            // ...

            return ...;
        };
    };

    return {state: useRecoilValue(${NAME}Atom), action};
};
```

- Using in component.
```javascript
import XxxStore from 'XxxStore.js';

const xxxStore = XxxStore();

xxxStore.state.xxx;

xxxStore.action.xxx();
```