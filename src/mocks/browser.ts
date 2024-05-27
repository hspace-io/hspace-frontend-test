import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export type BaseUrlType<T extends string> = `https://test.hspace.io/api/${T extends `/${infer R}` ? R : T}`;

export function hspace<T extends string>(uri: T) {
  return `https://test.hspace.io/api/${uri.replace(/^\//, '')}` as BaseUrlType<T>;
}

export const worker = setupWorker(...handlers);
