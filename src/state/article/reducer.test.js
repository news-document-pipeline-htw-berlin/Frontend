import articleReducer from './reducer';
import types from './types';

describe('Test article reducer', () => {
    const state = {
        entries: [{ id: '1', title: 'foo' }],
        listMetaInformation: {
            total: 2
        },
        listAsyncIndicators: {
            isLoading: true,
            error: 2
        }
    };
    it('should return initial state', () => {
        expect(articleReducer(undefined, {})).toEqual({
            list: [],
            listMetaInformation: {
                total: 0
            },
            listAsyncIndicators: {
                isLoading: false,
                error: null
            }
        });
    });
    it('should handle ARTICLE_LIST', () => {
        expect(
            articleReducer(
                {
                    prop: 'test',
                    list: ['foo', 'bar']
                },
                {
                    type: types.ARTICLE_LIST,
                    data: {
                        articles: ['foo'],
                        resultCount: 1
                    }
                }
            )
        ).toEqual({
            prop: 'test',
            list: ['foo'],
            listMetaInformation: {
                total: 1
            }
        });
    });
    it('should handle ARTICLE_LIST_ASYNC', () => {
        expect(
            articleReducer(
                {
                    prop: 'test',
                    listAsyncIndicators: { isLoading: true, error: 1 }
                },
                {
                    type: types.ARTICLE_LIST_ASYNC,
                    data: {
                        isLoading: true,
                        error: 1
                    }
                }
            )
        ).toEqual({
            prop: 'test',
            listAsyncIndicators: {
                isLoading: true,
                error: 1
            }
        });
    });
    it('should handle ARTICLE_GET_ASYNC', () => {
        expect(
            articleReducer(
                {
                    prop: 'test',
                    getAsyncIndicators: { isLoading: true, error: 1 }
                },
                {
                    type: types.ARTICLE_GET_ASYNC,
                    data: {
                        isLoading: true,
                        error: 1
                    }
                }
            )
        ).toEqual({
            prop: 'test',
            getAsyncIndicators: {
                isLoading: true,
                error: 1
            }
        });
    });

    it('should return current state if action is irrelevant', () => {
        expect(articleReducer(state, { type: 'irrelevant' })).toEqual(state);
    });
});
