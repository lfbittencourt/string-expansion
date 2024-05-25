"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Or = exports.And = void 0;
class Logical {
    constructor(...args) {
        this.children = args;
    }
}
class And extends Logical {
}
exports.And = And;
class Or extends Logical {
}
exports.Or = Or;
