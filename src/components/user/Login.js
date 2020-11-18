import React from 'react';
import { useState } from 'react';

import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import cookies from 'js-cookies';

import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { TOKEN } from '../../constants/CommonConstants';

function Login() {
    const [loginRequest, setLoginRequest] = useState({
        user: '',
        password: ''
    });
    const [alert, setAlert] = useState({
        alert: false,
        message: '',
        severity: ''
    });
    const history = useHistory();

    const login = async () => {
        await axios
            .post('http://localhost:3000/api/users/login', loginRequest, {
                withCredentials: true
            })
            .then(response => {
                setAlert({
                    alert: true,
                    message: 'Successfully logged in.',
                    severity: 'success'
                });
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    const msg =
                        error.response.status === 401
                            ? 'Wrong username or password.'
                            : 'Server error. Please try again later.';
                    setAlert({ alert: true, message: msg, severity: 'error' });
                } else if (error.request) {
                    // The request was made but no response was received
                    setAlert({
                        alert: true,
                        message:
                            'Unable to reach server. Please try again later.',
                        severity: 'warning'
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setAlert({
                        alert: true,
                        message: 'Server error. Please try again later.',
                        severity: 'warning'
                    });
                }
            })
            .then(response => {
                if (cookies.getItem(TOKEN)) {
                    history.push('/');
                }
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        login();
    };

    return (
        <div>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="flex-start"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12}>
                    <Card
                        className="card"
                        variant="outlined"
                        style={{ margin: '15px', padding: '5px' }}
                    >
                        <CardContent>
                            <form
                                className="login-form"
                                validate
                                autoComplete="off"
                                onSubmit={onSubmit}
                            >
                                <Grid
                                    container
                                    spacing={3}
                                    direction="column"
                                    alignItems="center"
                                    justify="stretch"
                                >
                                    <Grid item align="left">
                                        <Typography
                                            align="left"
                                            variant="h5"
                                            gutterBottom
                                        >
                                            Login
                                        </Typography>
                                    </Grid>
                                    {alert.alert && (
                                        <Alert severity={alert.severity}>
                                            {alert.message}
                                        </Alert>
                                    )}
                                    <Grid item>
                                        <TextField
                                            label="Username or Email"
                                            variant="outlined"
                                            type="text"
                                            name="user"
                                            required
                                            onChange={e =>
                                                setLoginRequest({
                                                    user: e.target.value,
                                                    password:
                                                        loginRequest.password
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            name="password"
                                            required
                                            onChange={e =>
                                                setLoginRequest({
                                                    user: loginRequest.user,
                                                    password: e.target.value
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Typography
                                        align="left"
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        Don't have an account yet? Sign up{' '}
                                        <Link to="/signup">here</Link>.
                                    </Typography>
                                    <Grid item>
                                        <Button type="submit">Login</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
