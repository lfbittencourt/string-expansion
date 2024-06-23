import { Lexer } from 'chevrotain';

import Parser from './parser';
import tokens from './tokens';

const lexer = new Lexer(tokens);
const parser = new Parser();

export = (pattern: string) => {
  const lexingResult = lexer.tokenize(pattern);

  parser.input = lexingResult.tokens;

  const tree = parser.tree();

  if (parser.errors.length > 0) {
    throw new Error(
      `Parsing error detected!\n${parser.errors[0].message}`,
    );
  }

  return tree;
};
