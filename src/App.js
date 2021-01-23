import React, { useState, useEffect } from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { Route, Redirect, Switch } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Articles from './containers/articles/Articles';
import Layout from './layout/Layout/Layout';
import Analytics from './containers/articles/Analytics';
import Author from './components/authors/Author';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import PrivateRoute from './components/routes/PrivateRoute';
import UserProfile from './components/user/UserProfile';
import PublicRoute from './components/routes/PublicRoute';
import AuthorSearchContainer from './components/authors/AuthorSearchContainer';

import AuthorLinkContainer from './components/authors/AuthorLinkContainer';
import getTheme from './layout/Theme';
import { TOKEN } from './constants/CommonConstants';
import { getDarkMode } from './services/JWT';

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
                        <Login setDarkState={setDarkState} />
                    </PublicRoute>
                    <PublicRoute exact path="/signup">
                        <Signup />
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
