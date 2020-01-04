import { getArticleAsync, getArticles } from './selectors';

describe('Test article selectors', () => {
    const store = {
        article: {
            entries: ['foo'],
            asyncIndicators: {
                isLoading: true,
                error: 'error'
            },
            toolbar: { foo: 'bar' }
        }
    };
    it('should return article entries', () => {
        expect(getArticles(store)).toEqual(['foo']);
    });

    it('should return async indicators', () => {
        expect(getArticleAsync(store)).toEqual({
            isLoading: true,
            error: 'error'
        });
    });
});
