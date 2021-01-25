import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import { Chip } from '@material-ui/core';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const Departments = ({ departments }) => {
    const history = useHistory();

    function handleClick(e, department) {
        e.stopPropagation();
        history.push({
            pathname: '/articles',
            search: `?${stringify({
                department,
                page: 1,
                count: ARTICLES_PER_PAGE
            })}`
        });
    }

    return (
        <React.Fragment>
            {(departments.length === 0 && <div style={{ height: 41 }} />) ||
                departments.map(department => (
                    <Chip
                        color="default"
                        key={department}
                        label={department}
                        component="a"
                        clickable
                        variant="outlined"
                        onClick={e => handleClick(e, department)}
                    />
                ))}
        </React.Fragment>
    );
};

Departments.propTypes = {
    departments: PropTypes.array.isRequired
};

export default Departments;
