import { mapErr } from '@kaave/result';
import type { Result } from '@kaave/result';
import type { Tag } from '@contexts/common/domains/valueObjects/tag';
import type { FindAllTags } from '../../../../externals/repositories/findAllTags';

export type LoadAllTagsUsecase = () => Promise<Result<Tag[], { message: string }>>;

export const loadAllTagsUsecaseFactory = (repository: FindAllTags): LoadAllTagsUsecase => async () => {
  const result = await repository();
  // エラーの場合のみ、Usecase が整理し直してあげる
  return mapErr(result, ({ message }) => ({ message }));
};
