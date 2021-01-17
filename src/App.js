import React, { useState } from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { Route, Redirect, Switch } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';
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

import { DARKMODE } from './constants/CommonConstants';
import theme from './layout/Theme';

function App() {
    /* const prefersDarkMode = false//useState((cookies.hasItem(DARKMODE) && cookies.getItem(DARKMODE) == "true"))
      
        const theme = React.useMemo(
          () =>
            createMuiTheme({
              palette: {
                type: prefersDarkMode ? 'dark' : 'light',
              },
            }),
          [prefersDarkMode],
        ); */
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
                <Switch>
                    <Route path="/articles">
                        <Articles />
                    </Route>
                    <Route path="/analytics">
                        <Analytics />
                    </Route>
                    <Route path="/authors">
                        <AuthorContainer />
                    </Route>
                    <PublicRoute exact path="/login">
                        <Login />
                    </PublicRoute>
                    <PublicRoute exact path="/signup">
                        <Signup />
                    </PublicRoute>
                    <PrivateRoute exact path="/profile">
                        <UserProfile />
                    </PrivateRoute>
                    <Redirect from="/" to="/articles" />
                </Switch>
            </ThemeProvider>
        </div>
    );
}

export default App;
