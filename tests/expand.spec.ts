import expand from '../src';

describe('expand', () => {
  it('should expand optional characters', () => {
    const result = expand('ab?').sort();

    expect(result).toEqual(['a', 'ab'].sort());
  });

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

  it('should expand complex patterns', () => {
    const result = expand('Mary( Eli(z|s)abeth)?( Simmons)? Smith(son)?').sort();

    expect(result).toEqual([
      'Mary Elizabeth Simmons Smithson',
      'Mary Elizabeth Simmons Smith',
      'Mary Elizabeth Smithson',
      'Mary Elizabeth Smith',
      'Mary Elisabeth Simmons Smithson',
      'Mary Elisabeth Simmons Smith',
      'Mary Elisabeth Smithson',
      'Mary Elisabeth Smith',
      'Mary Simmons Smithson',
      'Mary Simmons Smith',
      'Mary Smithson',
      'Mary Smith',
    ].sort());
  });
});
