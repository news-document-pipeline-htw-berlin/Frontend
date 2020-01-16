import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Search from './Search';
import SearchAuthors from './SearchAuthors';
import SelectNewspaper from './SelectNewspaper';

const Toolbar = ({ reloadArticles, resetFilters }) => {
    return (
        <Grid container justify="space-around" style={{ marginTop: 20 }}>
            <Grid item xs={2}>
                <Search reloadArticles={reloadArticles} />
            </Grid>
            <Grid item xs={2}>
                <SearchAuthors reloadArticles={reloadArticles} />
            </Grid>
            <Grid item xs={2}>
                <SelectNewspaper reloadArticles={reloadArticles} />
            </Grid>
            <Grid item xs={1} style={{ marginTop: 20 }}>
                <Button variant="outlined" onClick={resetFilters}>
                    <Typography variant="button">Reset filters</Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

Toolbar.propTypes = {
    reloadArticles: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired
};

export default Toolbar;
