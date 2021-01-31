import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link, useHistory } from 'react-router-dom';

import {
    Grid,
    Typography,
    TextField,
    Button,
    Checkbox,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle
} from '@material-ui/core';

import { signup } from './Auth';
import { wording } from '../common/common';

/**
 * Displays a signup form.
 * @param {*} param0
 */
export default function SignupForm({ setDarkState }) {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        password_rep: '',
        rememberMe: false
    });
    const [error, setError] = useState({
        user: false,
        email: false,
        password: false,
        passwordRep: false
    });
    const [feedback, setFeedback] = useState(false);
    const history = useHistory();

    const submit = e => {
        e.preventDefault();
        signup({
            userData,
            setDarkState,
            error,
            setError,
            history,
            setFeedback
        });
    };

    return (
        <div>
            <Dialog
                style={{
                    position: 'fixed',
                    zIndex: '7 !important',
                    right: '0px',
                    bottom: '0px',
                    top: '0px',
                    left: '0px'
                }}
                open
                disableBackdropClick
                hideBackdrop
            >
                <DialogTitle>
                    <Typography variant="h5" align="center">
                        {wording.auth.signup}
                    </Typography>
                </DialogTitle>
                <form noValidate={false} autoComplete={false} onSubmit={submit}>
                    <DialogContent>
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            style={{ minHeight: '35vh' }}
                        >
                            <TextField
                                label={wording.auth.username}
                                color={error.user ? 'secondary' : 'primary'}
                                fullWidth
                                variant="outlined"
                                type="text"
                                required
                                helperText={
                                    error.user ? (
                                        <Typography
                                            variant="caption"
                                            align="left"
                                            color="secondary"
                                        >
                                            {wording.auth.error.usernameTaken}
                                        </Typography>
                                    ) : (
                                        ''
                                    )
                                }
                                onChange={e =>
                                    setUserData({
                                        ...userData,
                                        username: e.target.value
                                    })
                                }
                            />
                            <TextField
                                label={wording.auth.email}
                                color={error.email ? 'secondary' : 'primary'}
                                fullWidth
                                variant="outlined"
                                type="email"
                                required
                                helperText={
                                    error.email ? (
                                        <Typography
                                            variant="caption"
                                            align="left"
                                            color="secondary"
                                        >
                                            {wording.auth.error.emailTaken}
                                        </Typography>
                                    ) : (
                                        ''
                                    )
                                }
                                onChange={e =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value
                                    })
                                }
                            />
                            <TextField
                                color={error.password ? 'secondary' : 'primary'}
                                label={wording.auth.password}
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                helperText={
                                    error.password ? (
                                        <Typography
                                            variant="caption"
                                            align="left"
                                            color="secondary"
                                        >
                                            {wording.auth.error.passwordInvalid}
                                        </Typography>
                                    ) : (
                                        ''
                                    )
                                }
                                onChange={e =>
                                    setUserData({
                                        ...userData,
                                        password: e.target.value
                                    })
                                }
                            />
                            <TextField
                                color={
                                    error.passwordRep ? 'secondary' : 'primary'
                                }
                                label={wording.auth.passwordRep}
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                helperText={
                                    error.passwordRep ? (
                                        <Typography
                                            variant="caption"
                                            align="left"
                                            color="secondary"
                                        >
                                            {
                                                wording.auth.error
                                                    .passwordMismatch
                                            }
                                        </Typography>
                                    ) : (
                                        ''
                                    )
                                }
                                onChange={e =>
                                    setUserData({
                                        ...userData,
                                        password_rep: e.target.value
                                    })
                                }
                            />
                            <Grid container alignItems="center">
                                <Checkbox
                                    fullWidth
                                    checked={userData.rememberMe}
                                    color="primary"
                                    onChange={e =>
                                        setUserData({
                                            ...userData,
                                            rememberMe: !userData.rememberMe
                                        })
                                    }
                                />
                                <Typography
                                    align="left"
                                    variant="caption"
                                    display="block"
                                >
                                    {wording.auth.keepLoggedIn}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ padding: 20, paddingTop: 0 }}>
                        <Grid container="column">
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {wording.auth.signup}
                            </Button>
                            <Typography
                                align="left"
                                variant="caption"
                                style={{ paddingTop: 10 }}
                            >
                                {wording.auth.hasAccount}{' '}
                                <Link to="/login">
                                    {wording.auth.hasAccountLink}
                                </Link>
                            </Typography>
                        </Grid>
                    </DialogActions>
                </form>
            </Dialog>
            {feedback}
        </div>
    );
}

SignupForm.propTypes = {
    setDarkState: PropTypes.func.isRequired
};
