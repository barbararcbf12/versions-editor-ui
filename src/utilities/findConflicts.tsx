import { Version } from "../types";
import { parseVersionRange } from "./parseVersionRange";
import { rangesOverlap } from "./rangesOverlap";

export function findConflicts(versions: Version[]): Version[] {
  const conflicts: Version[] = [];

  versions.forEach((v1, i) => {
    versions.slice(i + 1).forEach((v2) => {
      const range1 = parseVersionRange(v1);
      const range2 = parseVersionRange(v2);

      if (rangesOverlap(range1, range2)) {
        conflicts.push(v1, v2);
      }
    });
  });

  return conflicts;
}
