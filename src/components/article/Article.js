import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import EndpointConstants from '../../constants/EndpointConstants';
import { unauthorized } from '../../state/httpClient';

const Article = props => {
    const { handleClose } = props;
    const {
        params: { id }
    } = useRouteMatch();

    const [article, setArticle] = useState(null);

    useEffect(() => {
        async function fetchArticle() {
            const { path, method } = EndpointConstants.ARTICLE_GET;
            const res = await unauthorized({
                method,
                path: path(id)
            });
            setArticle(res);
        }

        fetchArticle();
    }, [id]);

    return (
        <Dialog open={!!article} fullScreen onClose={handleClose}>
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
                    <Grid container justify="center">
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                {article.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container justify="center">
                <Grid item xs={6}>
                    <DialogContent>
                        <Typography>{article.text}</Typography>
                    </DialogContent>
                </Grid>
            </Grid>
        </Dialog>
    );
};

Article.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default Article;
