import React, { useState, useCallback } from 'react';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';

import {
    Typography,
    Card,
    CardContent,
    IconButton,
    Button,
    Checkbox
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { TOKEN } from '../../constants/CommonConstants';
import useUserData from '../../hooks/useUserData';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteData from './DeleteData';
import DeleteAccount from './DeleteAccount';

function UserProfile() {
    const [userData, setUserData] = useUserData(jwt(cookies.getItem(TOKEN)).id);
    const [openDialog, setOpenDialog] = useState({
        email: false,
        password: false,
        data: false,
        account: false
    });

    const wrapperOpenDialog = useCallback(
        val => {
            setOpenDialog(val);
        },
        [setOpenDialog]
    );

    const wrapperUserData = useCallback(
        val => {
            setUserData(val);
        },
        [setUserData]
    );

    return (
        <div>
            <Grid
                container
                spacing={3}
                direction="row"
                alignItems="left"
                justify="center"
            >
                <Card style={{ minWidth: '50vw', padding: '10px' }}>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            direction="column"
                            alignItems="left"
                            justify="flex-start"
                        >
                            <Grid item align="left">
                                <Typography
                                    align="left"
                                    variant="h4"
                                    gutterBottom
                                >
                                    {userData.username}&apos;s Account
                                </Typography>
                                <Divider light />
                            </Grid>

                            <Grid item>
                                <Typography variant="h5" gutterBottom>
                                    Preferences
                                </Typography>
                                <Typography gutterBottom>
                                    Suggested Articles
                                </Typography>
                                {(userData.suggestions ||
                                    userData.suggestions === false) && (
                                    <Switch
                                        checked={userData.suggestions}
                                        name="suggestions"
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox'
                                        }}
                                        onClick={e =>
                                            setUserData({
                                                ...userData,
                                                suggestions: !userData.suggestions
                                            })
                                        }
                                    />
                                )}
                                <Typography variant="caption">
                                    New articles will{' '}
                                    {!userData.suggestions && 'not '}be
                                    suggested to you.
                                </Typography>
                                <Typography gutterBottom>Dark Mode</Typography>
                                {(userData.darkMode ||
                                    userData.darkMode === false) && (
                                    <Switch
                                        checked={userData.darkMode}
                                        name="darkMode"
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox'
                                        }}
                                        onClick={e =>
                                            setUserData({
                                                ...userData,
                                                darkMode: !userData.darkMode
                                            })
                                        }
                                    />
                                )}
                                <Typography variant="caption">
                                    Dark Mode is {!userData.darkMode && 'dis'}
                                    {userData.darkMode && 'en'}abled.
                                </Typography>
                            </Grid>
                            <Divider light />
                            <Grid item align="left">
                                <Typography
                                    align="left"
                                    variant="h5"
                                    gutterBottom
                                >
                                    Personal Data
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                >
                                    <Typography align="left" gutterBottom>
                                        <b>Email Address:</b> {userData.email}
                                    </Typography>
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            marginLeft: '7px'
                                        }}
                                        onClick={() =>
                                            setOpenDialog({
                                                ...openDialog,
                                                email: true
                                            })
                                        }
                                    >
                                        <EditOutlinedIcon
                                            style={{
                                                width: '20px',
                                                height: '20px'
                                            }}
                                        />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography align="left" gutterBottom>
                                        <b>Password:</b>{' '}
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                                setOpenDialog({
                                                    ...openDialog,
                                                    password: true
                                                })
                                            }
                                        >
                                            Change
                                        </Button>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left" gutterBottom>
                                        <b>My Data:</b>{' '}
                                        <Button
                                            size="small"
                                            color="secondary"
                                            onClick={() =>
                                                setOpenDialog({
                                                    ...openDialog,
                                                    data: true
                                                })
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() =>
                                            setOpenDialog({
                                                ...openDialog,
                                                account: true
                                            })
                                        }
                                    >
                                        Delete my Account
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {openDialog.email && (
                <ChangeEmail
                    userData={userData}
                    setUserData={setUserData}
                    open={openDialog}
                    setOpen={wrapperOpenDialog}
                />
            )}
            {openDialog.password && (
                <ChangePassword
                    userData={userData}
                    setUserData={setUserData}
                    open={openDialog}
                    setOpen={wrapperOpenDialog}
                />
            )}
            {openDialog.data && (
                <DeleteData open={openDialog} setOpen={wrapperOpenDialog} />
            )}
            {openDialog.account && (
                <DeleteAccount open={openDialog} setOpen={wrapperOpenDialog} />
            )}
        </div>
    );
}

export default UserProfile;
