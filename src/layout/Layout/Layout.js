import React from 'react';
import { AppBar, Toolbar, Divider, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { stringify } from 'query-string';
import './Layout.css';
import { useDepartment } from '../../hooks/useDepartment';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const Layout = () => {
    const { departments } = useDepartment();

    return (
        <AppBar position="sticky" style={{ background: '#fff', color: '#000' }}>
            <Toolbar>
                <Grid container justify="center">
                    <NavLink
                        className="NavLink"
                        to={`/articles?page=1&count=${ARTICLES_PER_PAGE}`}
                    >
                        <Typography variant="button">iNews</Typography>
                    </NavLink>
                </Grid>
            </Toolbar>
            <Divider variant="middle" />
            <Toolbar>
                <Grid container justify="center">
                    {departments.map(department => (
                        <Grid
                            item
                            key={department}
                            style={{ marginLeft: 10, marginRight: 10 }}
                        >
                            <NavLink
                                to={{
                                    pathname: '/articles',
                                    search: `?${stringify({
                                        department,
                                        page: 1,
                                        count: ARTICLES_PER_PAGE
                                    })}`
                                }}
                                className="NavLink"
                            >
                                <Typography variant="button">
                                    {department}
                                </Typography>
                            </NavLink>
                        </Grid>
                    ))}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Layout;
