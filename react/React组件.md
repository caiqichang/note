# React Component

## Function Component
```javascript
import {useState, useRef, useEffect} from 'react';

function FunctionComponent(props) {
    const [state, setState] = useState(initState);
    const stateRef = useRef(state);

    useEffect(() => {
        if (state !== stateRef.current) {
            stateRef.current = state;
            // update
        }
        return () => {

        };
    }, [state]);

    useEffect(() => {
        // mounted
        return () => {
            // unmount
        };
    }, []);

    return (
        <div className={'FunctionComponent'}></div>
    );
}

FunctionComponent.defaultProps = {};

export default FunctionComponent;
```

## Class Component
```javascript
import React from 'react';

class ClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state !== prevState) {
            // update
        }
    }

    componentDidMount() {
        // mounted
    }

    componentWillUnmount() {
        // unmount
    }

    render() {
        return (
            <div className={'ClassComponent'}></div>
        );
    };
}

ClassComponent.defaultProps = {};

export default ClassComponent;
```