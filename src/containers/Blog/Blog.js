import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Post from '../../components/Post/Post';
import './Blog.css';
import Grid from '@material-ui/core/Grid';
import * as articleActions from '../../state/article/actions';
import { connect } from 'react-redux';
import { getArticleAsync, getArticles } from '../../state/article/selectors';
import Search from '../../components/Search/Search';


const Blog = props => {
    const [selectedPostId, setSelectedPostId] = useState(null);

    const { loadArticles, articles, async } = props;

    useEffect(() => {        
        loadArticles();         
    }, [loadArticles])

    function handlePostClick(id) {
        setSelectedPostId(id === selectedPostId ? null : id)
    }

    function renderArticles() {
        const { error, isLoading } = async;
        return error ? 
        <p> An error occurred</p> :
        articles.map(article => {
            const {id, title} = article;
            return (
                <Grid xs={12} sm={6} md={4} item style={{marginBottom: 20}} key={`grid${id}`}>
                    <Post title={title} key={id} author='Author' onClick={() => handlePostClick(id)} isLoading={isLoading}/>
                </Grid>
            )
        })
    }


    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Grid container justify='center'>
                <Grid item xs={6}>
                    <Search />
                </Grid>
            </Grid>
            {renderArticles()}
        </Grid>
    );

}

const mapStateToProps = state => ({
    async: getArticleAsync(state),
    articles: getArticles(state),
})

const mapDispatchToProps = {
    loadArticles: articleActions.loadArticles
}

Blog.propTypes = {
    async: propTypes.object.isRequired,
    articles: propTypes.array.isRequired,
    loadArticles: propTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);