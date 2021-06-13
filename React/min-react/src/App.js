import Router from "./router/Router.js";
import {BrowserRouter} from "react-router-dom";
import React from "react";

function App() {
    return (
        <div className={'App'}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Router/>
            </BrowserRouter>
        </div>
    );
}

export default App;
