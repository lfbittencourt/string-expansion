import patternToTree from "../src/pattern-to-tree";

describe('pattern-to-tree', () => {
  it('single-option groups should return the option itself', () => {
    const tree = patternToTree('(a)');

    expect(tree).toEqual('a');
  });

  it('no matter how many nested groups there are', () => {
    const tree = patternToTree('(((((a)))))');

    expect(tree).toEqual('a');
  });
});
