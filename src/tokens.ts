import { createToken } from 'chevrotain';

export const Text = createToken({ name: 'Text', pattern: /(\w|\s)+/ });
export const LeftParenthesis = createToken({ name: 'LeftParenthesis', pattern: '(' });
export const RightParenthesis = createToken({ name: 'RightParenthesis', pattern: ')' });
export const QuestionMark = createToken({ name: 'QuestionMark', pattern: '?' });
export const DoublePipe = createToken({ name: 'DoublePipe', pattern: '||' });
export const Pipe = createToken({ name: 'Pipe', pattern: '|' });

export default [Text, LeftParenthesis, RightParenthesis, QuestionMark, DoublePipe, Pipe];
