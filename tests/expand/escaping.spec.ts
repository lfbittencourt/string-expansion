import { escapableTokenTypes, TokenType } from '../../src/lexer';

import expand from '../../src';

// Map TokenType to actual character pattern
const tokenTypeToPattern: Record<TokenType, string> = {
  [TokenType.BACKSLASH]: '\\',
  [TokenType.LEFT_PAREN]: '(',
  [TokenType.RIGHT_PAREN]: ')',
  [TokenType.PIPE]: '|',
  [TokenType.PLUS_SIGN]: '+',
  [TokenType.QUESTION_MARK]: '?',
  [TokenType.TEXT]: '',
  [TokenType.EOF]: '',
};

describe('escaping', () => {
  it('should escape escaped tokens', () => {
    const result = expand(escapableTokenTypes.map((type) => `\\${tokenTypeToPattern[type]}`).join('')).sort();

    expect(result).toEqual([escapableTokenTypes.map((type) => tokenTypeToPattern[type]).join('')].sort());
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
