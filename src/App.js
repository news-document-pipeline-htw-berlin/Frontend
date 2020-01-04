import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
                    <Articles />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
