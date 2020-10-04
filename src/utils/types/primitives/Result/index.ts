type ValidUnion = string | number | boolean | symbol | BigInt | ((...args: any[]) => any);
export type OkValue =
  | ValidUnion
  | ReadonlyArray<OkValue>
  | { [K in string | number | symbol]?: OkValue }
  | undefined
  | null;
export type ErrValue = ValidUnion | ReadonlyArray<ErrValue> | { [K in string | number | symbol]?: ErrValue };

export type Ok<T extends OkValue> = { readonly type: 'ok'; readonly value: T };
export type Err<E extends ErrValue> = { readonly type: 'err'; readonly error: E };

/*
 * TODO: ExtractOks が壊れる
 *       OkValue ではないもの（class {} とか）を渡すと怒られるが、意図は組めてるため一旦妥協
 */
// export type Result<T extends OkValue, E extends ErrValue> = Ok<T> | Err<E>;
export type Result<T, E extends ErrValue> = Ok<T> | Err<E>;

export type ExtractOk<T extends Result<O, E>, O extends OkValue, E extends ErrValue> = T extends Ok<infer P>
  ? Ok<P>
  : never;
export type ExtractErr<T extends Result<O, E>, O extends OkValue, E extends ErrValue> = T extends Err<infer E>
  ? Err<E>
  : never;
export type ExtractOks<T extends ReadonlyArray<Result<OkValue, ErrValue>>> = {
  [K in keyof T]: T[K] extends Result<infer P, ErrValue> ? (P extends OkValue ? Ok<P> : never) : never;
};
export type ExtractErrs<T extends ReadonlyArray<Result<OkValue, ErrValue>>> = {
  [K in keyof T]: T[K] extends Result<OkValue, infer E> ? Err<E> : never;
};

export const createOk = <T extends OkValue>(value: T): Ok<T> => ({ type: 'ok', value });
export const createErr = <T extends ErrValue>(error: T): Err<T> => ({ type: 'err', error });

export const isOk = <T extends OkValue, E extends ErrValue>(r: Result<T, E>): r is Ok<T> => r.type === 'ok';
export const isErr = <T extends OkValue, E extends ErrValue>(r: Result<T, E>): r is Err<E> => r.type === 'err';
export const isEveryOk = <T extends Result<O, E>[], O extends OkValue, E extends ErrValue>(t: T): t is ExtractOks<T> =>
  t.every((r) => isOk(r));

/**
 * @FIXME わからん
 * A type predicate's type must be assignable to its parameter's type.
 * Type 'ExtractErrs<T>' is not assignable to type 'T'.
 * 'ExtractErrs<T>' is assignable to the constraint of type 'T',
 * but 'T' could be instantiated with a different subtype of constraint 'Result<ValidValue, Error>[]'.
 * Type 'T[K] extends Result<ValidValue, infer E> ? Err<E> : never' is not assignable to type 'T[K]'.
 * Type 'Err<Error>' is not assignable to type 'T[K]'.ts(2677)
 */
// export const isEveryErr = <T extends Result<ValidValue, ResultValue>[]>(t: T): t is ExtractErrs<T> =>
//   t.every((r) => isErr(r));
// export const byErr = <E extends ResultValue, T extends Result<ValidValue, E>>(t: T): t is Err<E> => isErr(t);

export const unwrapOk = <T extends OkValue>({ value }: Ok<T>) => value;
export const unwrapErr = <E extends ErrValue>({ error }: Err<E>) => error;
export const unwrapOr = <T extends OkValue, E extends ErrValue>(r: Result<T, E>, fallback: T): T =>
  isOk(r) ? r.value : fallback;

/**
 * @deprecated unwrapOk, unwrapErr, unwrapOr のいずれかを使用するべき
 */
export const unwrap = <T extends OkValue, E extends ErrValue>(r: Result<T, E>) => {
  if (isErr(r)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Not Ok result. [${r.error}]`);
  }

  return r.value;
};
