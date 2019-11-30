import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Layout = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">News-Pipeline</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
