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

function articlesLoaded(data) {
    return {
        type: types.ARTICLE_LIST,
        data
    };
}

export function loadArticles(options) {
    return async dispatch => {
        dispatch(updateAsync(true, null));
        try {
            const { method, path } = EndpointConstants.ARTICLE_LIST;
            const res = await unauthorized({
                method,
                path: path(options)
            });
            dispatch(articlesLoaded(res));
            dispatch(updateAsync(false, null));
        } catch (e) {
            dispatch(updateAsync(false, e));
        }
    };
}
