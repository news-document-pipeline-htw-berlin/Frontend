import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PostPreview from '../../components/PostPreview/PostPreview';
import './Blog.css';
import Grid from '@material-ui/core/Grid';
import * as articleActions from '../../state/article/actions';
import { connect } from 'react-redux';
import { getArticleAsync, getArticles } from '../../state/article/selectors';
import Search from '../../components/Search/Search';
import Article from '../../components/Article/Article';


const Blog = props => {
    const [openArticle, setOpenArticle] = useState(null);

    const { loadArticles, articles, async } = props;

    useEffect(() => {        
        loadArticles();         
    }, [loadArticles])

    function handleArticleClick(article) {
        setOpenArticle(article)
    }

    function handleClose() {
        setOpenArticle(null);
    }    

    function renderArticles() {
        const { error, isLoading } = async;
        return error ? 
        <p> An error occurred</p> :
        articles.map(article => {
            const {id, title} = article;
            return (
                <React.Fragment>
                <Grid xs={12} sm={6} md={4} item style={{marginBottom: 20}} key={`grid${id}`}>
                    <PostPreview title={title} key={id} author='Author' onClick={() => handleArticleClick(article)} isLoading={isLoading}/>
                </Grid>                
                <Article open={!!openArticle} handleClose={handleClose} article={openArticle}/>               
                
                </React.Fragment>
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