import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import cookies from 'js-cookies';

import { TOKEN } from '../../constants/CommonConstants';

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
