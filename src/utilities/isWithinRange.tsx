import { compareVersions } from "./compareVersions";

export function isWithinRange(value: string, rangeStart: string, rangeEnd: string, inclusiveStart: boolean, inclusiveEnd: boolean): boolean {
  const lowerBound = inclusiveStart ? compareVersions(value, rangeStart) >= 0 : compareVersions(value, rangeStart) > 0;
  const upperBound = inclusiveEnd ? compareVersions(value, rangeEnd) <= 0 : compareVersions(value, rangeEnd) < 0;
  return lowerBound && upperBound;
}