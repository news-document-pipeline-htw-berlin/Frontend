import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import Card from '@material-ui/core/Card';
import {
    CardHeader,
    CardMedia,
    CardActionArea,
    Paper
} from '@material-ui/core';
import ReadingTime from './ReadingTime';
import { ArticlePropTypes } from '../../constants/NewsPropTypes';
import headerPhoto from '../../assets/images/stock.jpg';
import Departments from './Departments';

const ArticlePreview = ({ onClick, isLoading, article }) => {
    const { title, authors, readingTime, imageLinks, departments } = article;

    return (
        <Card style={{ minHeight: 450 }}>
            {isLoading ? (
                <ContentLoader width="100%" height="417">
                    <rect x="0" y="0" rx="0" ry="0" width="346" height="195" />
                    <rect
                        x="10"
                        y="215"
                        rx="10"
                        ry="10"
                        width="70"
                        height="35"
                    />
                    <rect x="10" y="270" rx="4" ry="4" width="250" height="6" />
                    <rect x="10" y="290" rx="4" ry="4" width="270" height="6" />
                </ContentLoader>
            ) : (
                <CardActionArea onClick={onClick}>
                    <CardMedia
                        image={imageLinks.length ? imageLinks[0] : headerPhoto}
                        title="title photo"
                    />
                    <Paper elevation={0} style={{ margin: 10 }}>
                        <Departments departments={departments} />
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
