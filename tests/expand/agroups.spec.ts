import expand from '../../src';

describe('additive groups', () => {
  it('should expand additive groups', () => {
    const result = expand('(+a|b)').sort();

    expect(result).toEqual(['a', 'b', 'ab'].sort());
  });

  it('should expand optional additive groups', () => {
    const result = expand('(+a|b)?').sort();

    expect(result).toEqual(['a', 'b', 'ab', ''].sort());
  });

  it('should not expand single-option additive groups', () => {
    const result = expand('(+a)').sort();

    expect(result).toEqual(['a'].sort());
  });

  it('should expand nested additive groups', () => {
    const result = expand('(+a|(+b|c))').sort();

    expect(result).toEqual(['a', 'ab', 'abc', 'ac', 'b', 'bc', 'c'].sort());
  });
});
