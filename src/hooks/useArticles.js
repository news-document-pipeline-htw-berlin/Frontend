import { useEffect, useState } from 'react';
import {
    getSuggestions,
    useSuggestionsActive
} from '../components/user/UserService';
import EndpointConstants from '../constants/EndpointConstants';
import { unauthorized } from '../state/httpClient';

export function useArticles(queryParams, articlesPerPage) {
    const { page, department, newspaper, query, author } = queryParams;
    const currentPage = Number(page || 1);

    const [async, setAsync] = useState({ isLoading: false, error: null });
    const [articles, setArticles] = useState([]);
    const [listMetaInformation, setListMetaInformation] = useState({});
    const [suggestionsActive] = useSuggestionsActive();

    useEffect(() => {
        const options = {
            offset: (currentPage - 1) * articlesPerPage,
            count: articlesPerPage,
            department,
            newspaper,
            query,
            author
        };
        async function fetchArticles() {
            try {
                const { method, path } = EndpointConstants.ARTICLE_LIST;
                setAsync({ isLoading: true, error: null });
                const res = await unauthorized({
                    method,
                    path: path(options)
                });

                setArticles(res.articles);
                setListMetaInformation({
                    total: res.resultCount
                });

                setAsync({ isLoading: false, error: null });
            } catch (err) {
                setAsync({ isLoading: false, error: err });
            }
        }
        if (department || newspaper || query || author || !suggestionsActive) {
            fetchArticles();
        } else {
            getSuggestions({
                setArticles,
                setAsync,
                setListMetaInformation,
                options
            });
        }
    }, [
        currentPage,
        department,
        newspaper,
        query,
        author,
        articlesPerPage,
        suggestionsActive
    ]);

    return {
        articles,
        listMetaInformation,
        async
    };
}
