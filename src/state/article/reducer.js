import types from './types';

const initial = {
    entries: [],
    asyncIndicators: {
        isLoading: false,
        error: null
    }
};

function articleReducer(state = initial, action) {
    switch (action.type) {
        case types.ARTICLE_ASYNC: {
            return {
                ...state,
                asyncIndicators: action.data
            };
        }
        case types.ARTICLE_LIST: {
            const { articles } = action.data;
            return {
                ...state,
                entries: articles
            };
        }
        default:
            return state;
    }
}

export default articleReducer;
