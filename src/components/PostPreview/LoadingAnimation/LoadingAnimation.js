import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

const LoadingAnimation = () => (
    <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100%', minWidht: '100%' }}
    >
        <Grid item>
            <CircularProgress size={68} color="secondary" />
        </Grid>
    </Grid>
);

export default LoadingAnimation;
