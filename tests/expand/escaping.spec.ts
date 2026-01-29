import { escapableTokenTypes, tokenDefinitions } from '../../src/lexer';

import expand from '../../src';

describe('escaping', () => {
  it('should escape escaped tokens', () => {
    // Build the test pattern from tokenDefinitions
    const escapablePatterns = tokenDefinitions
      .filter((def) => escapableTokenTypes.includes(def.type))
      .map((def) => `\\${def.pattern}`)
      .join('');

    const expectedPatterns = tokenDefinitions
      .filter((def) => escapableTokenTypes.includes(def.type))
      .map((def) => def.pattern)
      .join('');

    const result = expand(escapablePatterns).sort();
    expect(result).toEqual([expectedPatterns].sort());
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
