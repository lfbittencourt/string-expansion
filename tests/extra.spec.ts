import expand from '../src';

describe('extra', () => {
  it('should expand complex patterns', () => {
    const result = expand('Mary( Eli(z|s)abeth)?(+ Simmons| Smith(son)?)').sort();

    expect(result).toEqual([
      'Mary Elisabeth Simmons',
      'Mary Elisabeth Simmons Smith',
      'Mary Elisabeth Simmons Smithson',
      'Mary Elisabeth Smith',
      'Mary Elisabeth Smithson',
      'Mary Elizabeth Simmons',
      'Mary Elizabeth Simmons Smith',
      'Mary Elizabeth Simmons Smithson',
      'Mary Elizabeth Smith',
      'Mary Elizabeth Smithson',
      'Mary Simmons',
      'Mary Simmons Smith',
      'Mary Simmons Smithson',
      'Mary Smith',
      'Mary Smithson',
    ].sort());
  });
});
