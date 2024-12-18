import { isWithinRange } from "../isWithinRange";

describe('isWithinRange', () => {
  it('should return true for a value within an inclusive range', () => {
    expect(isWithinRange('1.1.1', '1.1.0', '1.1.2', true, true)).toBe(true);
    expect(isWithinRange('1.1.0', '1.1.0', '1.1.2', true, true)).toBe(true);
    expect(isWithinRange('1.1.2', '1.1.0', '1.1.2', true, true)).toBe(true);
  });

  it('should return false for a value outside an inclusive range', () => {
    expect(isWithinRange('1.1.3', '1.1.0', '1.1.2', true, true)).toBe(false);
    expect(isWithinRange('1.0.9', '1.1.0', '1.1.2', true, true)).toBe(false);
  });

  it('should return true for a value within an exclusive range', () => {
    expect(isWithinRange('1.1.1', '1.1.0', '1.1.2', false, false)).toBe(true);
  });

  it('should return false for a value outside an exclusive range', () => {
    expect(isWithinRange('1.1.0', '1.1.0', '1.1.2', false, false)).toBe(false);
    expect(isWithinRange('1.1.2', '1.1.0', '1.1.2', false, false)).toBe(false);
  });

  it('should return true for a value within a mixed inclusive/exclusive range', () => {
    expect(isWithinRange('1.1.0', '1.1.0', '1.1.2', true, false)).toBe(true);
    expect(isWithinRange('1.1.1', '1.1.0', '1.1.2', true, false)).toBe(true);
  });

  it('should return false for a value outside a mixed inclusive/exclusive range', () => {
    expect(isWithinRange('1.1.2', '1.1.0', '1.1.2', true, false)).toBe(false);
    expect(isWithinRange('1.1.3', '1.1.0', '1.1.2', true, false)).toBe(false);
  });

  it('should work with single-point ranges', () => {
    expect(isWithinRange('1.1.1', '1.1.1', '1.1.1', true, true)).toBe(true); // Exactly matches
    expect(isWithinRange('1.1.2', '1.1.1', '1.1.1', true, true)).toBe(false); // Outside range
  });
});
