import { err, isOk, map } from '@kaave/result';
import type { Result } from '@kaave/result';
import type { Tag } from '@contexts/common/domains/valueObjects/tag';
import type { FindAllTagsDriver } from '../../drivers/findAllTags';

export type FindAllTags = () => Promise<Result<Tag[], { type: number; message: string }>>;

export const findAllTagsFactory = (driver: FindAllTagsDriver): FindAllTags => async () => {
  const result = await driver();

  return isOk(result)
    ? map(result, ({ tags }) => tags.map((tag) => tag.trim() as Tag).filter((tag) => tag.length > 0))
    : err({ type: 0, message: 'エラーは端折っています' });
};
