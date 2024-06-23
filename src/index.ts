import expandTree from './expand-tree';
import patternToTree from './pattern-to-tree';

export = (pattern: string) => expandTree(patternToTree(pattern));
