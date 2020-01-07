import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Articles from './containers/articles/Articles';
import Theme from './layout/Theme';
import Layout from './layout/Layout/Layout';

function App() {
    return (
        <div>
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Layout />
                    <Switch>
                        <Route path="/articles">
                            <Articles />
                        </Route>
                        <Redirect from="/" to="/articles" />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
