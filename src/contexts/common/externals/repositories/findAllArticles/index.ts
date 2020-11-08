import { err, isOk, map } from '@kaave/result';
import type { Result } from '@kaave/result';
import type { Article } from '@contexts/common/domains/valueObjects/article';
import { convertToArticle } from '@contexts/common/domains/services/article';
import type { FindAllArticlesDriver } from '../../drivers/findAllArticles';

export type FindAllArticles = () => Promise<
  Result<{ articles: Article[]; count: number }, { type: number; message: string }>
>;

export const findAllArticlesFactory = (driver: FindAllArticlesDriver): FindAllArticles => async () => {
  const result = await driver();

  return isOk(result)
    ? map(result, ({ articles, articlesCount }) => ({
        articles: articles.map((article) => convertToArticle(article)),
        count: articlesCount,
      }))
    : err({ type: 0, message: 'エラーは端折っています' });
};
