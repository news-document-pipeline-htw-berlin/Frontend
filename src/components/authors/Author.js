/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import {
    Container,
    Grid,
    Box,
    useTheme,
    AppBar,
    Tab,
    Tabs,
    Typography,
    Paper
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import AuthorInfo from './AuthorInfo';
import WordCount from './WordCount';
import Departments from './Departments';
import Days from './Days';
import { useAuthor } from '../../hooks/useAuthors';
import { wording } from '../common/common';

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

/**
 * Contains author information and stats represented in different tabs.
 * Children nodes may be added on top of the tab panel.
 * @param {*} props author id and children
 */
export default function Author(props) {
    const { id, children } = props;
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [author, setAuthor] = useAuthor(id);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <Container>
            <div style={{ padding: '15px' }}>{children}</div>
            <Grid
                container
                direction="column"
                justify="center"
                style={{ minHeight: '80vh' }}
            >
                {(author !== null && JSON.stringify(author) !== '{}' && (
                    <Grid container justify="space-around" direction="row">
                        <Grid item xl={4} lg={4}>
                            <AuthorInfo author={author} />
                        </Grid>
                        <Grid
                            item
                            xl={8}
                            lg={8}
                            sm={8}
                            xs={12}
                            style={{ paddingLeft: '15px', minHeight: '80vh' }}
                        >
                            <Paper>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab
                                            label={wording.author.departments}
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            label={wording.author.wordCount}
                                            {...a11yProps(1)}
                                        />
                                        <Tab
                                            label={wording.author.days}
                                            {...a11yProps(2)}
                                        />
                                    </Tabs>
                                </AppBar>
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    direction="row"
                                    style={{ marginTop: '10px' }}
                                >
                                    <SwipeableViews
                                        axis={
                                            theme.direction === 'rtl'
                                                ? 'x-reverse'
                                                : 'x'
                                        }
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
                            </Paper>
                        </Grid>
                    </Grid>
                )) ||
                    (id !== '' && (
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            direction="row"
                        >
                            <Alert severity="info">
                                {wording.author.noResult} {id}.
                            </Alert>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}

Author.propTypes = {
    id: PropTypes.object.isRequired,
    children: PropTypes.node
};

Author.defaultProps = {
    children: null
};
