import { mapErr } from '@kaave/result';
import type { Result } from '@kaave/result';
import type { Article } from '@contexts/common/domains/valueObjects/article';
import type { FindAllArticles } from '../../../../externals/repositories/findAllArticles';

export type LoadAllArticlesUsecase = () => Promise<Result<{ articles: Article[]; count: number }, { message: string }>>;

export const loadAllArticlesUsecaseFactory = (repository: FindAllArticles): LoadAllArticlesUsecase => async () => {
  const result = await repository();
  // エラーの場合のみ、Usecase が整理し直してあげる
  return mapErr(result, ({ message }) => ({ message }));
};
