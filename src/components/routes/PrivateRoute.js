import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookies from 'js-cookies';

import { TOKEN } from '../../constants/CommonConstants';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            cookies.getItem(TOKEN) != null ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export default PrivateRoute;
