import { ENDPOINT } from '@lib/constants/configs';
import { err, ok } from '@kaave/result';
import type { FindAllTagsDriver } from '.';

export const findAllTagsFromApi: FindAllTagsDriver = async () => {
  try {
    const response = await fetch(`${ENDPOINT}/tags`);
    if (response.ok) {
      const { tags } = (await response.json()) as { tags: string[] };
      return ok(tags);
    } else {
      // response.status;
      // @TODO 手抜き status 見て個別のエラー返すと良い
      return err({ error: new Error(response.statusText) });
    }
  } catch (error) {
    return err({ error: error as Error });
  }
};
