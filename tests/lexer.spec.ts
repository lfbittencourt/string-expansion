import Lexer from '../src/lexer';

const lexer = new Lexer();

describe('lexer', () => {
  describe('errors', () => {
    it('should throw on unsupported characters', () => {
      expect(() => lexer.tokenize('ax-by')).toThrow(
        "Unexpected character '-' at position 2",
      );
    });
  });
});
