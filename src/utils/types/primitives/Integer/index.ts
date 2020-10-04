export type Integer = number & { readonly __integer: unique symbol };

export const isInteger = (n: number): boolean => Number.isInteger(n);
export const toInteger = (from: number): Integer => {
  if (isInteger(from)) {
    throw new TypeError(`[${from}] is NOT integer.`);
  }

  return from as Integer;
};
