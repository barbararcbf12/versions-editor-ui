import { convertStringToNumeric } from "../convertStringToNumeric";

describe('convertStringToNumeric', () => {
  it('should convert "1.1.1" to "001001001"', () => {
    expect(convertStringToNumeric("1.1.1")).toBe("001001001");
  });

  it('should convert "1.11.111" to "001011111"', () => {
    expect(convertStringToNumeric("1.11.111")).toBe("001011111");
  });

  it('should convert "999.0.11" to "999000011"', () => {
    expect(convertStringToNumeric("999.0.11")).toBe("999000011");
  });

  it('should convert "0.0.0" to "000000000"', () => {
    expect(convertStringToNumeric("0.0.0")).toBe("000000000");
  });

  it('should convert "123.45.6" to "123045006"', () => {
    expect(convertStringToNumeric("123.45.6")).toBe("123045006");
  });

  it('should convert "10.100.1" to "010100001"', () => {
    expect(convertStringToNumeric("10.100.1")).toBe("010100001");
  });

  it('should convert "1.0.0" to "001000000"', () => {
    expect(convertStringToNumeric("1.0.0")).toBe("001000000");
  });

  it('should handle single-digit numbers correctly, like "2.2.2"', () => {
    expect(convertStringToNumeric("2.2.2")).toBe("002002002");
  });

  it('should handle the largest valid version like "999.999.999"', () => {
    expect(convertStringToNumeric("999.999.999")).toBe("999999999");
  });
});