import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Articles from './containers/articles/Articles';
import Layout from './layout/Layout/Layout';
import Analytics from './containers/articles/Analytics';

function App() {
    return (
        <div>
            <Layout />
            <Switch>
                <Route path="/articles">
                    <Articles />
                </Route>
                <Route path="/analytics">
                    <Analytics />
                </Route>
                <Redirect from="/" to="/articles" />
            </Switch>
        </div>
    );
}

export default App;
