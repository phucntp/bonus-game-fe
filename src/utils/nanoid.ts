import { customAlphabet } from 'nanoid';

const customNanoId = customAlphabet('abcdf0123456789', 5);

export const nanoId = (size?: number) => {
  return customNanoId(size);
};
