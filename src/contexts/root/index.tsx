import React, { useCallback, useEffect, useReducer } from 'react';
import type { ReducerState } from 'react';

import { findAllTagsFactory } from '@contexts/common/externals/repositories/findAllTags';
import { findAllTagsFromApi } from '@contexts/common/externals/drivers/findAllTags/api';
import { loadAllTagsUsecaseFactory } from '@contexts/common/applications/usecases/Tag/loadAllTags';
import { isOk, unwrapErr, unwrapOk } from '@kaave/result';
import { RootTemplate } from './presentations/templates/Root';
import { initialState as originInitialState, reducer } from './presentations/templates/Root/viewModel';
import type { UseRootViewModel } from './presentations/templates/Root/viewModel';

/*
 * factory
 */
type InitialState = Partial<ReducerState<typeof reducer>>;
const repository = findAllTagsFactory(findAllTagsFromApi);
const usecase = loadAllTagsUsecaseFactory(repository);

function useRootViewModel(initialState: InitialState): ReturnType<UseRootViewModel> {
  const [state, dispatch] = useReducer(reducer, { ...originInitialState, ...initialState });

  const loadTags = useCallback(async () => {
    dispatch({ type: 'Tags.Load::Started' });
    const result = await usecase();

    if (isOk(result)) {
      dispatch({ type: 'Tags.Load::Succeeded', payload: { tags: unwrapOk(result) } });
    } else {
      const { message } = unwrapErr(result);
      dispatch({ type: 'Tags.Load::Failed', payload: { message } });
      console.error(message);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await loadTags();
    })();
  }, [loadTags]);

  return {
    ...state,
  };
}

type Props = InitialState;

export const RootPage = (props: Props) => {
  const { tags } = useRootViewModel(props);
  return <RootTemplate tags={tags} />;
};
