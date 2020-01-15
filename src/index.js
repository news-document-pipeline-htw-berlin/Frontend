import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './state/store';

import Theme from './layout/Theme';
import ScrollToTop from './components/common/ScrollToTop';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    rootElement
);
