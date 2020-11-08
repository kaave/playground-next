import type { Result } from '@kaave/result';

export type FindAllTagsDriver = () => Promise<Result<{ tags: string[] }, { error: Error }>>;
