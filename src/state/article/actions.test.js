import * as articleActions from './actions';
import { unauthorized } from '../httpClient';
import types from './types';
import mockStore from '../../mocks/mockStore';

jest.mock('../httpClient');

describe('Test article actions', () => {
    const store = mockStore({
        article: {
            list: [],
            listMetaInformation: {
                total: 0
            },
            listAyncIndicators: {
                isLoading: false,
                error: null
            }
        }
    });

    beforeEach(() => {
        store.clearActions();
    });

    describe('list', () => {
        it('should load articles and dispatch correct actions on success', async () => {
            unauthorized.mockResolvedValue({ articles: ['test'], total: 1 });
            await store.dispatch(
                articleActions.loadArticles({ offset: 0, max: 20 })
            );
            const actions = store.getActions();
            const [updateAsyncStart, articlesLoaded, updateAsyncEnd] = actions;
            expect(actions).toHaveLength(3);
            expect(updateAsyncStart).toEqual({
                type: types.ARTICLE_LIST_ASYNC,
                data: {
                    isLoading: true,
                    error: null
                }
            });
            expect(articlesLoaded).toEqual({
                type: types.ARTICLE_LIST,
                data: {
                    articles: ['test'],
                    total: 1
                }
            });
            expect(updateAsyncEnd).toEqual({
                type: types.ARTICLE_LIST_ASYNC,
                data: {
                    isLoading: false,
                    error: null
                }
            });
        });
        it('should dispatch correct actions on error', async () => {
            unauthorized.mockRejectedValue('error');
            await store.dispatch(articleActions.loadArticles(1, 20));
            const actions = store.getActions();
            const [updateAsyncStart, updateAsyncEnd] = actions;

            expect(actions).toHaveLength(2);
            expect(updateAsyncStart).toEqual({
                type: types.ARTICLE_LIST_ASYNC,
                data: {
                    isLoading: true,
                    error: null
                }
            });
            expect(updateAsyncEnd).toEqual({
                type: types.ARTICLE_LIST_ASYNC,
                data: {
                    isLoading: false,
                    error: 'error'
                }
            });
        });
    });
});
