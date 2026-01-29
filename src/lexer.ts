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

export const escapableTokenTypes = [
  TokenType.BACKSLASH,
  TokenType.LEFT_PAREN,
  TokenType.RIGHT_PAREN,
  TokenType.PIPE,
  TokenType.PLUS_SIGN,
  TokenType.QUESTION_MARK,
];

export class Lexer {
  private input: string = '';
  private position: number = 0;

  tokenize(input: string): Token[] {
    this.input = input;
    this.position = 0;
    const tokens: Token[] = [];

    while (this.position < this.input.length) {
      const char = this.input[this.position];
      const tokenStart = this.position;

      if (char === '(') {
        tokens.push({ type: TokenType.LEFT_PAREN, value: '(', position: tokenStart });
        this.position++;
      } else if (char === ')') {
        tokens.push({ type: TokenType.RIGHT_PAREN, value: ')', position: tokenStart });
        this.position++;
      } else if (char === '?') {
        tokens.push({ type: TokenType.QUESTION_MARK, value: '?', position: tokenStart });
        this.position++;
      } else if (char === '|') {
        tokens.push({ type: TokenType.PIPE, value: '|', position: tokenStart });
        this.position++;
      } else if (char === '+') {
        tokens.push({ type: TokenType.PLUS_SIGN, value: '+', position: tokenStart });
        this.position++;
      } else if (char === '\\') {
        tokens.push({ type: TokenType.BACKSLASH, value: '\\', position: tokenStart });
        this.position++;
      } else if (this.isTextChar(char)) {
        const text = this.consumeText();
        tokens.push({ type: TokenType.TEXT, value: text, position: tokenStart });
      } else {
        throw new Error(`Unexpected character '${char}' at position ${this.position}`);
      }
    }

    tokens.push({ type: TokenType.EOF, value: '', position: this.position });
    return tokens;
  }

  private isTextChar(char: string): boolean {
    return /[\w\s]/.test(char);
  }

  private consumeText(): string {
    let text = '';
    while (this.position < this.input.length && this.isTextChar(this.input[this.position])) {
      text += this.input[this.position];
      this.position++;
    }
    return text;
  }
}
