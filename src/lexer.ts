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

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}

interface TokenDefinition {
  type: TokenType;
  pattern: RegExp;
  escapable: boolean;
}

export const tokenDefinitions: TokenDefinition[] = [
  { type: TokenType.LEFT_PAREN, pattern: /^\(/, escapable: true },
  { type: TokenType.RIGHT_PAREN, pattern: /^\)/, escapable: true },
  { type: TokenType.QUESTION_MARK, pattern: /^\?/, escapable: true },
  { type: TokenType.PIPE, pattern: /^\|/, escapable: true },
  { type: TokenType.PLUS_SIGN, pattern: /^\+/, escapable: true },
  { type: TokenType.BACKSLASH, pattern: /^\\/, escapable: true },
  { type: TokenType.TEXT, pattern: /(\w|\s)+/, escapable: false },
  { type: TokenType.EOF, pattern: /^$/, escapable: false },
];

export default class Lexer {
  private input: string = '';

  private position: number = 0;

  tokenize(input: string): Token[] {
    this.input = input;
    this.position = 0;

    const tokens: Token[] = [];

    while (this.position < this.input.length) {
      const tokenStart = this.position;
      const matchedToken = tokenDefinitions.find((tokenDefinition) => {
        const match = this.input
          .substring(this.position)
          .match(tokenDefinition.pattern);

        if (match) {
          tokens.push({
            type: tokenDefinition.type,
            value: match[0],
            position: tokenStart,
          });

          this.position += match[0].length;

          return true;
        }

        return false;
      });

      if (!matchedToken) {
        const char = this.input[this.position];

        throw new Error(
          `Unexpected character '${char}' at position ${this.position}`,
        );
      }
    }

    tokens.push({ type: TokenType.EOF, value: '', position: this.position });

    return tokens;
  }
}
