import React, { useCallback, useEffect, useReducer } from 'react';
import type { ReducerState } from 'react';

import { findAllArticlesFactory } from '@contexts/common/externals/repositories/findAllArticles';
import { findAllArticlesFromApi } from '@contexts/common/externals/drivers/findAllArticles/api';
import { loadAllArticlesUsecaseFactory } from '@contexts/common/applications/usecases/Article/loadAllArticles';
import { isOk, unwrapErr, unwrapOk } from '@kaave/result';
import { ArticlesTemplate } from './presentations/templates/Articles';
import { initialState as originInitialState, reducer } from './presentations/templates/Articles/viewModel';
import type { UseRootViewModel } from './presentations/templates/Articles/viewModel';

/*
 * factory
 */
type InitialState = Partial<ReducerState<typeof reducer>>;
const repository = findAllArticlesFactory(findAllArticlesFromApi);
const usecase = loadAllArticlesUsecaseFactory(repository);

function useRootViewModel(initialState: InitialState): ReturnType<UseRootViewModel> {
  const [state, dispatch] = useReducer(reducer, { ...originInitialState, ...initialState });

  const loadArticles = useCallback(async () => {
    dispatch({ type: 'Articles.Load::Started' });
    const result = await usecase();

    if (isOk(result)) {
      const { articles, count } = unwrapOk(result);
      dispatch({ type: 'Articles.Load::Succeeded', payload: { articles, count } });
    } else {
      const { message } = unwrapErr(result);
      dispatch({ type: 'Articles.Load::Failed', payload: { message } });
      console.error(message);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await loadArticles();
    })();
    setTimeout(() => console.log(Date.now()), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state };
}

type Props = InitialState;

export const ArticlesPage = (props: Props) => {
  const { articles, count } = useRootViewModel(props);
  return <ArticlesTemplate articles={articles} count={count} />;
};
