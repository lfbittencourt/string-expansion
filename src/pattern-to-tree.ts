import Lexer from './lexer';
import Parser from './parser';

const lexer = new Lexer();
const parser = new Parser();

export = (pattern: string) => {
  const tokens = lexer.tokenize(pattern);
  const tree = parser.parse(tokens);

  return tree;
};
