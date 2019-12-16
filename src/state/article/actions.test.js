import * as articleActions from './actions';
import { unauthorized } from '../httpClient';
import types from './types';
import mockStore from '../../mocks/mockStore';

jest.mock('../httpClient');

describe('Test article actions', () => {
    const store = mockStore({
        article: {
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
        }
    });

    beforeEach(() => {
        store.clearActions();
    });

    it('should load articles and dispatch correct actions on success', async () => {
        unauthorized.mockResolvedValue(['foo']);
        await store.dispatch(articleActions.loadArticles(1, 20));
        const actions = store.getActions();
        const [updateAsyncStart, articlesLoaded, updateAsyncEnd] = actions;
        expect(actions).toHaveLength(3);
        expect(updateAsyncStart).toEqual({
            type: types.ARTICLE_ASYNC,
            data: {
                isLoading: true,
                error: null
            }
        });
        expect(articlesLoaded).toEqual({
            type: types.ARTICLE_LIST,
            data: {
                articles: ['foo']
            }
        });
        expect(updateAsyncEnd).toEqual({
            type: types.ARTICLE_ASYNC,
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
            type: types.ARTICLE_ASYNC,
            data: {
                isLoading: true,
                error: null
            }
        });
        expect(updateAsyncEnd).toEqual({
            type: types.ARTICLE_ASYNC,
            data: {
                isLoading: false,
                error: 'error'
            }
        });
    });
    it('should dispatch action to update toolbar', () => {
        store.dispatch(articleActions.updateToolbar({ query: 'foo' }));
        expect(store.getActions()[0]).toEqual({
            type: types.ARTICLE_UPDATE_TOOLBAR,
            data: { query: 'foo' }
        });
    });
});
