import {
  And, LogicalChild, LogicalChildren, Or,
} from './logical';

import { Token, tokenDefinitions, TokenType } from './lexer';

/**
 * GRAMMAR
 *
 * element:
 *   optionableEscapedToken | optionableText | optionableGroup
 *
 * optionableEscapedToken:
 *   Backslash
 *   (Backslash | LeftParenthesis | Pipe | PlusSign | QuestionMark | RightParenthesis)
 *   (QuestionMark)?
 *
 * optionableText:
 *   Text
 *   (QuestionMark)?
 *
 * optionableGroup:
 *   LeftParenthesis
 *   (PlusSign)?
 *   tree (Pipe tree)*
 *   RightParenthesis
 *   (QuestionMark)?
 *
 * tree:
 *   element+
 */
export default class Parser {
  private tokens: Token[] = [];

  private position: number = 0;

  private current: Token = { type: TokenType.EOF, value: '', position: 0 };

  parse(tokens: Token[]): LogicalChild {
    this.tokens = tokens;
    this.position = 0;

    [this.current] = tokens;

    const tree = this.tree();

    if (this.current.type !== TokenType.EOF) {
      throw this.error('Expected end of input');
    }

    return tree;
  }

  private tree(): LogicalChild {
    const children: LogicalChildren = [];

    do {
      children.push(this.element());
    } while (this.isStartOfElement());

    // If there's only one child, return it directly to avoid unnecessary hops
    if (children.length === 1) {
      return children[0];
    }

    return new And(...children);
  }

  // Check if current token can start an element (for lookahead in tree())
  private isStartOfElement(): boolean {
    const { type } = this.peek();
    return type === TokenType.BACKSLASH
           || type === TokenType.TEXT
           || type === TokenType.LEFT_PAREN;
  }

  private element(): LogicalChild {
    if (this.peek().type === TokenType.BACKSLASH) {
      return this.optionableEscapedToken();
    }
    if (this.peek().type === TokenType.TEXT) {
      return this.optionableText();
    }
    if (this.peek().type === TokenType.LEFT_PAREN) {
      return this.optionableGroup();
    }

    throw this.unexpectedToken('element');
  }

  private optionableEscapedToken(): LogicalChild {
    this.consume(TokenType.BACKSLASH);

    const escapable = this.consumeEscapable();
    const { value } = escapable;

    if (this.match(TokenType.QUESTION_MARK)) {
      this.advance();
      return new Or(value, '');
    }

    return value;
  }

  private consumeEscapable(): Token {
    const escapableTypes = tokenDefinitions
      .filter((def) => def.escapable)
      .map((def) => def.type);

    if (escapableTypes.includes(this.peek().type)) {
      return this.advance();
    }

    throw this.error('Expected escapable character after backslash');
  }

  private optionableText(): LogicalChild {
    const textToken = this.consume(TokenType.TEXT);
    const text = textToken.value;

    // If followed by '?', make the last character optional: "ab?" → Or("ab", "a")
    if (this.match(TokenType.QUESTION_MARK)) {
      this.advance();
      return new Or(text, text.slice(0, -1));
    }

    return text;
  }

  private optionableGroup(): LogicalChild {
    const alternatives: LogicalChildren = [];

    this.consume(TokenType.LEFT_PAREN);

    const isIgroup = this.match(TokenType.PLUS_SIGN);
    if (isIgroup) {
      this.advance();
    }

    alternatives.push(this.tree());

    while (this.match(TokenType.PIPE)) {
      this.advance();
      alternatives.push(this.tree());
    }

    this.consume(TokenType.RIGHT_PAREN);

    if (isIgroup && alternatives.length > 1) {
      alternatives.push(new And(...alternatives));
    }

    if (this.match(TokenType.QUESTION_MARK)) {
      this.advance();
      alternatives.push('');
    }

    // If there's only one alternative, return it directly to avoid unnecessary hops
    if (alternatives.length === 1) {
      return alternatives[0];
    }

    return new Or(...alternatives);
  }

  private peek(): Token {
    return this.current;
  }

  private advance(): Token {
    const previous = this.current;
    if (this.position < this.tokens.length - 1) {
      this.position += 1;
      this.current = this.tokens[this.position];
    }
    return previous;
  }

  private match(...types: TokenType[]): boolean {
    return types.includes(this.peek().type);
  }

  private consume(expected: TokenType): Token {
    if (this.peek().type === expected) {
      return this.advance();
    }
    throw this.error(`Expected ${expected} but found ${this.peek().type}`);
  }

  private error(message: string): Error {
    const token = this.peek();
    return new Error(`Parse error at position ${token.position}: ${message}`);
  }

  private unexpectedToken(context: string): Error {
    const token = this.peek();
    return new Error(
      `Unexpected token ${token.type} at position ${token.position} while parsing ${context}`,
    );
  }
}
