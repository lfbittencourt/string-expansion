/* eslint-disable max-classes-per-file */
export type LogicalChild = string | And | Or;
export type LogicalChildren = LogicalChild[];

class Logical {
  children: LogicalChildren;

  constructor(...args: LogicalChildren) {
    this.children = args;
  }
}

export class And extends Logical {
}

export class Or extends Logical {
}
