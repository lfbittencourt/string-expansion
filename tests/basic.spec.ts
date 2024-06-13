import expand from '../src';

describe('basic', () => {
  it('should expand literal strings', () => {
    const result = expand('a');

    expect(result).toEqual(['a']);
  });

  it('should expand optional characters', () => {
    const result = expand('ab?').sort();

    expect(result).toEqual(['a', 'ab'].sort());
  });
});
