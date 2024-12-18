import { isWithinRange } from "./isWithinRange";
import { compareVersions } from "./compareVersions";

export function rangesOverlap(
  range1: { start: string, end: string, inclusiveStart: boolean, inclusiveEnd: boolean },
  range2: { start: string, end: string, inclusiveStart: boolean, inclusiveEnd: boolean }
): boolean {
  const { start: s1, end: e1 } = range1;
  const { start: s2, end: e2, inclusiveStart: is2, inclusiveEnd: ie2 } = range2;

  const startOverlap = isWithinRange(s1, s2, e2, is2, ie2);
  const endOverlap = isWithinRange(e1, s2, e2, is2, ie2);

  const fullOverlap = compareVersions(s1, s2) <= 0 && compareVersions(e1, e2) >= 0;
  return startOverlap || endOverlap || fullOverlap;
}
