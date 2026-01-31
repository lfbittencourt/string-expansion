import { TokenType } from '../src/lexer';

import Lexer from '../src/lexer';

const lexer = new Lexer();

describe('lexer', () => {
  describe('tokenization', () => {
    it('should tokenize text', () => {
      const tokens = lexer.tokenize('abc');

      expect(tokens).toEqual([
        { type: TokenType.TEXT, value: 'abc', position: 0 },
        { type: TokenType.EOF, value: '', position: 3 },
      ]);
    });

    it('should tokenize special characters', () => {
      expect(lexer.tokenize('(')[0]).toEqual(
        { type: TokenType.LEFT_PAREN, value: '(', position: 0 },
      );
      expect(lexer.tokenize(')')[0]).toEqual(
        { type: TokenType.RIGHT_PAREN, value: ')', position: 0 },
      );
      expect(lexer.tokenize('?')[0]).toEqual(
        { type: TokenType.QUESTION_MARK, value: '?', position: 0 },
      );
      expect(lexer.tokenize('|')[0]).toEqual(
        { type: TokenType.PIPE, value: '|', position: 0 },
      );
      expect(lexer.tokenize('+')[0]).toEqual(
        { type: TokenType.PLUS_SIGN, value: '+', position: 0 },
      );
      expect(lexer.tokenize('\\')[0]).toEqual(
        { type: TokenType.BACKSLASH, value: '\\', position: 0 },
      );
    });

    it('should tokenize a complete pattern', () => {
      const tokens = lexer.tokenize('ab?(c|d)');

      expect(tokens).toEqual([
        { type: TokenType.TEXT, value: 'ab', position: 0 },
        { type: TokenType.QUESTION_MARK, value: '?', position: 2 },
        { type: TokenType.LEFT_PAREN, value: '(', position: 3 },
        { type: TokenType.TEXT, value: 'c', position: 4 },
        { type: TokenType.PIPE, value: '|', position: 5 },
        { type: TokenType.TEXT, value: 'd', position: 6 },
        { type: TokenType.RIGHT_PAREN, value: ')', position: 7 },
        { type: TokenType.EOF, value: '', position: 8 },
      ]);
    });

    it('should end with a single EOF token', () => {
      const tokens = lexer.tokenize('abc');
      const eofTokens = tokens.filter((t) => t.type === TokenType.EOF);

      expect(eofTokens).toHaveLength(1);
      expect(tokens[tokens.length - 1].type).toBe(TokenType.EOF);
    });

    it('should track token positions', () => {
      const tokens = lexer.tokenize('a(b|c)');

      expect(tokens.map((t) => t.position)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
  });

  describe('errors', () => {
    it('should throw on unsupported characters', () => {
      expect(() => lexer.tokenize('ax-by')).toThrow(
        "Unexpected character '-' at position 2",
      );
    });
  });
});
