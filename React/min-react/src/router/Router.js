import {Route, Switch} from 'react-router-dom';
import React from "react";

function Router(props) {

    let routes = [
         
    ];

    return (
        <Switch>
            {
                routes.map(r => <Route key={r.path[0]} path={r.path} exact={r.exact} component={r.component}/>)
            }
        </Switch>
    );
}

export default Router;
