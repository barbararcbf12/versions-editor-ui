import { findConflicts } from '../findConflicts';
import { options } from "../../constants/versionOptions";
import type { Version } from "../../types";


// Helper function to create a version
const createVersion = (optionId: number, value: string) => {
  return {
    option: options.find(option => option.id === optionId)!,
    value,
  };
};

describe('findConflicts', () => {

  it('should find conflicts between two overlapping version ranges', () => {
    const versions = [
      createVersion(2, '1.2.3'),
      createVersion(4, '1.3.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // Expecting both versions to be in conflict
  });

  it('should not find conflicts when the ranges do not overlap', () => {
    const versions = [
      createVersion(4, '1.2.3'),
      createVersion(3, '2.0.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(0); // No conflict between these ranges
  });

  it('should find conflicts for a "between" operator', () => {
    const versions = [
      createVersion(6, '1.2.3 - 2.0.0'),
      createVersion(7, '1.5.0 - 1.8.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // The version ranges overlap
  });

  it('should handle "equal to" operator correctly and find conflict', () => {
    const versions = [
      createVersion(1, '1.2.3'),
      createVersion(3, '1.2.3'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // The equal to range conflicts with the greater than range
  });

  it('should handle versions with "less than" correctly and find conflict', () => {
    const versions = [
      createVersion(4, '1.5.0'),
      createVersion(5, '1.8.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // The less than versions overlap
  });

  it('should find conflict if one version is strictly greater than another', () => {
    const versions = [
      createVersion(2, '1.0.0'),
      createVersion(4, '2.0.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // No conflict between these ranges
  });

  it('should handle version ranges that are fully overlapping', () => {
    const versions = [
      createVersion(6, '1.0.0 - 2.0.0'),
      createVersion(6, '1.5.0 - 2.5.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // Full overlap in version ranges
  });

  it('should handle an empty input gracefully', () => {
    const versions: Version[] = [];
    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(0); // No conflicts when no versions are provided
  });

  it('should handle a single version without any conflicts', () => {
    const versions = [
      createVersion(2, '1.2.3'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(0); // No conflicts with just one version
  });

  it('should identify conflicting ranges with a mix of inclusive and exclusive boundaries', () => {
    const versions = [
      createVersion(6, '1.0.0 - 2.0.0'),
      createVersion(8, '1.5.0 - 2.0.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // Overlapping ranges with mixed inclusivity
  });

  it('should correctly handle "between" range with open bounds', () => {
    const versions = [
      createVersion(7, '1.2.0 - 2.0.0'),
      createVersion(8, '1.0.0 - 1.8.0'),
    ];

    const conflicts = findConflicts(versions);
    expect(conflicts).toHaveLength(2); // The ranges overlap between 1.2.0 and 1.8.0
  });
});
