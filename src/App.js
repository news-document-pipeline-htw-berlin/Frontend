import React, { useState, useEffect } from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { Route, Redirect, Switch } from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Articles from './containers/articles/Articles';
import Layout from './layout/Layout/Layout';
import Analytics from './containers/articles/Analytics';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import PrivateRoute from './components/routes/PrivateRoute';
import UserProfile from './components/user/UserProfile';
import PublicRoute from './components/routes/PublicRoute';
import AuthorSearchContainer from './components/authors/AuthorSearchContainer';
import AuthorLinkContainer from './components/authors/AuthorLinkContainer';
import getTheme from './layout/Theme';
import { getDarkMode } from './components/auth/JWT';

function App() {
    const [darkState, setDarkState] = useState(getDarkMode());
    const [theme, setTheme] = useState(getTheme(darkState));

    useEffect(() => {
        setTheme(createMuiTheme(getTheme(darkState)));
    }, [darkState]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout setDarkState={setDarkState} />
                <Switch>
                    <Route path="/articles">
                        <Articles />
                    </Route>
                    <Route path="/analytics">
                        <Analytics />
                    </Route>
                    <Route path="/authors">
                        <AuthorSearchContainer />
                    </Route>
                    <Route path="/authors&id=:id">
                        <AuthorLinkContainer />
                    </Route>
                    <PublicRoute exact path="/login">
                        <LoginForm setDarkState={setDarkState} />
                    </PublicRoute>
                    <PublicRoute exact path="/signup">
                        <SignupForm setDarkState={setDarkState} />
                    </PublicRoute>
                    <PrivateRoute path="/profile">
                        <UserProfile setDarkState={setDarkState} />
                    </PrivateRoute>
                    <Redirect from="/" to="/articles" />
                </Switch>
            </ThemeProvider>
        </div>
    );
}

export default App;
