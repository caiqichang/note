# React Component

## Function Component
```javascript
import {useState, useRef, useEffect} from 'react';

function ${NAME}(props) {
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
        <div></div>
    );
}

${NAME}.defaultProps = {};

export default ${NAME};
```

## Class Component
```javascript
import React from 'react';

class ${NAME} extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState
    }

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
            <div></div>
        );
    }
}

${NAME}.defaultProps = {};

export default ${NAME};
```