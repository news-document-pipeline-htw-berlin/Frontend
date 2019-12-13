import EndpointConstants from '../../constants/EndpointConstants';
import types from './types';
import { unauthorized } from '../httpClient';

function updateAsync(isLoading, error = null) {
    return {
        type: types.ARTICLE_ASYNC,
        data: {
            isLoading,
            error
        }
    };
}

export function updateToolbar(toolbar) {
    return {
        type: types.ARTICLE_UPDATE_TOOLBAR,
        data: toolbar
    };
}

function articlesLoaded(articles) {
    return {
        type: types.ARTICLE_LIST,
        data: {
            articles
        }
    };
}

export function loadArticles(offset, amount) {
    return async dispatch => {
        dispatch(updateAsync(true, null));
        try {
            const { method, path } = EndpointConstants.ARTICLE_LIST;
            const articles = await unauthorized({
                method,
                path: path(offset, amount)
            });
            dispatch(articlesLoaded(articles.slice(0, 12)));
            dispatch(updateAsync(false, null));
        } catch (e) {
            dispatch(updateAsync(false, e));
        }
    };
}
