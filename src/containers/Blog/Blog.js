import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';

import PostPreview from '../../components/PostPreview/PostPreview';
import './Blog.css';
import * as articleActions from '../../state/article/actions';
import { getArticleAsync, getArticles } from '../../state/article/selectors';
import Search from '../../components/Search/Search';
import Article from '../../components/Article/Article';
import Pagination from '../Pagination/Pagination';
import LineChart from '../../components/Analytics/LineChart';
import BarChart from '../../components/Analytics/BarChart';
import AreaChart from '../../components/Analytics/AreaChart';

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

    function renderAnalytics() {
        const data1 = [
            [
                { x: 1, y: 10 },
                { x: 2, y: 8 },
                { x: 3, y: 3 }
            ],
            [
                { x: 1, y: 2 },
                { x: 2, y: 5 },
                { x: 3, y: 6 }
            ],
            [
                { x: 1, y: 3 },
                { x: 2, y: 3.5 },
                { x: 3, y: 2.5 }
            ]
        ];

        const timestamp = new Date('May 23 2017').getTime();
        const ONE_DAY = 86400000;

        const data2 = [
            { x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1 },
            { x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1 },
            { x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1 },
            { x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2 },
            { x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2 },
            { x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1 },
            { x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5 },
            { x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1 }
        ].map(el => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));

        const data3 = [
            { x: 1, y: 10 },
            { x: 2, y: 8 },
            { x: 3, y: 3 }
        ];

        return (
            <Grid container>
                <LineChart data={data1} />
                <BarChart data={data2} />
                <AreaChart data={data3} />
            </Grid>
        );
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
            <Grid container justify="center">
                <Grid item xs={6}>
                    <Search />
                </Grid>
            </Grid>
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
            {renderAnalytics()}
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
