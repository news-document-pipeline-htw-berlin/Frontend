import types from './types';

const initial = {
    entries: [],
    asyncIndicators: {
        isLoading: false,
        error: null
    },
    toolbar: {
        offset: 0,
        query: '',
        author: '',
        department: ''
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
        case types.ARTICLE_UPDATE_TOOLBAR: {
            return {
                ...state,
                toolbar: {
                    ...state.toolbar,
                    ...action.data
                }
            };
        }
        default:
            return state;
    }
}

export default articleReducer;
