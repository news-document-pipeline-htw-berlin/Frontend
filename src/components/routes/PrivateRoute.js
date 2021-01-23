import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import cookies from 'js-cookies';

import { TOKEN } from '../../constants/CommonConstants';

function PrivateRoute(props) {
    const { children } = props;

    return (
        <div>
            {(cookies.hasItem(TOKEN) && children) || <Redirect to="/login" />}
        </div>
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node
};

PrivateRoute.defaultProps = {
    children: null
};

export default PrivateRoute;
