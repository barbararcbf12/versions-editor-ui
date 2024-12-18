import { compareVersions } from "../compareVersions";

describe('compareVersions', () => {
  it('should return 0 when versions are equal', () => {
    expect(compareVersions("1.1.1", "1.1.1")).toBe(0);
    expect(compareVersions("999.999.999", "999.999.999")).toBe(0);
    expect(compareVersions("0.0.0", "0.0.0")).toBe(0);
  });

  it('should return 1 when the first version is greater', () => {
    expect(compareVersions("1.1.2", "1.1.1")).toBe(1);
    expect(compareVersions("1.11.111", "1.11.110")).toBe(1);
    expect(compareVersions("999.10.0", "998.999.999")).toBe(1);
    expect(compareVersions("10.100.1", "10.100.0")).toBe(1);
  });

  it('should return -1 when the first version is smaller', () => {
    expect(compareVersions("1.1.1", "1.1.2")).toBe(-1);
    expect(compareVersions("1.11.110", "1.11.111")).toBe(-1);
    expect(compareVersions("998.999.999", "999.10.0")).toBe(-1);
    expect(compareVersions("10.100.0", "10.100.1")).toBe(-1);
  });

  it('should handle versions with varying digit lengths correctly', () => {
    expect(compareVersions("1.1.1", "1.10.1")).toBe(-1); // "001001001" < "001010001"
    expect(compareVersions("1.10.1", "1.1.1")).toBe(1);  // "001010001" > "001001001"
    expect(compareVersions("123.45.6", "123.45.7")).toBe(-1);
    expect(compareVersions("123.45.7", "123.45.6")).toBe(1);
  });

  it('should handle edge cases correctly', () => {
    expect(compareVersions("0.0.0", "0.0.1")).toBe(-1); // "000000000" < "000000001"
    expect(compareVersions("0.0.1", "0.0.0")).toBe(1);  // "000000001" > "000000000"
    expect(compareVersions("1.0.0", "1.0.1")).toBe(-1); // "001000000" < "001000001"
    expect(compareVersions("1.0.1", "1.0.0")).toBe(1);  // "001000001" > "001000000"
  });

  it('should handle large versions correctly', () => {
    expect(compareVersions("999.999.999", "998.999.999")).toBe(1);
    expect(compareVersions("998.999.999", "999.999.999")).toBe(-1);
  });
});
