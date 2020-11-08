import type { Context, Reducer } from 'react';
import type { Article } from '@contexts/common/domains/valueObjects/article';

type Action =
  | { type: 'Articles.Load::Started' }
  | { type: 'Articles.Load::Succeeded'; payload: { articles: Article[]; count: number } }
  | { type: 'Articles.Load::Failed'; payload: { message: string } };

type State = Readonly<{ articles: Article[]; count: number; loading: boolean; message?: string }>;

export const reducer: Reducer<State, Action> = (state, action) => {
  const { message, ...prevState } = state;
  console.log(action);

  switch (action.type) {
    case 'Articles.Load::Started':
      return { ...prevState, loading: true };
    case 'Articles.Load::Succeeded':
      return { ...prevState, loading: false, articles: action.payload.articles, count: action.payload.count };
    case 'Articles.Load::Failed':
      return { ...prevState, loading: false, message: action.payload.message };
    default:
      return state;
  }
};

export const initialState: State = { articles: [], count: 0, loading: false };

export type UseRootViewModel = () => { articles: readonly Article[]; count: number };

export type UseRootViewModelContext = Context<UseRootViewModel>;
