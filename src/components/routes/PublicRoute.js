import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookies from 'js-cookies';

import { TOKEN } from '../../constants/CommonConstants';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            cookies.getItem(TOKEN) == null ? (
                <Component {...props} />
            ) : (
                <Redirect to="/profile" />
            )
        }
    />
);

export default PublicRoute;
