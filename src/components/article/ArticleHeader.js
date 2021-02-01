import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Tooltip } from '@material-ui/core';
import { ArticlePropTypes } from '../../constants/NewsPropTypes';
import { wording } from '../common/common';

const ArticleHeader = ({ article, handleClose, highlight, setHighlight }) => {
    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <Grid container justify="center">
                        <Grid item xs={2}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container justify="center">
                                {article && (
                                    <Typography variant="h6">
                                        {article.title}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container justify="flex-end">
                                <Tooltip
                                    title={wording.article.highlight}
                                    placement="bottom-start"
                                >
                                    <IconButton
                                        color={
                                            highlight ? 'primary' : 'inherit'
                                        }
                                        size="large"
                                        onClick={() => setHighlight(!highlight)}
                                        edge="end"
                                    >
                                        <FormatColorTextIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

ArticleHeader.propTypes = {
    article: ArticlePropTypes.isRequired,
    handleClose: PropTypes.func.isRequired,
    highlight: PropTypes.bool.isRequired,
    setHighlight: PropTypes.func.isRequired
};

export default ArticleHeader;
