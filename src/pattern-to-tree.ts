import Lexer from './lexer';
import Parser from './parser';

export = (pattern: string) => {
  try {
    const lexer = new Lexer();
    const tokens = lexer.tokenize(pattern);

    const parser = new Parser();
    const tree = parser.parse(tokens);

    return tree;
  } catch (error) {
    throw new Error(`Parsing error detected!\n${(error as Error).message}`);
  }
};
