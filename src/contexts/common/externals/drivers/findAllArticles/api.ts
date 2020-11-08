import { ENDPOINT } from '@lib/constants/configs';
import { err, ok, UnwrapOk } from '@kaave/result';
import type { UnwrapPromise } from '@lib/utils/types/utils/UnwrapPromise';
import { f } from '@lib/utils/f';
import type { FindAllArticlesDriver } from '.';

type Res = UnwrapOk<UnwrapPromise<ReturnType<FindAllArticlesDriver>>>;

export const findAllArticlesFromApi: FindAllArticlesDriver = async () => {
  try {
    return ok(await f<Res>(`${ENDPOINT}/articles`));
  } catch (error) {
    return err({ error: error as Error });
  }
};
