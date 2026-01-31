import expand from '../src';

describe('parser', () => {
  describe('errors', () => {
    it('should throw error on unclosed group', () => {
      expect(() => expand('(a|b')).toThrow(/Expected RIGHT_PAREN but found EOF$/);
    });

    it('should throw error on unexpected closing paren', () => {
      expect(() => expand('a)')).toThrow(/Expected end of input$/);
    });

    it('should throw error on invalid escape sequence', () => {
      expect(() => expand('\\a')).toThrow(/Expected escapable character after backslash$/);
    });

    it('should throw error on empty group', () => {
      expect(() => expand('()')).toThrow(/Unexpected token RIGHT_PAREN .* while parsing element$/);
    });

    it('should throw error on trailing pipe', () => {
      expect(() => expand('(a|)')).toThrow(/Unexpected token RIGHT_PAREN .* while parsing element$/);
    });

    it('should include position information in errors', () => {
      expect(() => expand('ab(cd')).toThrow("Parse error at position 5: Expected RIGHT_PAREN but found EOF");
    });

    it('should throw error on unclosed nested group', () => {
      expect(() => expand('(a(b|c)')).toThrow(/Expected RIGHT_PAREN but found EOF$/);
    });
  });
});
