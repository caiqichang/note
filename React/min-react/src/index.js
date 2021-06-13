import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {RecoilRoot} from 'recoil';

ReactDOM.render(
    <React.Fragment>
        <RecoilRoot>
            <App/>
        </RecoilRoot>
    </React.Fragment>
    , document.getElementById('app')
);
