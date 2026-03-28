import Lexer from './lexer';
import type { LogicalChild } from './logical';
import Parser from './parser';

const lexer = new Lexer();
const parser = new Parser();

export default function patternToTree(pattern: string): LogicalChild {
  const tokens = lexer.tokenize(pattern);
  const tree = parser.parse(tokens);

  return tree;
}
