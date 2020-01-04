import articleReducer from './reducer';
import types from './types';

describe('Test article reducer', () => {
    const state = {
        entries: [{ id: '1', title: 'foo' }],
        asyncIndicators: {
            isLoading: true,
            error: 2
        },
        toolbar: {
            offset: 2,
            query: 'search query',
            author: 'authorA',
            department: 'sports'
        }
    };
    it('should return initial state', () => {
        expect(articleReducer(undefined, {})).toEqual({
            entries: [],
            asyncIndicators: {
                isLoading: false,
                error: null
            },
            toolbar: {
                query: '',
                author: '',
                department: '',
                source: []
            }
        });
    });
    it('should handle ARTICLE_ASYNC', () => {
        expect(
            articleReducer(
                {
                    prop: 'test',
                    asyncIndicators: { isLoading: true, error: 1 }
                },
                {
                    type: types.ARTICLE_ASYNC,
                    data: {
                        isLoading: true,
                        error: 1
                    }
                }
            )
        ).toEqual({
            prop: 'test',
            asyncIndicators: {
                isLoading: true,
                error: 1
            }
        });
    });
    it('should handle ARTICLE_LIST', () => {
        expect(
            articleReducer(
                {
                    prop: 'test',
                    entries: ['foo', 'bar']
                },
                {
                    type: types.ARTICLE_LIST,
                    data: {
                        articles: ['foo']
                    }
                }
            )
        ).toEqual({
            prop: 'test',
            entries: ['foo']
        });
    });

    it('should return current state if action is irrelevant', () => {
        expect(articleReducer(state, { type: 'irrelevant' })).toEqual(state);
    });
});
