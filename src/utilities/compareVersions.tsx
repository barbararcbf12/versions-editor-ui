import { convertStringToNumeric } from "./convertStringToNumeric";

export function compareVersions(a: string, b: string) {
  const numericA = convertStringToNumeric(a);
  const numericB = convertStringToNumeric(b);

  if (numericA > numericB) return 1;
  if (numericA < numericB) return -1;
  return 0;
}