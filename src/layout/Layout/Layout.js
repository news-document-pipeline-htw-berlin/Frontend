import React, { useState } from 'react';
import { AppBar, Divider } from '@material-ui/core';
import './Layout.css';
import Sidebar from './Sidebar';
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
                <PopularKeywords keywords={keywords} async={async} />
            </AppBar>
        </React.Fragment>
    );
};

export default Layout;
