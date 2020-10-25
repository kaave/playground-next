import type { Context, Reducer } from 'react';
import type { Tag } from '@contexts/common/domains/valueObjects/tag';

type Action =
  | { type: 'Tags.Load::Started' }
  | { type: 'Tags.Load::Succeeded'; payload: { tags: Tag[] } }
  | { type: 'Tags.Load::Failed'; payload: { message: string } };

type State = Readonly<{ tags: Tag[]; loading: boolean; message?: string }>;

export const reducer: Reducer<State, Action> = (state, action) => {
  const { message, ...prevState } = state;
  console.log(action);

  switch (action.type) {
    case 'Tags.Load::Started':
      return { ...prevState, loading: true };
    case 'Tags.Load::Succeeded':
      return { ...prevState, loading: false, tags: action.payload.tags };
    case 'Tags.Load::Failed':
      return { ...prevState, loading: false, message: action.payload.message };
    default:
      return state;
  }
};

export const initialState: State = { tags: [], loading: false };

export type UseRootViewModel = () => { tags: readonly Tag[] };

export type UseRootViewModelContext = Context<UseRootViewModel>;
