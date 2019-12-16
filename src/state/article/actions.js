import EndpointConstants from '../../constants/EndpointConstants';
import types from './types';
import { unauthorized } from '../httpClient';
import { getToolbar } from './selectors';

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

export function loadArticles(offset = 0, count = 12, callback = null) {
    return async (dispatch, getState) => {
        dispatch(updateAsync(true, null));
        try {
            const { method, path } = EndpointConstants.ARTICLE_LIST;
            const articles = await unauthorized({
                method,
                path: path({
                    offset,
                    count,
                    ...getToolbar(getState())
                })
            });
            dispatch(articlesLoaded(articles));
            dispatch(updateAsync(false, null));
            if (callback) {
                callback();
            }
        } catch (e) {
            dispatch(updateAsync(false, e));
        }
    };
}
