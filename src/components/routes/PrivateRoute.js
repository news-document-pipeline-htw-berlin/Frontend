import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import cookies from 'js-cookies';

import { TOKEN } from '../../constants/CommonConstants';

/**
 * A route which can only be accessed by users who ARE logged in.
 * @param {*} props
 */
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
