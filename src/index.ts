import expandTree from './expand-tree';
import patternToTree from './pattern-to-tree';

export default function expand(pattern: string): string[] {
  return expandTree(patternToTree(pattern));
}
