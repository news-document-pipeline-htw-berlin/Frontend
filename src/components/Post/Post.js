import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardMedia, CardActionArea, Chip, Paper } from '@material-ui/core';
import propTypes from 'prop-types';
import headerPhoto from '../../assets/images/stock.jpg';
import LoadingAnimation from './LoadingAnimation/LoadingAnimation';


const Post = props => {

    const {title, author = '', onClick, isLoading, categories} = props;

    const chips = categories.map(category => <Chip color='secondary' key={category.id} label={category.name} component="a" href="" clickable variant="outlined" />)

    return (
    <Card >
        {isLoading ? <LoadingAnimation /> : (
            <CardActionArea onClick={onClick}>
            <CardMedia image={headerPhoto}
            title="Stock photo" />
            <Paper elevation={0} style={{margin: 10}}>
                {chips}    
            </Paper>
                    
            <CardHeader title={title} subheader={author}  />
                
            <CardContent></CardContent>
        </CardActionArea>
        )}
        
    </Card>
)};

Post.propTypes = {
    title: propTypes.string.isRequired,
    author: propTypes.string,
    categories: propTypes.arrayOf(propTypes.object),
    onClick: propTypes.func.isRequired,
    isLoading: propTypes.bool.isRequired,
}

Post.defaultProps = {
    author: '',
    categories: [{id: 1, name: 'Politik'}, {id: 2, name: 'Wirtschaft'}]
}

export default Post;