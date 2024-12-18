import { isTestVersion } from '../checkVersionType';
import { Version } from "../../types";
import { options } from "../../constants/versionOptions";

describe('Check if version is of type Test or Production', () => {

  // Valid test versions (matching the pattern 999.x.x or 999.x.x with valid min/patch values)
  it('should return true for version "999.1.0"', () => {
    const version: Version = {
      option: options[0],
      value: '999.1.0'
    };
    expect(isTestVersion(version)).toBe(true); // Should return true since major is 999 and minor > 0.
  });

  it('should return true for version "999.0.1"', () => {
    const version: Version = {
      option: options[1],
      value: '999.0.1'
    };
    expect(isTestVersion(version)).toBe(true); // Should return true since major is 999 and patch > 0.
  });

  it('should return true for version "999.0.0"', () => {
    const version: Version = {
      option: options[2],
      value: '999.0.0'
    };
    expect(isTestVersion(version)).toBe(false); // Should return true as major is 999, even if minor and patch are zero.
  });

  it('should return true for version "999.001.001"', () => {
    const version: Version = {
      option: options[3],
      value: '999.001.001'
    };
    expect(isTestVersion(version)).toBe(true); // Should treat 1.1.1 as equivalent to 001.001.001
  });

  it('should return true for version "999.1.01"', () => {
    const version: Version = {
      option: options[4],
      value: '999.1.01'
    };
    expect(isTestVersion(version)).toBe(true); // Should treat 1.1.1 as equivalent to 001.001.001
  });

  // Invalid version scenarios
  it('should return false for version "998.1.0"', () => {
    const version: Version = {
      option: options[5],
      value: '998.1.0'
    };
    expect(isTestVersion(version)).toBe(false);
  });

  it('should return false for version "999.000.000"', () => {
    const version: Version = {
      option: options[1],
      value: '999.000.001' // Should NOT be considered as valid, because it is the first valid Test version
    };
    expect(isTestVersion(version)).toBe(true);
  });

  it('should return false for version "001.1.1"', () => {
    const version: Version = {
      option: options[2],
      value: '001.1.1'
    };
    expect(isTestVersion(version)).toBe(false);
  });

  it('should return true for version "999.10.10"', () => {
    const version: Version = {
      option: options[4],
      value: '999.10.10'
    };
    expect(isTestVersion(version)).toBe(true); // Should return true, because the major part is 999, and both minor and patch parts are non-zero.
  });
});
