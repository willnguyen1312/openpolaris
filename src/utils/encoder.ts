import lzString from "lz-string";

export const decode = (input: string) => {
  return JSON.parse(lzString.decompressFromEncodedURIComponent(input));
};

export const encode = (input: string) => {
  return lzString.compressToEncodedURIComponent(input);
};
