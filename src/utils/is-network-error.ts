const isError = (value: unknown) =>
  Object.prototype.toString.call(value) === '[object Error]';

const errorMessages = new Set([
  'network error', // Chrome
  'Failed to fetch', // Chrome
  'NetworkError when attempting to fetch resource.', // Firefox
  'The Internet connection appears to be offline.', // Safari 16
  'Load failed', // Safari 17+
  'Network request failed', // `cross-fetch`
  'fetch failed', // Undici (Node.js)
]);

export default function isNetworkError(error: unknown) {
  const isValid =
    error &&
    isError(error) &&
    (error as Error).name === 'TypeError' &&
    typeof (error as Error).message === 'string';

  if (!isValid) {
    return false;
  }

  // We do an extra check for Safari 17+ as it has a very generic error message.
  // Network errors in Safari have no stack.
  if ((error as Error).message === 'Load failed') {
    return (error as Error).stack === undefined;
  }

  return errorMessages.has((error as Error).message);
}
