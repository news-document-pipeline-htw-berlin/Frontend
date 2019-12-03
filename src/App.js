import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Blog from './containers/Blog/Blog';
import Theme from './layout/Theme';
import Layout from './layout/Layout/Layout';

function App() {
    return (
        <div>
            <ThemeProvider theme={Theme}>
                <Layout />
                <Blog />
            </ThemeProvider>
        </div>
    );
}

export default App;
