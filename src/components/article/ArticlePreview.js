import React from 'react';
import { stringify } from 'query-string';
import Card from '@material-ui/core/Card';
import {
    CardHeader,
    CardMedia,
    CardActionArea,
    Chip,
    Paper
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingAnimation from '../common/LoadingAnimation';
import ReadingTime from './ReadingTime';
import { ArticlePropTypes } from '../../constants/NewsPropTypes';
import headerPhoto from '../../assets/images/stock.jpg';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const ArticlePreview = ({ onClick, isLoading, article }) => {
    const { title, authors, readingTime, imageLinks, departments } = article;

    const history = useHistory();

    function handleClick(e, department) {
        e.stopPropagation();
        history.push({
            pathname: '/articles',
            search: `?${stringify({
                department,
                page: 1,
                count: ARTICLES_PER_PAGE
            })}`
        });
    }

    const chips = departments.map(department => (
        <Chip
            color="default"
            key={department}
            label={department}
            component="a"
            clickable
            variant="outlined"
            onClick={e => handleClick(e, department)}
        />
    ));

    return (
        <Card>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <CardActionArea onClick={onClick}>
                    <CardMedia
                        image={imageLinks.length ? imageLinks[0] : headerPhoto}
                        title="title photo"
                    />
                    <Paper elevation={0} style={{ margin: 10 }}>
                        {chips}
                        <div style={{ marginLeft: 5, marginTop: 10 }}>
                            <ReadingTime readingTime={readingTime} />
                        </div>
                    </Paper>

                    <CardHeader title={title} subheader={authors.join(', ')} />
                </CardActionArea>
            )}
        </Card>
    );
};

ArticlePreview.propTypes = {
    article: ArticlePropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

ArticlePreview.defaultProps = {};

export default ArticlePreview;
