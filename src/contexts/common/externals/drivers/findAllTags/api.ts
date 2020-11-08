import { ENDPOINT } from '@lib/constants/configs';
import { err, ok } from '@kaave/result';
import { UnwrapPromise } from '@lib/utils/types/utils/UnwrapPromise';
import { f } from '@lib/utils/f';
import type { UnwrapOk } from '@kaave/result';
import type { FindAllTagsDriver } from '.';

type Res = UnwrapOk<UnwrapPromise<ReturnType<FindAllTagsDriver>>>;

export const findAllTagsFromApi: FindAllTagsDriver = async () => {
  try {
    return ok(await f<Res>(`${ENDPOINT}/tags`));
  } catch (error) {
    return err({ error: error as Error });
  }
};
