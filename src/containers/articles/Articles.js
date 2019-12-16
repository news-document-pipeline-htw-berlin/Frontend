import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { articleActions } from '../../state/actions';
import {
    getArticleAsync,
    getArticles,
    getToolbar
} from '../../state/article/selectors';
import Pagination from '../../components/common/Pagination';
import Toolbar from '../../components/toolbar/Toolbar';
import { ToolbarPropTypes } from '../../constants/NewsPropTypes';
import ArticleOverview from '../../components/article/ArticleOverview';
import Article from '../../components/article/Article';

const ELEMENTS_PER_PAGE = 12;

const Articles = props => {
    const [openArticle, setOpenArticle] = useState(null);
    const [currentPage, setCurrenPage] = useState(1);

    const { loadArticles, articles, async, toolbar } = props;

    useEffect(() => {
        loadArticles(currentPage - 1, ELEMENTS_PER_PAGE);
    }, [loadArticles, currentPage]);

    function handleArticleClick(article) {
        setOpenArticle(article);
    }

    function handleClose() {
        setOpenArticle(null);
    }

    function handlePageChange(page) {
        setCurrenPage(page);
    }

    function handleToolbarUpdate() {
        loadArticles(0, ELEMENTS_PER_PAGE, () => setCurrenPage(1));
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Toolbar
                handleToolbarUpdate={handleToolbarUpdate}
                toolbar={toolbar}
            />
            <ArticleOverview
                articles={articles}
                async={async}
                handleArticleClick={handleArticleClick}
            />
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
            <Article handleClose={handleClose} article={openArticle} />
        </Grid>
    );
};

const mapStateToProps = state => ({
    async: getArticleAsync(state),
    articles: getArticles(state),
    toolbar: getToolbar(state)
});

const mapDispatchToProps = {
    loadArticles: articleActions.loadArticles,
    updatePage: articleActions.updatePage
};

Articles.propTypes = {
    async: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
    loadArticles: PropTypes.func.isRequired,
    toolbar: ToolbarPropTypes.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
