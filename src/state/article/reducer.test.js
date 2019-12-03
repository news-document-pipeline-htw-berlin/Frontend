import articleReducer from './reducer';
import types from './types';

describe('Test article reducer', () => {
    const state = {
        entries: [{ id: '1', title: 'foo' }],
        asyncIndicators: {
            isLoading: true,
            error: 2
        }
    };
    it('should return initial state', () => {
        expect(articleReducer(undefined, {})).toEqual({
            entries: [],
            asyncIndicators: {
                isLoading: false,
                error: null
            }
        });
    });
    it('should handle ARTICLE_ASYNC', () => {
        expect(
            articleReducer(undefined, {
                type: types.ARTICLE_ASYNC,
                data: {
                    isLoading: true,
                    error: 1
                }
            })
        ).toEqual({
            entries: [],
            asyncIndicators: {
                isLoading: true,
                error: 1
            }
        });
    });
    it('should handle ARTICLE_LIST', () => {
        expect(
            articleReducer(undefined, {
                type: types.ARTICLE_LIST,
                data: {
                    articles: ['foo']
                }
            })
        ).toEqual({
            entries: ['foo'],
            asyncIndicators: {
                isLoading: false,
                error: null
            }
        });
    });
    it('should return current state if action is irrelevant', () => {
        expect(articleReducer(state, { type: 'irrelevant' })).toEqual(state);
    });
});
