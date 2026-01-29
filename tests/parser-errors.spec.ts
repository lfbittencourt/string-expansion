import expand from '../src';

describe('Parser errors', () => {
  it('should throw error on unclosed group', () => {
    expect(() => expand('(a|b')).toThrow('Parsing error detected!');
    expect(() => expand('(a|b')).toThrow('Expected RIGHT_PAREN');
  });

  it('should throw error on unexpected closing paren', () => {
    expect(() => expand('a)')).toThrow('Parsing error detected!');
    expect(() => expand('a)')).toThrow('Expected end of input');
  });

  it('should throw error on invalid escape sequence', () => {
    expect(() => expand('\\a')).toThrow('Parsing error detected!');
    expect(() => expand('\\a')).toThrow('Expected escapable character after backslash');
  });

  it('should throw error on empty group', () => {
    expect(() => expand('()')).toThrow('Parsing error detected!');
  });

  it('should throw error on trailing pipe', () => {
    expect(() => expand('(a|)')).toThrow('Parsing error detected!');
  });

  it('should include position information in errors', () => {
    try {
      expand('ab(cd');
    } catch (error) {
      expect((error as Error).message).toMatch(/position/i);
    }
  });

  it('should throw error on unclosed nested group', () => {
    expect(() => expand('(a(b|c)')).toThrow('Parsing error detected!');
    expect(() => expand('(a(b|c)')).toThrow('Expected RIGHT_PAREN');
  });
});
