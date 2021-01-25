import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/**
 * Displays a snackbar alert.
 * @param {*} param0
 */
export default function Feedback({ severity, message, setFeedback }) {
    const [open, setOpen] = useState(true);

    function handleClose() {
        setOpen(false);
        setFeedback(false);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity={severity} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

Feedback.propTypes = {
    severity: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    setFeedback: PropTypes.func.isRequired
};
