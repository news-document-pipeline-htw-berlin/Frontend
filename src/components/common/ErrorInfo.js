import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { wording } from './common';

const ErrorInfo = ({ message, onActionClick }) => {
    const style = {
        container: {
            flexGrow: 1,
            padding: 10,
            textAlign: 'center'
        }
    };
    return (
        <div style={style.container}>
            <p>{message}</p>
            {onActionClick && (
                <Button onClick={onActionClick}>{wording.reload}</Button>
            )}
        </div>
    );
};

ErrorInfo.propTypes = {
    message: PropTypes.string.isRequired,
    onActionClick: PropTypes.func
};

ErrorInfo.defaultProps = {
    onActionClick: null
};

export default ErrorInfo;
