import EndpointConstants from "../../constants/EndpointConstants";
import types from './types';
import { unauthorized } from "../httpClient";

function updateAsync(isLoading, error = null) {
    return {
        type: types.ARTICLE_ASYNC,
        data: {
            isLoading,
            error
        }
    }
}

function articlesLoaded(articles) {
    return {
        type: types.ARTICLE_LIST,
        data: {
            articles
        }
    }
}

export function loadArticles() {
    return async dispatch => {        
        dispatch(updateAsync(true, null));
        try {
            const { method, path } = EndpointConstants.ARTICLE_LIST;
            const articles = await unauthorized({method, path});
            console.log(articles)
            dispatch(updateAsync(false, null));
            dispatch(articlesLoaded(articles.slice(0, 12)))
        }
        catch(e) {
            dispatch(updateAsync(false, e));
        }
    }    
}