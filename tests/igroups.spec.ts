import expand from '../src';

describe('inclusive groups', () => {
  it('should expand inclusive groups', () => {
    const result = expand('(a||b)').sort();

    expect(result).toEqual(['a', 'b', 'ab'].sort());
  });

  it('should expand optional inclusive groups', () => {
    const result = expand('(a||b)?').sort();

    expect(result).toEqual(['a', 'b', 'ab', ''].sort());
  });

  it('should expand nested inclusive groups', () => {
    const result = expand('(a(b||c))').sort();

    expect(result).toEqual(['ab', 'ac', 'abc'].sort());
  });

  it('should throw an error when mixing standard and inclusive groups', () => {
    expect(() => expand('(a|b||c)')).toThrow();
  });
});
