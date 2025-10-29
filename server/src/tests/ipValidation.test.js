import { isValidIP } from '../utils/validations.js';

describe('isValidIP', () => {
  test('returns true for valid IPv4', () => {
    expect(isValidIP('8.8.8.8')).toBe(true);
  });

  test('returns true for valid IPv6', () => {
    expect(isValidIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
  });

  test('returns false for invalid IP', () => {
    expect(isValidIP('999.999.999.999')).toBe(false);
    expect(isValidIP('test-ip')).toBe(false);
    expect(isValidIP('')).toBe(false);
    expect(isValidIP(null)).toBe(false);
    expect(isValidIP(undefined)).toBe(false);
  });
});
