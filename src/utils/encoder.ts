import lzString from "lz-string";

export const decode = (input: string) => {
  return JSON.parse(lzString.decompressFromEncodedURIComponent(input));
};

export const encode = (input: object) => {
  return lzString.compressToEncodedURIComponent(JSON.stringify(input));
};
