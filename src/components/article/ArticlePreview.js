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
import headerPhoto from '../../assets/images/stock.jpg';
import LoadingAnimation from '../common/LoadingAnimation';

const PostPreview = props => {
    const { title, author = '', onClick, isLoading, categories } = props;

    const chips = categories.map(category => (
        <Chip
            color="secondary"
            key={category.id}
            label={category.name}
            component="a"
            href=""
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
                    <CardMedia image={headerPhoto} title="Stock photo" />
                    <Paper elevation={0} style={{ margin: 10 }}>
                        {chips}
                    </Paper>

                    <CardHeader title={title} subheader={author} />
                </CardActionArea>
            )}
        </Card>
    );
};

PostPreview.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

PostPreview.defaultProps = {
    author: '',
    categories: [
        { id: 1, name: 'Politik' },
        { id: 2, name: 'Wirtschaft' }
    ]
};

export default PostPreview;
