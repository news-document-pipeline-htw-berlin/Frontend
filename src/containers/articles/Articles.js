import React from 'react';
import Grid from '@material-ui/core/Grid';
import { stringify } from 'query-string';
import {
    Route,
    useHistory,
    useRouteMatch,
    useLocation
} from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import Toolbar from '../../components/toolbar/Toolbar';
import ArticleOverview from '../../components/article/ArticleOverview';
import Article from '../../components/article/Article';
import useQueryParams from '../../hooks/useQueryParams';
import { useArticles } from '../../hooks/useArticles';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const Articles = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();
    const queryParams = useQueryParams();
    const currentPage = Number(queryParams.page || 1);

    const { articles, listMetaInformation, async } = useArticles(
        queryParams,
        ARTICLES_PER_PAGE
    );

    function handleArticleClick(article) {
        history.push({
            pathname: `/articles/${article.id}`,
            state: { fromHome: true }
        });
    }

    function handlePageChange(newPage) {
        history.push({
            search: `?${stringify({
                ...queryParams,
                page: newPage
            })}`
        });
    }

    function handleToolbarChange(options) {
        history.push({
            search: `?${stringify({
                ...queryParams,
                ...options,
                page: 1,
                count: ARTICLES_PER_PAGE
            })}`
        });
    }

    function resetFilters() {
        const { department } = queryParams;
        history.push({
            pathname: location.pathname,
            search: `?${stringify({
                department,
                page: 1,
                count: ARTICLES_PER_PAGE
            })}`
        });
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Toolbar
                reloadArticles={handleToolbarChange}
                resetFilters={resetFilters}
            />
            {!articles.length && (
                <div
                    style={{
                        margin: 'auto',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <p>Keine Artikel gefunden</p>
                </div>
            )}
            <ArticleOverview
                articles={articles}
                async={async}
                handleArticleClick={handleArticleClick}
            />
            {!!articles.length && (
                <Grid container justify="center">
                    <Grid item xs={10} md={8} lg={6} xl={4}>
                        <Pagination
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                            pageLimit={ARTICLES_PER_PAGE}
                            totalRecords={listMetaInformation.total}
                            pageNeighbours={1}
                        />
                    </Grid>
                </Grid>
            )}

            <Route exact path={`${match.url}/:id`}>
                <Article />
            </Route>
        </Grid>
    );
};

export default Articles;
