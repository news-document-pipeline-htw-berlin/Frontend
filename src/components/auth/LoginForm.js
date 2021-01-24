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

import { login } from './Auth';

/**
 * Displays a login form.
 * @param {*} param0 setDarkState
 */
export default function LoginForm({ setDarkState }) {
    const history = useHistory();
    const [loginRequest, setLoginRequest] = useState({
        user: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState({
        user: false,
        password: false
    });
    const submit = e => {
        e.preventDefault();
        login({ loginRequest, setDarkState, error, setError, history });
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
                        Login
                    </Typography>
                </DialogTitle>
                <form noValidate={false} autoComplete={false} onSubmit={submit}>
                    <DialogContent>
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            style={{ minHeight: '25vh' }}
                        >
                            <TextField
                                label="Username"
                                act={error.user}
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
                                            Username does not exist.
                                        </Typography>
                                    ) : (
                                        ''
                                    )
                                }
                                onChange={e =>
                                    setLoginRequest({
                                        ...loginRequest,
                                        user: e.target.value
                                    })
                                }
                            />
                            <TextField
                                color={error.password ? 'secondary' : 'primary'}
                                label="Password"
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
                                            Invalid Password.
                                        </Typography>
                                    ) : (
                                        ''
                                    )
                                }
                                onChange={e =>
                                    setLoginRequest({
                                        ...loginRequest,
                                        password: e.target.value
                                    })
                                }
                            />
                            <Grid container alignItems="center">
                                <Checkbox
                                    fullWidth
                                    checked={loginRequest.rememberMe}
                                    color="primary"
                                    onChange={e =>
                                        setLoginRequest({
                                            ...loginRequest,
                                            rememberMe: !loginRequest.rememberMe
                                        })
                                    }
                                />
                                <Typography
                                    align="left"
                                    variant="caption"
                                    display="block"
                                >
                                    Keep me logged in
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
                                Login
                            </Button>
                            <Typography
                                align="left"
                                variant="caption"
                                style={{ paddingTop: 10 }}
                            >
                                Don&apos;t have an account yet? Sign up{' '}
                                <Link to="/signup">here</Link>.
                            </Typography>
                        </Grid>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

LoginForm.propTypes = {
    setDarkState: PropTypes.func.isRequired
};
