import type { Result } from '@kaave/result';

export type FindAllTagsDriver = () => Promise<Result<string[], { error: Error }>>;
