import React from 'react';
import cookies from 'js-cookies';
import jwt from 'jwt-decode';

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { TOKEN } from '../../constants/CommonConstants';

function UserProfile() {
    return (
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="left"
            justify="flex-start"
            style={{
                marginLeft: '20vw',
                marginRight: '20vw',
                marginTop: '10px'
            }}
        >
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="left"
                justify="stretch"
            >
                <Grid item align="left">
                    <Typography align="left" variant="h5" gutterBottom>
                        {jwt(cookies.getItem(TOKEN)).user}'s Account
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UserProfile;
