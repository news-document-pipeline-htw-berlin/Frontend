import { stringify } from 'query-string';

export default {
    ARTICLE_LIST: {
        method: 'GET',
        path: options => `/articles?${stringify(options)}`
    },
    ARTICLE_GET: {
        method: 'GET',
        path: id => `/articles/${id}`
    },
    NEWSPAPER_LIST: {
        method: 'GET',
        path: '/articles/newspapers'
    },
    AUTHOR_LIST: {
        method: 'GET',
        path: query => `/articles/authors?query=${query}`
    },
    DEPARTMENT_LIST: {
        method: 'GET',
        path: '/articles/departments'
    },
    ANALYTICS_GET_TERMS: {
        method: 'GET',
        path: options => `/analytics/terms?${stringify(options)}`
    },
    ANALYTICS_GET_KEYWORDS: {
        method: 'GET',
        path: '/analytics/lemmas'
    }
};
