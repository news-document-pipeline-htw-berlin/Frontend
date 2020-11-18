import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';

import { Toolbar, Grid, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { ARTICLES_PER_PAGE, TOKEN } from '../../constants/CommonConstants';
import logo from '../../assets/images/logo.png';

const NavBar = ({ handleButtonClick }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        cookies.removeItem(TOKEN);
        handleClose();
        history.push('/');
    };

    return (
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
                            onClick={() => handleButtonClick(true)}
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
                            <img src={logo} width={70} height={48} alt="logo" />
                        </NavLink>
                    </Grid>
                </Grid>
                <Grid
                    xs={2}
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing="2"
                >
                    {cookies.getItem(TOKEN) != null && (
                        <div>
                            <Grid item>
                                <Typography variant="caption" display="block">
                                    Logged in as{' '}
                                    {jwt(cookies.getItem(TOKEN)).user}
                                </Typography>
                            </Grid>
                        </div>
                    )}
                    <Grid item>
                        <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            edge="start"
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {cookies.getItem(TOKEN) == null && (
                                <div>
                                    <NavLink className="NavLink" to="/login">
                                        <MenuItem onClick={handleClose}>
                                            Login
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink className="NavLink" to="/signup">
                                        <MenuItem onClick={handleClose}>
                                            Sign up
                                        </MenuItem>
                                    </NavLink>
                                </div>
                            )}
                            {cookies.getItem(TOKEN) != null && (
                                <div>
                                    <NavLink className="NavLink" to="/profile">
                                        <MenuItem onClick={handleClose}>
                                            {jwt(cookies.getItem(TOKEN)).user}
                                        </MenuItem>
                                    </NavLink>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </div>
                            )}
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

NavBar.propTypes = {
    handleButtonClick: PropTypes.func.isRequired
};

export default NavBar;
