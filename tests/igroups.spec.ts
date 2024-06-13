import expand from '../src';

describe('inclusive groups', () => {
  it('should expand inclusive groups', () => {
    const result = expand('(+a|b)').sort();

    expect(result).toEqual(['a', 'b', 'ab'].sort());
  });

  it('should expand optional inclusive groups', () => {
    const result = expand('(+a|b)?').sort();

    expect(result).toEqual(['a', 'b', 'ab', ''].sort());
  });

  it('should not expand single-option inclusive groups', () => {
    const result = expand('(+a)').sort();

    expect(result).toEqual(['a'].sort());
  });

  it('should expand nested inclusive groups', () => {
    const result = expand('(+a|(+b|c))').sort();

    expect(result).toEqual(['a', 'ab', 'abc', 'ac', 'b', 'bc', 'c'].sort());
  });
});
