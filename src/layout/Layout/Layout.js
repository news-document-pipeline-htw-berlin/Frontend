import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Divider,
    Chip
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import './Layout.css';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';
import Sidebar from './Sidebar';
import logo from '../../assets/images/logo.png';
import { usePopularKeywords } from '../../hooks/usePopularKeywords';
import PopularKeywords from '../../components/NavBar/PopularKeywords';
import NavBar from '../../components/NavBar/NavBar';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { keywords, async } = usePopularKeywords();
    return (
        <React.Fragment>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
            <AppBar position="sticky" color="default">
                <NavBar handleButtonClick={setSidebarOpen} />
                <Divider />
                <PopularKeywords keywords={keywords} />
            </AppBar>
        </React.Fragment>
    );
};

export default Layout;
