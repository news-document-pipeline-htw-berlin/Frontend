/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import WordCount from './WordCount';
import Departments from './Departments';
import Days from './Days';
import { useAuthor } from '../../hooks/useAuthors';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
    children: PropTypes.node,
    index: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired
};

TabPanel.defaultProps = {
    children: null
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500
    }
}));

export default function Authors({ author }) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            {JSON.stringify(author) !== '{}' && (
                <Grid
                    container
                    justify="center"
                    direction="row"
                    spacing={24}
                    style={{ width: '100vw', margin: '10px' }}
                >
                    <Grid item xs={3}>
                        <AuthorInfo author={author} />
                    </Grid>
                    <Grid item xs={6}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Departments" {...a11yProps(0)} />
                                <Tab label="Wordcount" {...a11yProps(1)} />
                                <Tab label="Days" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel
                                value={value}
                                index={0}
                                dir={theme.direction}
                            >
                                <Departments author={author} />
                            </TabPanel>
                            <TabPanel
                                value={value}
                                index={1}
                                dir={theme.direction}
                            >
                                <WordCount author={author} />
                            </TabPanel>
                            <TabPanel
                                value={value}
                                index={2}
                                dir={theme.direction}
                            >
                                <Days author={author} />
                            </TabPanel>
                        </SwipeableViews>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

Authors.propTypes = {
    author: PropTypes.object.isRequired
};
