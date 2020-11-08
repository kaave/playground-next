import { ArticleResponse } from '@contexts/common/domains/valueObjects/article';
import { f } from '.';
import { TimeoutError } from './timeout';

const ENDPOINT = 'https://conduit.productionready.io/api';

describe('utils', () => {
  describe('f', () => {
    it('json を返却するAPIへのアクセスが成功する', async () => {
      const promise = f<{ articles: ArticleResponse; articlesCount: number }>(`${ENDPOINT}/articles`, {
        timeoutMs: 10000,
      });
      setTimeout(() => promise.abort(), 10000);
      const v = await promise.then();

      expect(typeof v.articlesCount === 'number').toBeTruthy();
    });

    it('timeout が機能する', async () => {
      const promise = f<{ articles: ArticleResponse; articlesCount: number }>(`${ENDPOINT}/articles`, {
        timeoutMs: 10,
      });
      await expect(promise.then()).rejects.toThrowError(TimeoutError);
    });

    it('abort が機能する', async () => {
      const promise = f<{ articles: ArticleResponse; articlesCount: number }>(`${ENDPOINT}/articles`);
      const response = promise.then();
      promise.abort();
      await expect(response).rejects.toThrow();
    });
  });
});
