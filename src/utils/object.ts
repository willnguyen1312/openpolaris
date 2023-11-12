export function collectPathsHasKey(
  obj: any,
  key: string,
  currentPath: string[] = [],
): any {
  if (typeof obj !== "object" || obj === null) {
    return [];
  }

  if (obj[key]) {
    return [currentPath];
  }

  return Object.entries(obj).flatMap(([k, v]) =>
    collectPathsHasKey(v, key, [...currentPath, k]),
  );
}
