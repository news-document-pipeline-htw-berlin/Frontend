import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Search from '../search/Search';
import SearchAuthors from './SearchAuthors';
import SelectNewspaper from './SelectNewspaper';
import { ToolbarPropTypes } from '../../constants/NewsPropTypes';

const Toolbar = ({ handleToolbarUpdate, toolbar }) => {
    return (
        <Grid container justify="space-around" style={{ marginTop: 20 }}>
            <Grid item xs={2}>
                <Search handleToolbarUpdate={handleToolbarUpdate} />
            </Grid>
            <Grid item xs={2}>
                <SearchAuthors handleToolbarUpdate={handleToolbarUpdate} />
            </Grid>
            <Grid item xs={2}>
                <SelectNewspaper
                    handleToolbarUpdate={handleToolbarUpdate}
                    toolbar={toolbar}
                />
            </Grid>
        </Grid>
    );
};

Toolbar.propTypes = {
    toolbar: ToolbarPropTypes.isRequired,
    handleToolbarUpdate: PropTypes.func.isRequired
};

export default Toolbar;
