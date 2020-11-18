import React from 'react';
import { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import cookies from 'js-cookies';

import { TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { TOKEN } from '../../constants/CommonConstants';

function Signup() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        password_rep: ''
    });
    const [alert, setAlert] = useState({
        alert: false,
        message: '',
        severity: ''
    });
    const history = useHistory();

    const signup = async () => {
        await axios
            .post('http://localhost:3000/api/users/signup', userData, {
                withCredentials: true
            })
            .then(response => {
                setAlert({
                    alert: true,
                    message: 'Successfully created account.',
                    severity: 'success'
                });
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    const msg =
                        error.response.status === 400
                            ? 'Please repeat password.'
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
        signup();
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
                                                        userData.password_rep
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
                                                        userData.password_rep
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
                                                        userData.password_rep
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
                                                    password_rep: e.target.value
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
                                        Already have an Account?{' '}
                                        <Link to="/signup">Login</Link>
                                    </Typography>
                                    <Grid item>
                                        <Button type="submit">Sign up</Button>
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

export default Signup;
