import React from 'react';
import { stringify } from 'query-string';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
    DialogContent,
    Grid,
    Chip,
    Link,
    CardMedia,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingAnimation from '../common/LoadingAnimation';
import ErrorInfo from '../common/ErrorInfo';
import ReadingTime from './ReadingTime';
import {
    ArticlePropTypes,
    AsyncPropTypes
} from '../../constants/NewsPropTypes';
import { wording } from '../common/common';
import SentiScore from './SentiScore';

const ArticleContent = ({ article, async }) => {
    const history = useHistory();

    const { publishedTime, authors } = article;

    function renderText() {
        return (
            <div>
                {article.text.split('\n').map((paragraph, key) => {
                    return (
                        <Typography paragraph align="justify" key={uuidv4()}>
                            {paragraph}
                        </Typography>
                    );
                })}
            </div>
        );
    }

    function renderTextSum() {
        return (
            <div style={{ marginBottom: 30 }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid
                            container
                            alignItems="center"
                            justify="flex-start"
                        >
                            <Typography
                                style={{ paddingRight: 10 }}
                                variant="button"
                            >
                                Zusammenfassung
                            </Typography>
                            <Chip
                                variant="outlined"
                                label="BETA"
                                size="small"
                                color="primary"
                            />
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph align="justify" key={uuidv4()}>
                            {article.textSum}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

    function handleClick(keyword) {
        history.push({
            pathname: '/articles',
            search: `?${stringify({ query: keyword, page: 1 })}`
        });
    }

    function renderChips(keywords) {
        const uniq = [...new Set(keywords)];
        return (
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                {uniq.map(keyword => (
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
                <Grid item xs={10} md={8} lg={6}>
                    <DialogContent>
                        {article.imageLinks.length && (
                            <CardMedia
                                image={article.imageLinks[0]}
                                title="title image"
                                style={{
                                    height: 0,
                                    paddingTop: '56.25%',
                                    marginBottom: 20
                                }}
                            />
                        )}
                        <Typography paragraph variant="h6" align="justify">
                            {article.description}
                        </Typography>

                        <Grid container alignItems="center" direction="row">
                            <Grid item>
                                <ReadingTime
                                    readingTime={article.readingTime}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ paddingBottom: '20px' }}>
                                <SentiScore senti={article.sentiments} />
                            </Grid>
                        </Grid>
                        {renderTextSum()}
                        {renderText()}
                        {renderChips(article.keywords)}
                        {renderChips(article.entities)}
                        {renderChips(article.keywordsExtracted)}
                        <Typography paragraph>
                            {publishedTime
                                ? moment(publishedTime).format('DD.MM.YYYY')
                                : ''}
                        </Typography>
                        {authors.map(author => (
                            <Link
                                href={`/authors&id=${author}`}
                                onClick={e => {
                                    e.preventDefault();
                                    history.push({
                                        pathname: `/authors&id=${author}`,
                                        state: { title: article.title }
                                    });
                                }}
                                color="primary"
                                underline="hover"
                            >
                                {author}
                            </Link>
                        ))}
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
