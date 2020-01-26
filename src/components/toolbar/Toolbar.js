import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Search from './Search';
import SearchAuthors from './SearchAuthors';
import SelectNewspaper from './SelectNewspaper';

const Toolbar = ({ reloadArticles, resetFilters }) => {
    return (
        <Grid
            container
            justify="space-around"
            alignItems="center"
            style={{ marginTop: 20 }}
        >
            <Grid item xs={10} sm={8} md={2} style={{ marginBottom: 10 }}>
                <Search reloadArticles={reloadArticles} />
            </Grid>
            <Grid item xs={10} sm={8} md={2} style={{ marginBottom: 10 }}>
                <SearchAuthors reloadArticles={reloadArticles} />
            </Grid>
            <Grid item xs={10} sm={8} md={2} style={{ marginBottom: 10 }}>
                <SelectNewspaper reloadArticles={reloadArticles} />
            </Grid>
            <Grid item xs={10} sm={8} md={1}>
                <Button variant="outlined" onClick={resetFilters} fullWidth>
                    <Typography variant="button">Reset</Typography>
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
