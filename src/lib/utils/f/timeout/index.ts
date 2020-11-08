export class TimeoutError extends Error {
  constructor(public readonly timeoutMs: number) {
    super(`Operation timed out after ${timeoutMs} ms`);
  }
}

// この Promise が resolve されたら TimeoutError を reject で投げる
export async function timeout(timeoutMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeoutMs)).then(() =>
    Promise.reject(new TimeoutError(timeoutMs)),
  );
}
