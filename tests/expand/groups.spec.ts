import expand from '../../src';

describe('groups', () => {
  it('should expand groups', () => {
    const result = expand('(a|b)').sort();

    expect(result).toEqual(['a', 'b'].sort());
  });

  it('should expand optional groups', () => {
    const result = expand('(a|b)?').sort();

    expect(result).toEqual(['a', 'b', ''].sort());
  });

  it('should expand single-option groups', () => {
    const result = expand('(a)').sort();

    expect(result).toEqual(['a'].sort());
  });

  it('should expand single-option groups with optional characters', () => {
    const result = expand('(ab)?').sort();

    expect(result).toEqual(['ab', ''].sort());
  });

  it('should expand nested groups', () => {
    const result = expand('(a(b|c))').sort();

    expect(result).toEqual(['ab', 'ac'].sort());
  });
});
