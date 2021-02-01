import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { stringify } from 'query-string';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import EndpointConstants from '../../constants/EndpointConstants';
import { unauthorized } from '../../state/httpClient';
import ArticleContent from './ArticleContent';
import ArticleHeader from './ArticleHeader';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const Article = () => {
    const {
        params: { id }
    } = useRouteMatch();

    const history = useHistory();
    const location = useLocation();

    const [article, setArticle] = useState(null);
    const [async, setAsync] = useState({ isLoading: false, error: null });
    const [highlight, setHighlight] = useState(false);

    function handleClose() {
        if (location.state && location.state.fromHome) {
            history.goBack();
        } else {
            history.push({
                pathname: '/articles',
                search: `?${stringify({
                    page: 1,
                    count: ARTICLES_PER_PAGE
                })}`
            });
        }
    }

    useEffect(() => {
        async function fetchArticle() {
            const { path, method } = EndpointConstants.ARTICLE_GET;
            try {
                setAsync({ isLoading: true, error: null });
                const res = await unauthorized({
                    method,
                    path: path(id)
                });
                setArticle(res);
                setAsync({ isLoading: false, error: null });
            } catch (error) {
                setAsync({ isLoading: false, error });
            }
        }

        fetchArticle();
    }, [id, setAsync]);

    if (!article) {
        return null;
    }

    return (
        <Dialog open={id} fullScreen onClose={handleClose}>
            <ArticleHeader
                article={article}
                handleClose={handleClose}
                highlight={highlight}
                setHighlight={setHighlight}
            />
            <ArticleContent
                article={article}
                async={async}
                highlight={highlight}
                setHighlight={setHighlight}
            />
        </Dialog>
    );
};

export default Article;
