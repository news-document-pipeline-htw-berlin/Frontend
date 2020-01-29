import React from 'react';
import { stringify } from 'query-string';
import uuidv4 from 'uuid/v4';
import { useHistory } from 'react-router-dom';
import {
    DialogContent,
    Grid,
    Chip,
    Link,
    CardMedia,
    Typography
} from '@material-ui/core';
import LoadingAnimation from '../common/LoadingAnimation';
import ErrorInfo from '../common/ErrorInfo';
import ReadingTime from './ReadingTime';
import {
    ArticlePropTypes,
    AsyncPropTypes
} from '../../constants/NewsPropTypes';
import { wording } from '../common/common';

const ArticleContent = ({ article, async }) => {
    const history = useHistory();

    function renderText() {
        return (
            <div>
                {article.text.split('\n').map((paragraph, key) => {
                    return <p key={uuidv4()}>{paragraph}</p>;
                })}
            </div>
        );
    }

    function handleClick(keyword) {
        history.push({
            pathname: '/articles',
            search: `?${stringify({ query: keyword, page: 1 })}`
        });
    }

    function renderChips() {
        return (
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                {article.mostRelevantLemmas.map(keyword => (
                    <Chip
                        color="default"
                        onClick={() => handleClick(keyword)}
                        key={keyword}
                        label={keyword}
                        clickable
                        variant="outlined"
                    />
                ))}
            </div>
        );
    }

    if (async.isLoading) {
        return <LoadingAnimation />;
    }

    if (async.error) {
        return <ErrorInfo message={wording.article.get.error} />;
    }
    return (
        <React.Fragment>
            <Grid container justify="center">
                <Grid item xs={6}>
                    <DialogContent>
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
                        {renderText()}
                        {renderChips()}
                        {article.longUrl && (
                            <div style={{ marginBottom: 20 }}>
                                <Link
                                    href={article.longUrl}
                                    color="primary"
                                    underline="hover"
                                >
                                    {article.longUrl}
                                </Link>
                            </div>
                        )}
                    </DialogContent>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

ArticleContent.propTypes = {
    article: ArticlePropTypes.isRequired,
    async: AsyncPropTypes.isRequired
};

export default ArticleContent;
