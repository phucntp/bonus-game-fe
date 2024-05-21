export * from './money';
export * from './base64';
export * from './const';
export * from './config';
export * from './lodash';
export * from './nanoid';
export * from './is-network-error';

export function sequential<T, R>(
  items: T[],
  interator: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  return items.reduce(async (queue, item, index) => {
    const acc = await queue;
    const result = await interator(item, index);
    return acc.concat([result]);
  }, Promise.resolve([] as R[]));
}

export type UnionOmit<T, K extends string> = T extends unknown
  ? Omit<T, K>
  : never;
