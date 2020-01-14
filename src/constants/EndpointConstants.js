import { stringify } from 'query-string';

export default {
    ARTICLE_LIST: {
        method: 'GET',
        path: options =>
            `/articles?${stringify(options, { arrayFormat: 'comma' })}`
    },
    ARTICLE_GET: {
        method: 'GET',
        path: id => `/articles/${id}`
    },
    NEWSPAPER_LIST: {
        method: 'GET',
        path: '/articles/newspapers'
    },
    AUTHORS_LIST: {
        method: 'GET',
        path: query => `/articles/authors?query=${query}`
    }
};
