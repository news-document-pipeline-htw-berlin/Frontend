import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';
import { ArticlePropTypes } from '../../constants/NewsPropTypes';

const ArticleHeader = ({ article, handleClose }) => {
    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    {article && (
                        <Grid container justify="center">
                            <Grid item xs={6}>
                                <Typography variant="h6">
                                    {article.title}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

ArticleHeader.propTypes = {
    article: ArticlePropTypes.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ArticleHeader;
