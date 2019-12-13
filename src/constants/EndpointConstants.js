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
        path: '/articles/newspaper'
    },
    AUTHORS_LIST: {
        method: 'GET',
        path: 'articles/authors'
    }
};
