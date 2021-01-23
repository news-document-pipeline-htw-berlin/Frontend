import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Divider } from '@material-ui/core';
import './Layout.css';
import Sidebar from './Sidebar';
import { usePopularKeywords } from '../../hooks/usePopularKeywords';
import PopularKeywords from '../../components/NavBar/PopularKeywords';
import NavBar from '../../components/NavBar/NavBar';

const Layout = ({ setDarkState }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { keywords, async } = usePopularKeywords();
    return (
        <React.Fragment>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
            <AppBar position="sticky" color="default">
                <NavBar
                    handleButtonClick={setSidebarOpen}
                    setDarkState={setDarkState}
                />
                <Divider />
                <PopularKeywords keywords={keywords} async={async} />
            </AppBar>
        </React.Fragment>
    );
};

Layout.propTypes = {
    setDarkState: PropTypes.func.isRequired
};
export default Layout;
