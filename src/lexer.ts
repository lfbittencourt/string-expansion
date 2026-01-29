export interface Token {
  type: TokenType;
  value: string;
  position: number;
}

export enum TokenType {
  TEXT = 'TEXT',
  LEFT_PAREN = 'LEFT_PAREN',
  RIGHT_PAREN = 'RIGHT_PAREN',
  QUESTION_MARK = 'QUESTION_MARK',
  PIPE = 'PIPE',
  PLUS_SIGN = 'PLUS_SIGN',
  BACKSLASH = 'BACKSLASH',
  EOF = 'EOF',
}

// Token definitions with their patterns - single source of truth
interface TokenDefinition {
  type: TokenType;
  pattern: string;
  escapable?: boolean;
}

export const tokenDefinitions: TokenDefinition[] = [
  { type: TokenType.LEFT_PAREN, pattern: '(', escapable: true },
  { type: TokenType.RIGHT_PAREN, pattern: ')', escapable: true },
  { type: TokenType.QUESTION_MARK, pattern: '?', escapable: true },
  { type: TokenType.PIPE, pattern: '|', escapable: true },
  { type: TokenType.PLUS_SIGN, pattern: '+', escapable: true },
  { type: TokenType.BACKSLASH, pattern: '\\', escapable: true },
];

export const escapableTokenTypes = tokenDefinitions
  .filter((def) => def.escapable)
  .map((def) => def.type);

// Text token pattern
export const textPattern = /[\w\s]/;

export default class Lexer {
  private input: string = '';

  private position: number = 0;

  tokenize(input: string): Token[] {
    this.input = input;
    this.position = 0;
    const tokens: Token[] = [];

    while (this.position < this.input.length) {
      const tokenStart = this.position;

      // Try to match special tokens
      const matchedToken = tokenDefinitions.find((tokenDef) => (
        this.input.startsWith(tokenDef.pattern, this.position)
      ));

      if (matchedToken) {
        tokens.push({
          type: matchedToken.type,
          value: matchedToken.pattern,
          position: tokenStart,
        });
        this.position += matchedToken.pattern.length;
      } else {
        // If no special token matched, try text
        const char = this.input[this.position];
        if (this.isTextChar(char)) {
          const text = this.consumeText();
          tokens.push({ type: TokenType.TEXT, value: text, position: tokenStart });
        } else {
          throw new Error(`Unexpected character '${char}' at position ${this.position}`);
        }
      }
    }

    tokens.push({ type: TokenType.EOF, value: '', position: this.position });
    return tokens;
  }

  // eslint-disable-next-line class-methods-use-this
  private isTextChar(char: string): boolean {
    return textPattern.test(char);
  }

  private consumeText(): string {
    let text = '';
    while (this.position < this.input.length && this.isTextChar(this.input[this.position])) {
      text += this.input[this.position];
      this.position += 1;
    }
    return text;
  }
}
