/* eslint-disable max-classes-per-file */
export class AbortError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = 'AbortError';
  }
}

// @TODO AbortController にしたいが、IE や Test の際にしんどい
export class CancelController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private emit = () => {};
  abort = () => this.emit();
  waitAbort = (messageOnCancel?: string) =>
    // eslint-disable-next-line no-return-assign
    new Promise<never>((_, reject) => (this.emit = () => reject(new AbortError(messageOnCancel))));
}
