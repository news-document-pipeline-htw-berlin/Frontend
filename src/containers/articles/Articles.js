import React from 'react';
import Grid from '@material-ui/core/Grid';
import { stringify } from 'query-string';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import Toolbar from '../../components/toolbar/Toolbar';
import ArticleOverview from '../../components/article/ArticleOverview';
import Article from '../../components/article/Article';
import useQueryParams from '../../hooks/useQueryParams';
import { useArticles } from '../../hooks/useArticles';

const ARTICLES_PER_PAGE = 24;

const Articles = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const queryParams = useQueryParams();
    const currentPage = Number(queryParams.page || 1);

    const { articles, listMetaInformation, async } = useArticles(
        queryParams,
        ARTICLES_PER_PAGE
    );

    function handleArticleClick(article) {
        history.push(`/articles/${article.id}`);
    }

    function handleArticleClose() {
        history.goBack();
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
                    <Grid item xs={4}>
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
                <Article handleClose={handleArticleClose} />
            </Route>
        </Grid>
    );
};

export default Articles;
