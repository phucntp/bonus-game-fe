const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const lookup = new Uint8Array(256);
for (let i = 0; i < CHARS.length; i += 1) {
  lookup[CHARS.charCodeAt(i)] = i;
}

export const fileToToBase64 = (blob: Blob) => {
  const fileReader = new FileReader();
  return new Promise<string>((resolver) => {
    fileReader.onload = (e) => {
      if (e.target) {resolver(e.target.result as string);}
    };
    fileReader.readAsDataURL(blob);
  });
};

export const arrayBufferToBase64 = (arraybuffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(arraybuffer);
  let i;
  const len = bytes.length;
  let base64 = '';

  for (i = 0; i < len; i += 3) {
    base64 += CHARS[bytes[i] >> 2];
    base64 += CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += CHARS[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = `${base64.substring(0, base64.length - 1)}=`;
  } else if (len % 3 === 1) {
    base64 = `${base64.substring(0, base64.length - 2)}==`;
  }

  return base64;
};

export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  let bufferLength = base64.length * 0.75;
  const len = base64.length;
  let i;
  let p = 0;
  let encoded1;
  let encoded2;
  let encoded3;
  let encoded4;

  if (base64[base64.length - 1] === '=') {
    bufferLength -= 1;
    if (base64[base64.length - 2] === '=') {
      bufferLength -= 1;
    }
  }

  const arraybuffer = new ArrayBuffer(bufferLength);
  const bytes = new Uint8Array(arraybuffer);

  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];

    bytes[(p += 1)] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[(p += 1)] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[(p += 1)] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return arraybuffer;
};
