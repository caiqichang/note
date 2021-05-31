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
import { atom, useRecoilState } from 'recoil';

const defaultValue = () => {
    return {
        // properties ...
    };
};

const ${NAME} = atom({
    key: '${NAME}',
    default: defaultValue(),
});

export default function () {
    const [state, setState] = useRecoilState(${NAME});

    return {
        state,
        action: {
            action1() {
                let s = { ...state };
                // change state by s ....

                // update state
                setState(s);
            },
            action2(arg) {
                // ...

                return ...;
            }
        },
    };
};
```

- Using in component.
```javascript
import XxxStore from 'XxxStore.js';

const xxxStore = XxxStore();

xxxStore.state.xxx;

xxxStore.action.xxx();
```