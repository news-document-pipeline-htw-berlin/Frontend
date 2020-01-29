import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, Grid, Chip, Link, CardMedia } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import EndpointConstants from '../../constants/EndpointConstants';
import { unauthorized } from '../../state/httpClient';
import LoadingAnimation from '../common/LoadingAnimation';
import ErrorInfo from '../common/ErrorInfo';
import ReadingTime from './ReadingTime';

const Article = props => {
    const { handleClose } = props;

    const {
        params: { id }
    } = useRouteMatch();

    const history = useHistory();

    const [article, setArticle] = useState(null);
    const [async, setAsync] = useState({ isLoading: false, error: null });

    useEffect(() => {
        async function fetchArticle() {
            const { path, method } = EndpointConstants.ARTICLE_GET;
            try {
                setAsync({ isLoading: true, error: null });
                const res = await unauthorized({
                    method,
                    path: path(id)
                });
                setArticle(res);
                setAsync({ isLoading: false, error: null });
            } catch (error) {
                setAsync({ isLoading: false, error });
            }
        }

        fetchArticle();
    }, [id, setAsync]);

    if (!article) {
        return null;
    }

    function handleClick(keyword) {
        history.push({
            pathname: '/articles',
            search: `?${stringify({ query: keyword, page: 1 })}`
        });
    }

    const chips = article.mostRelevantLemmas.map(keyword => (
        <Chip
            color="secondary"
            onClick={() => handleClick(keyword)}
            key={keyword}
            label={keyword}
            clickable
            variant="outlined"
        />
    ));

    return (
        <Dialog open fullScreen onClose={handleClose}>
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
                        {async.isLoading && <LoadingAnimation />}
                        {async.error && (
                            <ErrorInfo message="Beim Laden der Artikel ist ein Fehler aufgetreten. Bitte versuche, die Seite neu zu laden." />
                        )}
                        {article.imageLinks.length && (
                            <CardMedia
                                image={article.imageLinks}
                                title="title image"
                                style={{ marginBottom: 20 }}
                            />
                        )}
                        <Typography paragraph variant="h6">
                            {article.description}
                        </Typography>
                        <ReadingTime readingTime={article.readingTime} />
                        <Typography>{article.text}</Typography>
                        <div style={{ margin: 20 }}>{chips}</div>
                        {article.longUrl && (
                            <div style={{ marginBottom: 20 }}>
                                <Link
                                    href={article.longUrl}
                                    color="secondary"
                                    underline="hover"
                                >
                                    {article.longUrl}
                                </Link>
                            </div>
                        )}
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
