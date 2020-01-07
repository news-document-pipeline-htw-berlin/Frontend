import React from 'react';
import { AppBar, Toolbar, Divider, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    const categories = [
        { title: 'Politik', url: 'politics' },
        { title: 'Wirtschaft', url: 'economics' },
        { title: 'Wissenschaft', url: 'science' },
        { title: 'Sport', url: 'sports' }
    ];

    return (
        <AppBar position="sticky" style={{ background: '#fff', color: '#000' }}>
            <Toolbar>
                <Grid container justify="center">
                    <NavLink className="NavLink" to="/articles">
                        <Typography variant="button">iNews</Typography>
                    </NavLink>
                </Grid>
            </Toolbar>
            <Divider variant="middle" />
            <Toolbar>
                <Grid container justify="center">
                    {categories.map(category => (
                        <Grid
                            item
                            key={category}
                            style={{ marginLeft: 10, marginRight: 10 }}
                        >
                            <NavLink
                                to={{
                                    pathname: '/articles',
                                    search: `?department=${category.url}`
                                }}
                                className="NavLink"
                            >
                                <Typography variant="button">
                                    {category.title}
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
