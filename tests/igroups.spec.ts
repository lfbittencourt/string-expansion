import expand from '../src';

describe('inclusive groups', () => {
  it('should expand igroups', () => {
    const result = expand('(+a|b)').sort();

    expect(result).toEqual(['a', 'b', 'ab'].sort());
  });

  it('should expand optional igroups', () => {
    const result = expand('(+a|b)?').sort();

    expect(result).toEqual(['a', 'b', 'ab', ''].sort());
  });

  it('should not expand single-option igroups', () => {
    const result = expand('(+a)').sort();

    expect(result).toEqual(['a'].sort());
  });

  it('should expand nested igroups', () => {
    const result = expand('(+a|(+b|c))').sort();

    expect(result).toEqual(['a', 'ab', 'abc', 'ac', 'b', 'bc', 'c'].sort());
  });
});
