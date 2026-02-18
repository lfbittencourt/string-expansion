import expandTree from './expand-tree';
import patternToTree from './pattern-to-tree';

export default (pattern: string) => expandTree(patternToTree(pattern));
