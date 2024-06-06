import expand from '../src';

describe('extra', () => {
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
