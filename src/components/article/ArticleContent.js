import React, { useEffect } from 'react';
import { stringify } from 'query-string';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import parse from 'html-react-parser';
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
import { updateKeywords } from '../user/UserService';

const ArticleContent = ({ article, async }) => {
    const history = useHistory();

    const { publishedTime, authors } = article;

    useEffect(() => {
        updateKeywords(article.keywords);
        updateKeywords(article.keywordsExtracted);
    }, [article]);

    function highlight(text, entities) {
        let res = text;
        new Set(entities).forEach(e => {
            res = res.replace(e, `<strong>${e}</strong>`);
            // '<strong style=\"background-color: rgba(29, 233, 182, 0.3); padding: 4px; border-radius: 5px\">' + e + '</strong>')
            // '<span style=\"background-color: rgba(29, 233, 182, 0.3); padding-top: 2px; padding-bottom: 2px; border-radius: 5px\">' + e + '</span>')
        });
        return res;
    }

    function renderText() {
        return (
            <div>
                {highlight(article.text, article.entities)
                    .split('\n')
                    .map((paragraph, key) => {
                        return (
                            <Typography
                                paragraph
                                align="justify"
                                key={uuidv4()}
                            >
                                {parse(paragraph)}
                            </Typography>
                        );
                    })}
            </div>
        );
    }

    function renderTextSum() {
        return (
            <div style={{ marginBottom: 30 }}>
                <Accordion style={{ background: 'rgba(158, 158, 158, 0.2 )' }}>
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
            <div>
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

                        <Grid container justify="space-between" direction="row">
                            <Grid item>
                                <ReadingTime
                                    readingTime={article.readingTime}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SentiScore senti={article.sentiments} />
                            </Grid>
                        </Grid>
                        {renderTextSum()}
                        {renderText()}
                        <div style={{ marginTop: 20, marginBottom: 20 }}>
                            {renderChips(article.keywords)}
                            {renderChips(article.keywordsExtracted)}
                        </div>
                        <Typography paragraph>
                            {publishedTime
                                ? moment(publishedTime).format('DD.MM.YYYY')
                                : ''}
                        </Typography>
                        {authors.map(author => (
                            <div>
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
                                <br />
                            </div>
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
