import { ArticleResponse } from '@contexts/common/domains/valueObjects/article';
import type { Result } from '@kaave/result';

export type FindAllArticlesDriver = () => Promise<
  Result<{ articles: ArticleResponse[]; articlesCount: number }, { error: Error }>
>;
