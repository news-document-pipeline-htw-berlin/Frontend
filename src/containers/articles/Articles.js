import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PostPreview from '../../components/article/ArticlePreview';
import * as articleActions from '../../state/article/actions';
import { getArticleAsync, getArticles } from '../../state/article/selectors';
import Article from '../../components/article/Article';
import Pagination from '../../components/common/Pagination';
import Toolbar from '../../components/toolbar/Toolbar';

const Blog = props => {
    const [openArticle, setOpenArticle] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const ELEMENTS_PER_PAGE = 12;

    const { loadArticles, articles, async } = props;

    useEffect(() => {
        loadArticles(0, ELEMENTS_PER_PAGE);
    }, [loadArticles]);

    function handleArticleClick(article) {
        setOpenArticle(article);
    }

    function handleClose() {
        setOpenArticle(null);
    }

    function handlePageChange(page) {
        setCurrentPage(page);
        loadArticles(page - 1, ELEMENTS_PER_PAGE);
    }

    function renderArticles() {
        const { error, isLoading } = async;
        return error ? (
            <p> An error occurred</p>
        ) : (
            <Grid container>
                {articles.map(article => {
                    const { id, title } = article;
                    return (
                        <Grid
                            xs={12}
                            sm={6}
                            md={4}
                            item
                            style={{ marginBottom: 20 }}
                            key={`grid${id}`}
                        >
                            <PostPreview
                                title={title}
                                key={id}
                                author="Author"
                                onClick={() => handleArticleClick(article)}
                                isLoading={isLoading}
                            />
                        </Grid>
                    );
                })}
                <Article handleClose={handleClose} article={openArticle} />
            </Grid>
        );
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Toolbar />
            {renderArticles()}
            <Grid container justify="center">
                <Grid item xs={6}>
                    <Pagination
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        pageLimit={12}
                        totalRecords={200}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    async: getArticleAsync(state),
    articles: getArticles(state)
});

const mapDispatchToProps = {
    loadArticles: articleActions.loadArticles
};

Blog.propTypes = {
    async: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
    loadArticles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
