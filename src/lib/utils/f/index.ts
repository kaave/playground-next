/* eslint-disable max-classes-per-file, @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-member-access */
import 'isomorphic-unfetch';
import 'abortcontroller-polyfill';

import { timeout, TimeoutError } from './timeout';

export class NetworkError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = 'NetworkError';
  }
}

export class InvalidFormatError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = 'InvalidFormatError';
  }
}

function request<T>(task: Promise<Response>): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return new Promise((resolve, reject) =>
    task
      .then(async (response) => {
        if (response.ok) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const json = await response.json().catch(() => {
            // @TODO Parse に失敗
            reject(new InvalidFormatError());
          });
          resolve(json);
        } else {
          // @TODO st別の処理
          reject(response);
        }
      })
      // @TODO エラー別の処理
      .catch((error) => {
        if (error instanceof TimeoutError) {
          reject(error);
          // } else if (error instanceof AbortError) {
        } else if (error.name === 'AbortError') {
          reject(error);
        } else {
          // 残りはネットワークがおかしいエラーのみ
          reject(new NetworkError());
        }
      }),
  );
}

type RequestInput = Parameters<typeof fetch>[0];
type RequestInit = Omit<NonNullable<Parameters<typeof fetch>[1]>, 'Accept' | 'signal'> & {
  type?: 'json' | 'text';
  timeoutMs?: number;
};
type F = <T>(input: RequestInput, init?: RequestInit) => Promise<T> & { abort: () => void };

const commonHeader = {
  json: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  text: {
    Accept: 'text/plain',
  },
} as const;

export const f: F = (input, { timeoutMs, type = 'json', ...init } = {}) => {
  const controller = new AbortController();
  const result = request(
    Promise.race([
      fetch(input, { ...init, ...commonHeader[type], signal: controller.signal }),
      ...(timeoutMs ? [timeout(timeoutMs)] : []),
    ]),
  );
  (result as any).abort = () => controller.abort();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result as any;
};
