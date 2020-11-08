import { useMemo } from 'react';

import type { Article } from '@contexts/common/domains/valueObjects/article';
import type { FindAllArticles } from '@contexts/common/externals/repositories/findAllArticles';
import { isOk, unwrapErr, unwrapOk } from '@kaave/result';

class ArticlesStore {
  constructor(private readonly findAllArticlesRepository: FindAllArticles) {}

  public static factory(findAllArticlesRepository: FindAllArticles) {
    return new ArticlesStore(findAllArticlesRepository);
  }

  public async findAllArticles(): Promise<{ articles: readonly Article[]; readonly count: number }> {
    const result = await this.findAllArticlesRepository();
    if (isOk(result)) {
      const { articles, count } = unwrapOk(result);
      return { articles, count };
    } else {
      console.error(unwrapErr(result));
      return { articles: [], count: 0 };
    }
  }
}

export const useTagsStore = (findAllArticlesRepository: FindAllArticles) => {
  const store = useMemo(() => ArticlesStore.factory(findAllArticlesRepository), [findAllArticlesRepository]);

  return { store };
};
