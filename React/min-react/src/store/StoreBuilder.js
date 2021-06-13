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
