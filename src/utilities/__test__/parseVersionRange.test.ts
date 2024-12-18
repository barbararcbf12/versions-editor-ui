import { Version } from "../../types";
import { options } from "../../constants/versionOptions";
import { parseVersionRange } from "../parseVersionRange";

const MAX_VERSION_VALUE = '999.999.999';
const MIN_VERSION_VALUE = '0.0.0';

describe('parseVersionRange', () => {
  it('should parse equal operator correctly', () => {
    const version: Version = { option: options[0], value: '1.1.1' };
    expect(parseVersionRange(version)).toEqual({
      start: '1.1.1',
      end: '1.1.1',
      inclusiveStart: true,
      inclusiveEnd: true,
    });
  });

  it('should parse greater than operator correctly', () => {
    const version: Version = { option: options[1], value: '1.1.1' };
    expect(parseVersionRange(version)).toEqual({
      start: '1.1.1',
      end: MAX_VERSION_VALUE,
      inclusiveStart: false,
      inclusiveEnd: false,
    });
  });

  it('should parse greater or equal operator correctly', () => {
    const version: Version = { option: options[2], value: '1.1.1' };
    expect(parseVersionRange(version)).toEqual({
      start: '1.1.1',
      end: MAX_VERSION_VALUE,
      inclusiveStart: true,
      inclusiveEnd: false,
    });
  });

  it('should parse less than operator correctly', () => {
    const version: Version = { option: options[3], value: '1.1.1' };
    expect(parseVersionRange(version)).toEqual({
      start: MIN_VERSION_VALUE,
      end: '1.1.1',
      inclusiveStart: true,
      inclusiveEnd: false,
    });
  });

  it('should parse less or equal operator correctly', () => {
    const version: Version = { option: options[4], value: '1.1.1' };
    expect(parseVersionRange(version)).toEqual({
      start: MIN_VERSION_VALUE,
      end: '1.1.1',
      inclusiveStart: true,
      inclusiveEnd: true,
    });
  });

  it('should parse between including [] correctly', () => {
    const version: Version = { option: options[5], value: '1.1.1 - 2.2.2' };
    expect(parseVersionRange(version)).toEqual({
      start: '1.1.1',
      end: '2.2.2',
      inclusiveStart: true,
      inclusiveEnd: true,
    });
  });

  it('should parse between excluding ][ correctly', () => {
    const version: Version = { option: options[6], value: '1.1.1 - 2.2.2' };
    expect(parseVersionRange(version)).toEqual({
      start: '1.1.1',
      end: '2.2.2',
      inclusiveStart: false,
      inclusiveEnd: false,
    });
  });

  it('should parse between including and excluding [[ correctly', () => {
    const version: Version = { option: options[7], value: '1.1.1 - 2.2.2' };
    expect(parseVersionRange(version)).toEqual({
      start: '1.1.1',
      end: '2.2.2',
      inclusiveStart: true,
      inclusiveEnd: false,
    });
  });

});
