import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';

import Theme from './layout/Theme';
import ScrollToTop from './components/common/ScrollToTop';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>,
    /* <ThemeProvider theme={Theme}>
        <CssBaseline />
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </ThemeProvider> */ rootElement
);
