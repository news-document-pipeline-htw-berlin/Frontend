import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import cookies from 'js-cookies';

import { TOKEN } from '../../constants/CommonConstants';

/**
 * A public route which can only be accessed by users who are NOT logged in.
 * @param {*} props
 */
function PublicRoute(props) {
    const { children } = props;

    return (
        <div>
            {(!cookies.hasItem(TOKEN) && children) || (
                <Redirect to="/profile" />
            )}
        </div>
    );
}

PublicRoute.propTypes = {
    children: PropTypes.node
};

PublicRoute.defaultProps = {
    children: null
};

export default PublicRoute;
