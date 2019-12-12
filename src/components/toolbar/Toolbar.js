import React from 'react';
import { Grid } from '@material-ui/core';
import Search from '../search/Search';
import SearchAuthors from './SearchAuthors';
import SelectNewspaper from './SelectNewspaper';

const Toolbar = () => {
    return (
        <Grid container justify="space-around" style={{ marginTop: 20 }}>
            <Grid item xs={2}>
                <Search />
            </Grid>
            <Grid item xs={2}>
                <SearchAuthors />
            </Grid>
            <Grid item xs={2}>
                <SelectNewspaper />
            </Grid>
        </Grid>
    );
};

export default Toolbar;
