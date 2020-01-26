import React from 'react';
import PropTypes from 'prop-types';
import {
    SwipeableDrawer,
    Typography,
    List,
    ListItem,
    Divider
} from '@material-ui/core';
import { stringify } from 'query-string';
import { NavLink } from 'react-router-dom';
import { useDepartment } from '../../hooks/useDepartment';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { departments } = useDepartment();

    const sideList = () => (
        <div
            style={{ width: 250, marginBottom: 30 }}
            role="presentation"
            onClick={() => toggleSidebar(false)}
            onKeyDown={() => toggleSidebar(false)}
        >
            <List>
                {departments.map(department => (
                    <ListItem button key={department}>
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
                            style={{ width: '100%' }}
                        >
                            <Typography
                                variant="subtitle2"
                                style={{ color: '#fff' }}
                            >
                                {department}
                            </Typography>
                        </NavLink>
                    </ListItem>
                ))}
                <Divider style={{ backgroundColor: '#fff' }} variant="middle" />
                <ListItem button key="analytics">
                    <NavLink
                        to={{
                            pathname: '/analytics'
                        }}
                        className="NavLink"
                        style={{ width: '100%' }}
                    >
                        <Typography
                            variant="subtitle2"
                            style={{ color: '#fff' }}
                        >
                            Statistiken
                        </Typography>
                    </NavLink>
                </ListItem>
            </List>
        </div>
    );

    return (
        <SwipeableDrawer
            open={isOpen}
            onClose={() => toggleSidebar(false)}
            onOpen={() => toggleSidebar(true)}
        >
            {sideList()}
        </SwipeableDrawer>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

export default Sidebar;
