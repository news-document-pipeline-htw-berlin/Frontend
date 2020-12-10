/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import EditProfile from './EditProfile';
import Preferences from './Preferences';
import Password from './Password';
import Data from './Data';
import useUserData from '../../hooks/useUserData';
import { TOKEN } from '../../constants/CommonConstants';

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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        width: '60vw'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}));

export default function UserProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = useUserData(jwt(cookies.getItem(TOKEN)).id);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                justify="flex-start"
                style={{
                    marginRight: '15vw',
                    marginLeft: '15vw',
                    marginTop: '2vw',
                    minWidth: '70vw'
                }}
            >
                <Paper variant="outlined">
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Edit Profile" {...a11yProps(0)} />
                        <Tab label="Preferences" {...a11yProps(1)} />
                        <Tab label="Password" {...a11yProps(2)} />
                        <Tab label="Data" {...a11yProps(3)} />
                    </Tabs>
                </Paper>
                <Paper
                    variant="outlined"
                    style={{ width: '50vw', height: '35vw' }}
                >
                    <TabPanel value={value} index={0}>
                        <EditProfile
                            userData={userData}
                            setUserData={setUserData}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Preferences
                            userData={userData}
                            setUserData={setUserData}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Password
                            userData={userData}
                            setUserData={setUserData}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Data userData={userData} setUserData={setUserData} />
                    </TabPanel>
                </Paper>
            </Grid>
        </div>
    );
}
