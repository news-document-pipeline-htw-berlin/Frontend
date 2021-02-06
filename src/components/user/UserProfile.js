/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Container,
    Tabs,
    Tab,
    Box,
    Paper,
    Typography
} from '@material-ui/core';

import EditProfile from './EditProfile';
import Preferences from './Preferences';
import Password from './Password';
import Data from './Data';
import useUserData from '../../hooks/useUserData';
import { TOKEN } from '../../constants/CommonConstants';
import { wording } from '../common/common';

/**
 * Styles for responsiveness
 */
const useStyles = makeStyles(theme => ({
    vertical: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    horizontal: {
        [theme.breakpoints.up('xl')]: {
            display: 'none'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    content: {
        [theme.breakpoints.down('md')]: {
            minHeight: '92vw',
            minWidth: '92vw'
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '92vw',
            minWidth: '92vw'
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '92vw',
            minWidth: '92vw'
        },
        [theme.breakpoints.up('xl')]: {
            minWidth: '55vw',
            minHeight: '55vh'
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: '55vw',
            minHeight: '55vh'
        }
    },
    container: {
        [theme.breakpoints.up('xl')]: {
            minHeight: '60vh'
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: '60vh'
        }
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

/**
 * Displays a tabpanel with user information and functionalities to update user data.
 * @param {*} param0
 */
export default function UserProfile({ setDarkState }) {
    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = useUserData(jwt(cookies.getItem(TOKEN)).id);
    const classes = useStyles();
    const [feedback, setFeedback] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            {(userData && (
                <Container>
                    <Grid
                        container
                        direction="column"
                        justify="space-around"
                        className={classes.container}
                    >
                        <Grid container>
                            <Paper
                                variant="outlined"
                                className={classes.vertical}
                            >
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <Tab
                                        label={wording.user.edit}
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label={wording.user.preferences}
                                        {...a11yProps(1)}
                                    />
                                    <Tab
                                        label={wording.auth.password}
                                        {...a11yProps(2)}
                                    />
                                    <Tab
                                        label={wording.user.data}
                                        {...a11yProps(3)}
                                    />
                                </Tabs>
                            </Paper>
                            <div
                                variant="outlined"
                                className={classes.horizontal}
                            >
                                <Tabs
                                    orientation="horizontal"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <Tab
                                        label="Edit Profile"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label="Preferences"
                                        {...a11yProps(1)}
                                    />
                                    <Tab label="Password" {...a11yProps(2)} />
                                    <Tab label="Data" {...a11yProps(3)} />
                                </Tabs>
                            </div>
                            <Paper
                                variant="outlined"
                                className={classes.content}
                            >
                                <TabPanel value={value} index={0}>
                                    <EditProfile
                                        userData={userData}
                                        setUserData={setUserData}
                                        setFeedback={setFeedback}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Preferences
                                        userData={userData}
                                        setUserData={setUserData}
                                        setDarkState={setDarkState}
                                        setFeedback={setFeedback}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Password
                                        userData={userData}
                                        setUserData={setUserData}
                                        setFeedback={setFeedback}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <Data
                                        userData={userData}
                                        setUserData={setUserData}
                                        setFeedback={setFeedback}
                                    />
                                </TabPanel>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            )) || (
                <Grid
                    container
                    direction="column"
                    minHeight="70vh"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography>{wording.error}</Typography>
                    </Grid>
                </Grid>
            )}
            {feedback}
        </div>
    );
}

UserProfile.propTypes = {
    setDarkState: PropTypes.func.isRequired
};
