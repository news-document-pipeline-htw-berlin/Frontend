import { getListAsync, getArticles } from './selectors';

describe('Test article selectors', () => {
    const store = {
        article: {
            list: ['foo'],
            listMetaInformation: {
                total: 3
            },
            listAsyncIndicators: {
                isLoading: true,
                error: 'error'
            }
        }
    };
    describe('getArticles', () => {
        it('should return article entries', () => {
            expect(getArticles(store)).toEqual(['foo']);
        });
    });

    describe('getListAsync', () => {
        it('should return async indicators', () => {
            expect(getListAsync(store)).toEqual({
                isLoading: true,
                error: 'error'
            });
        });
    });
});
