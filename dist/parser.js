"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const logical_1 = require("./logical");
const tokens_1 = __importStar(require("./tokens"));
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
 *   LeftParenthesis tree (Pipe tree)* RightParenthesis (QuestionMark)?
 *
 * tree:
 *   element+
 */
class Parser extends chevrotain_1.EmbeddedActionsParser {
    constructor() {
        super(tokens_1.default);
        this.text = this.RULE('text', () => this.CONSUME(tokens_1.Text).image);
        this.optionalText = this.RULE('optionalText', () => {
            const text = this.SUBRULE(this.text);
            this.CONSUME(tokens_1.QuestionMark);
            return this.ACTION(() => new logical_1.Or(text, text.slice(0, -1)));
        });
        this.optionableGroup = this.RULE('optionableGroup', () => {
            const alternatives = [];
            this.CONSUME(tokens_1.LeftParenthesis);
            this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.Pipe,
                DEF: () => alternatives.push(this.SUBRULE(this.tree)),
            });
            this.CONSUME(tokens_1.RightParenthesis);
            if (this.OPTION(() => this.CONSUME(tokens_1.QuestionMark))) {
                alternatives.push('');
            }
            if (alternatives.length === 1) {
                return alternatives[0];
            }
            return new logical_1.Or(...alternatives);
        });
        this.element = this.RULE('element', () => this.OR([
            { ALT: () => this.SUBRULE(this.optionalText) },
            { ALT: () => this.SUBRULE(this.text) },
            { ALT: () => this.SUBRULE(this.optionableGroup) },
        ]));
        this.tree = this.RULE('tree', () => {
            const variations = [];
            this.AT_LEAST_ONE(() => variations.push(this.SUBRULE(this.element)));
            if (variations.length === 1) {
                return variations[0];
            }
            return new logical_1.And(...variations);
        });
        this.performSelfAnalysis();
    }
}
exports.default = Parser;
