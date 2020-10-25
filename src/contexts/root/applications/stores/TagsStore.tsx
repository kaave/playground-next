import { useMemo } from 'react';

import type { Tag } from '@contexts/common/domains/valueObjects/tag';
import type { FindAllTags } from '@contexts/common/externals/repositories/findAllTags';
import { isOk, unwrapErr, unwrapOk } from '@kaave/result';

class TagsStore {
  private tags: readonly Tag[] = [];

  constructor(private readonly findAllTagsRepository: FindAllTags) {}

  public static factory(findAllTagsRepository: FindAllTags) {
    return new TagsStore(findAllTagsRepository);
  }

  public async findAllTags(): Promise<readonly Tag[]> {
    const result = await this.findAllTagsRepository();
    if (isOk(result)) {
      this.tags = unwrapOk(result);
      return this.tags;
    } else {
      console.error(unwrapErr(result));
      return [];
    }
  }
}

export const useTagsStore = (findAllTagsRepository: FindAllTags) => {
  const store = useMemo(() => TagsStore.factory(findAllTagsRepository), [findAllTagsRepository]);

  return { store };
};
