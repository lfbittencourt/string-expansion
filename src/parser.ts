import { EmbeddedActionsParser } from 'chevrotain';

import { And, LogicalChildren, Or } from './logical';

import tokens, {
  Text, LeftParenthesis, RightParenthesis, QuestionMark, Pipe, PlusSign,
} from './tokens';

/**
 * GRAMMAR
 *
 * element:
 *   Text | optionalText | optionableGroup
 *
 * optionalText:
 *   Text QuestionMark
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

  private text = this.RULE('text', () => this.CONSUME(Text).image);

  private optionalText = this.RULE('optionalText', () => {
    const text: string = this.SUBRULE(this.text);

    this.CONSUME(QuestionMark);

    return this.ACTION(() => new Or(text, text.slice(0, -1)));
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

    if (alternatives.length === 1) {
      return alternatives[0];
    }

    return new Or(...alternatives);
  });

  private element = this.RULE('element', () => this.OR([
    { ALT: () => this.SUBRULE(this.optionalText) },
    { ALT: () => this.SUBRULE(this.text) },
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
