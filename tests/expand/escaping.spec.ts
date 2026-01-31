import expand from '../../src';

describe('escaping', () => {
  it('should escape escaped tokens', () => {
    const result = expand('\\(\\)\\?\\|\\+\\\\').sort();

    expect(result).toEqual(['()?|+\\'].sort());
  });

  it('should escape escape parenthesis', () => {
    const result = expand('(\\(\\))').sort();

    expect(result).toEqual(['()'].sort());
  });

  it('should escape pipe', () => {
    const result = expand('(\\||a)').sort();

    expect(result).toEqual(['|', 'a'].sort());
  });

  it('should escape plus sign', () => {
    const result = expand('(+\\+|a)').sort();

    expect(result).toEqual(['+', 'a', '+a'].sort());
  });

  it('should escape question mark', () => {
    const result = expand('\\??').sort();

    expect(result).toEqual(['?', ''].sort());
  });

  it('should escape backslash', () => {
    const result = expand('\\\\').sort();

    expect(result).toEqual(['\\'].sort());
  });
});
