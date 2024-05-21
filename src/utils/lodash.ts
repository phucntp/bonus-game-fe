import _ from 'lodash';

export function diffBy<T1, T2>(
  array1: T1[],
  array2: T2[],
  map: (item: T1 | T2) => string | number,
): boolean {
  return _.intersectionBy(array1, array2, map).length > 0;
}

export const urlJoin = (...parts: (string | number | undefined)[]) => {
  return parts
    .filter(Boolean)
    .join('/')
    .replace(/(?<!:)\/{2,}/g, '/')
    .replace(/\/*$/, '');
};
