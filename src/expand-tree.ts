import { And, LogicalChild, Or } from './logical';


export default function expandTree(tree: LogicalChild): string[] {
  if (typeof tree === 'string') {
    return [tree];
  }

  if (tree instanceof And) {
    let results = [''];

    tree.children.forEach((child) => {
      const childResults = expandTree(child);
      const newResults: string[] = [];

      results.forEach((result) => {
        childResults.forEach((cr) => {
          newResults.push(result + cr);
        });
      });

      results = newResults;
    });

    return results;
  }

  if (tree instanceof Or) {
    let results: string[] = [];

    tree.children.forEach((child) => {
      const childResults = expandTree(child);

      results = results.concat(childResults);
    });

    return results;
  }

  throw new Error('Unsupported type');
}
