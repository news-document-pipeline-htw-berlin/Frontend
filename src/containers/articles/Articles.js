import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { articleActions } from '../../state/actions';
import {
    getListAsync,
    getArticles,
    getListMetaInformation
} from '../../state/article/selectors';
import Pagination from '../../components/common/Pagination';
import Toolbar from '../../components/toolbar/Toolbar';
import ArticleOverview from '../../components/article/ArticleOverview';
import Article from '../../components/article/Article';
import useQueryParams from '../../hooks/useQueryParams';

const ARTICLES_PER_PAGE = 24;

const Articles = props => {
    const history = useHistory();
    const match = useRouteMatch();
    const queryParams = useQueryParams();
    const { query, department, page, newspaper, author } = queryParams;
    const currentPage = Number(page || 1);
    const { loadArticles, articles, listMetaInformation, async } = props;

    const newspaperStringified = newspaper && newspaper.join();

    useEffect(() => {
        const options = {
            offset: currentPage - 1,
            max: ARTICLES_PER_PAGE,
            department,
            newspaperStringified,
            query,
            author
        };
        loadArticles(options);
    }, [
        loadArticles,
        query,
        currentPage,
        department,
        newspaperStringified,
        author
    ]);

    function handleArticleClick(article) {
        history.push(`/articles/${article.id}`);
    }

    function handleClose() {
        history.push(`/articles`);
    }

    function handlePageChange(newPage) {
        history.push({
            search: `?${stringify({ ...queryParams, page: newPage })}`
        });
    }

    function handleToolbarChange(options) {
        history.push({
            search: `?${stringify(
                { ...queryParams, ...options, page: 1 },
                { arrayFormat: 'comma' }
            )}`
        });
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Toolbar reloadArticles={handleToolbarChange} />
            {!articles.length && (
                <div
                    style={{
                        margin: 'auto',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <p>No articles found</p>
                </div>
            )}
            <ArticleOverview
                articles={articles}
                async={async}
                handleArticleClick={handleArticleClick}
            />
            {!!articles.length && (
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Pagination
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                            pageLimit={ARTICLES_PER_PAGE}
                            totalRecords={listMetaInformation.total}
                        />
                    </Grid>
                </Grid>
            )}

            <Route exact path={`${match.url}/:id`}>
                <Article handleClose={handleClose} />
            </Route>
        </Grid>
    );
};

const mapStateToProps = state => ({
    async: getListAsync(state),
    articles: getArticles(state),
    listMetaInformation: getListMetaInformation(state)
});

const mapDispatchToProps = {
    loadArticles: articleActions.loadArticles,
    updatePage: articleActions.updatePage
};

Articles.propTypes = {
    async: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
    loadArticles: PropTypes.func.isRequired,
    listMetaInformation: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
