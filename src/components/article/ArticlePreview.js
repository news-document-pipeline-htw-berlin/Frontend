import React from 'react';
import Card from '@material-ui/core/Card';
import {
    CardHeader,
    CardMedia,
    CardActionArea,
    Chip,
    Paper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import LoadingAnimation from '../common/LoadingAnimation';
import ReadingTime from './ReadingTime';
import { ArticlePropTypes } from '../../constants/NewsPropTypes';
import headerPhoto from '../../assets/images/stock.jpg';

const ArticlePreview = props => {
    const { onClick, isLoading, article } = props;
    const { title, authors, readingTime, imageLinks, departments } = article;

    const chips = departments.map(department => (
        <Chip
            color="default"
            key={department}
            label={department}
            component="a"
            clickable
            variant="outlined"
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
                        title="Stock photo"
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
