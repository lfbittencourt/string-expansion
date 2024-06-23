import { EmbeddedActionsParser } from 'chevrotain';

import { And, LogicalChildren, Or } from './logical';

import tokens, {
  Backslash,
  escapableTokens,
  LeftParenthesis,
  Pipe,
  PlusSign,
  QuestionMark,
  RightParenthesis,
  Text,
} from './tokens';

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
export default class Parser extends EmbeddedActionsParser {
  constructor() {
    super(tokens);

    this.performSelfAnalysis();
  }

  private optionableEscapedToken = this.RULE('escapedToken', () => {
    this.CONSUME1(Backslash);

    const token = this.OR(
      escapableTokens.map((escapableToken) => ({ ALT: () => this.CONSUME2(escapableToken) })),
    );

    if (this.OPTION(() => this.CONSUME(QuestionMark))) {
      return new Or(token.image, '');
    }

    return token.image;
  });

  private optionableText = this.RULE('optionalText', () => {
    const text: string = this.CONSUME(Text).image;

    if (this.OPTION(() => this.CONSUME(QuestionMark))) {
      return new Or(text, text.slice(0, -1));
    }

    return text;
  });

  private optionableGroup = this.RULE('optionableGroup', () => {
    const alternatives: LogicalChildren = [];

    this.CONSUME(LeftParenthesis);

    const isIgroup = this.OPTION1(() => this.CONSUME(PlusSign));

    this.AT_LEAST_ONE_SEP({
      SEP: Pipe,
      DEF: () => alternatives.push(this.SUBRULE(this.tree)),
    });

    this.CONSUME(RightParenthesis);

    if (isIgroup && alternatives.length > 1) {
      alternatives.push(new And(...alternatives));
    }

    if (this.OPTION2(() => this.CONSUME(QuestionMark))) {
      alternatives.push('');
    }

    // If there's only one alternative, return it directly to avoid unnecessary hops
    if (alternatives.length === 1) {
      return alternatives[0];
    }

    return new Or(...alternatives);
  });

  private element = this.RULE('element', () => this.OR([
    { ALT: () => this.SUBRULE(this.optionableEscapedToken) },
    { ALT: () => this.SUBRULE(this.optionableText) },
    { ALT: () => this.SUBRULE(this.optionableGroup) },
  ]));

  public tree = this.RULE('tree', () => {
    const children: LogicalChildren = [];

    this.AT_LEAST_ONE(() => children.push(this.SUBRULE(this.element)));

    if (children.length === 1) {
      return children[0];
    }

    return new And(...children);
  });
}
