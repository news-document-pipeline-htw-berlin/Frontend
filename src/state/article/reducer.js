import types from './types';

const initial = {
    list: [],
    listMetaInformation: {
        total: 0
    },
    listAsyncIndicators: {
        isLoading: false,
        error: null
    }
};

function articleReducer(state = initial, action) {
    switch (action.type) {
        case types.ARTICLE_LIST: {
            const { articles, resultCount } = action.data;
            return {
                ...state,
                list: articles,
                listMetaInformation: {
                    total: resultCount
                }
            };
        }
        case types.ARTICLE_LIST_ASYNC: {
            return {
                ...state,
                listAsyncIndicators: action.data
            };
        }
        default:
            return state;
    }
}

export default articleReducer;
