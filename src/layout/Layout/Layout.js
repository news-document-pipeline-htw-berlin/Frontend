import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, IconButton } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import './Layout.css';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';
import Sidebar from './Sidebar';
import logo from '../../assets/images/logo.png';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <React.Fragment>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
            <AppBar position="sticky" color="default">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={2}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="stretch"
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container justify="center">
                                <NavLink
                                    className="NavLink"
                                    to={`/articles?page=1&count=${ARTICLES_PER_PAGE}`}
                                >
                                    <img
                                        src={logo}
                                        width={70}
                                        height={48}
                                        alt="logo"
                                    />
                                </NavLink>
                            </Grid>
                        </Grid>

                        <Grid item xs={2} />
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Layout;
