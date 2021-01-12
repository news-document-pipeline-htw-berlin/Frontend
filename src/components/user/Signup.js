import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import cookies from 'js-cookies';

import { TextField, Typography, Checkbox } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { TOKEN } from '../../constants/CommonConstants';
import SignUpService from '../../services/SignUpService';
import LoginService from '../../services/LoginService';

function Signup() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        password_rep: '',
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
        SignUpService(userData).then(result => {
            setAlert(result);
            if (result.severity === 'success')
                LoginService({
                    user: userData.username,
                    password: userData.password,
                    rememberMe: userData.rememberMe
                }).then(res => {
                    setAlert(res);
                    if (cookies.getItem(TOKEN)) {
                        history.push('/');
                    }
                });
        });
    };

    return (
        <div>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="flex-start"
            >
                <Grid item xs={12}>
                    <Card
                        className="card"
                        variant="outlined"
                        style={{ maxWidth: '20vw', padding: '10px' }}
                    >
                        <CardContent>
                            <form
                                className="signup-form"
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
                                            Create an Account
                                        </Typography>
                                    </Grid>
                                    {alert.alert && (
                                        <Alert severity={alert.severity}>
                                            {alert.message}
                                        </Alert>
                                    )}
                                    <Grid item>
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            type="text"
                                            name="username"
                                            required
                                            onChange={e =>
                                                setUserData({
                                                    username: e.target.value,
                                                    email: userData.email,
                                                    password: userData.password,
                                                    password_rep:
                                                        userData.password_rep,
                                                    rememberMe:
                                                        userData.rememberMe
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            type="text"
                                            name="email"
                                            required
                                            onChange={e =>
                                                setUserData({
                                                    username: userData.username,
                                                    email: e.target.value,
                                                    password: userData.password,
                                                    password_rep:
                                                        userData.password_rep,
                                                    rememberMe:
                                                        userData.rememberMe
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
                                                setUserData({
                                                    username: userData.username,
                                                    email: userData.email,
                                                    password: e.target.value,
                                                    password_rep:
                                                        userData.password_rep,
                                                    rememberMe:
                                                        userData.rememberMe
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="outlined-basic"
                                            label="Repeat password"
                                            variant="outlined"
                                            type="password"
                                            name="password_rep"
                                            required
                                            onChange={e =>
                                                setUserData({
                                                    username: userData.username,
                                                    email: userData.email,
                                                    password: userData.password,
                                                    password_rep:
                                                        e.target.value,
                                                    rememberMe:
                                                        userData.rememberMe
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
                                            checked={userData.keepLoggedIn}
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox'
                                            }}
                                            onChange={e =>
                                                setUserData({
                                                    username: userData.username,
                                                    email: userData.email,
                                                    password: userData.password,
                                                    password_rep:
                                                        userData.password_rep,
                                                    rememberMe: !userData.rememberMe
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
                                            Sign Up
                                        </Button>
                                    </Grid>
                                    <Typography
                                        align="left"
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        Already have an Account?{' '}
                                        <Link to="/login">Login</Link>
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

export default Signup;
