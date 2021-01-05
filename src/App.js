import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { Route, Redirect, Switch } from 'react-router-dom';
import Articles from './containers/articles/Articles';
import Layout from './layout/Layout/Layout';
import Analytics from './containers/articles/Analytics';
import Authors from './components/authors/Authors';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import PrivateRoute from './components/routes/PrivateRoute';
import UserProfile from './components/user/UserProfile';
import PublicRoute from './components/routes/PublicRoute';
import AuthorContainer from './components/authors/AuthorContainer';

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
                <Route path="/authors">{AuthorContainer}</Route>
                <Route path="/authors/:id">{Authors}</Route>
                <PublicRoute exact path="/login">
                    {Login}
                </PublicRoute>
                <PublicRoute exact path="/signup">
                    {Signup}
                </PublicRoute>
                <PrivateRoute exact path="/profile">
                    {UserProfile}
                </PrivateRoute>
                <Redirect from="/" to="/articles" />
            </Switch>
        </div>
    );
}

export default App;
