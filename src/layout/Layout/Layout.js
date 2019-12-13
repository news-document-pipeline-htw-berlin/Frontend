import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';

const Layout = () => {
    const categories = ['Politik', 'Wirtschaft', 'Wissenschaft', 'Sport'];
    return (
        <AppBar position="sticky" style={{ background: '#fff', color: '#000' }}>
            <Toolbar>
                <Grid container justify="center">
                    <Button color="inherit">
                        <Typography variant="button">iNews</Typography>
                    </Button>
                </Grid>
            </Toolbar>
            <Divider variant="middle" />
            <Toolbar>
                <Grid container justify="center">
                    {categories.map(category => (
                        <Grid item key={category}>
                            <Button color="inherit">
                                <Typography variant="button">
                                    {category}
                                </Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Layout;
