import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { Route, Redirect, Switch } from 'react-router-dom';
import Articles from './containers/articles/Articles';
import Layout from './layout/Layout/Layout';
import Analytics from './containers/articles/Analytics';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import PrivateRoute from './components/routes/PrivateRoute';
import UserProfile from './components/user/UserProfile';
import PublicRoute from './components/routes/PublicRoute';

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
                <PublicRoute exact path="/login" component={Login} />
                <PublicRoute exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/profile" component={UserProfile} />
                <Redirect from="/" to="/articles" />
            </Switch>
        </div>
    );
}

export default App;
