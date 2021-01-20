import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import cookies from 'js-cookies';

import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Checkbox
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { DARKMODE, TOKEN } from '../../constants/CommonConstants';
import LoginService from '../../services/LoginService';

function Login() {
    const [loginRequest, setLoginRequest] = useState({
        user: '',
        password: '',
        rememberMe: false
    });

    const [alert, setAlert] = useState({
        alert: false,
        message: '',
        severity: ''
    });

    const history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        cookies.removeItem(TOKEN);

        LoginService(loginRequest).then(res => {
            setAlert(res);
            if (cookies.getItem(TOKEN)) {
                cookies.setItem(DARKMODE);
                history.push('/');
            }
        });
    };

    return (
        <div>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12}>
                    <Card
                        className="card"
                        variant="outlined"
                        style={{ maxWidth: '20vw', padding: '10px' }}
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
                                    justify="flex"
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
                                                        loginRequest.password,
                                                    rememberMe:
                                                        loginRequest.rememberMe
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
                                                    password: e.target.value,
                                                    rememberMe:
                                                        loginRequest.rememberMe
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justify="flex-start"
                                    >
                                        <Checkbox
                                            checked={loginRequest.keepLoggedIn}
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox'
                                            }}
                                            onChange={e =>
                                                setLoginRequest({
                                                    user: loginRequest.user,
                                                    password:
                                                        loginRequest.password,
                                                    rememberMe: !loginRequest.rememberMe
                                                })
                                            }
                                        />
                                        <Typography
                                            align="left"
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                        >
                                            Keep me logged in
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                    <Typography
                                        align="left"
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        Don&apos;t have an account yet? Sign up{' '}
                                        <Link to="/signup">here</Link>.
                                    </Typography>
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
