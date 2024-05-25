"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chevrotain_1 = require("chevrotain");
const expand_tree_1 = __importDefault(require("./expand-tree"));
const parser_1 = __importDefault(require("./parser"));
const tokens_1 = __importDefault(require("./tokens"));
const lexer = new chevrotain_1.Lexer(tokens_1.default);
const parser = new parser_1.default();
module.exports = (pattern) => {
    const lexingResult = lexer.tokenize(pattern);
    parser.input = lexingResult.tokens;
    const result = parser.tree();
    if (parser.errors.length > 0) {
        throw new Error(`Parsing error detected!\n${parser.errors[0].message}`);
    }
    return (0, expand_tree_1.default)(result);
};
