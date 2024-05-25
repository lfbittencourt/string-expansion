"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logical_1 = require("./logical");
function expandTree(tree) {
    if (typeof tree === 'string') {
        return [tree];
    }
    if (tree instanceof logical_1.And) {
        let results = [''];
        tree.children.forEach((child) => {
            const childResults = expandTree(child);
            const newResults = [];
            results.forEach((result) => {
                childResults.forEach((cr) => {
                    newResults.push(result + cr);
                });
            });
            results = newResults;
        });
        return results;
    }
    if (tree instanceof logical_1.Or) {
        let results = [];
        tree.children.forEach((child) => {
            const childResults = expandTree(child);
            results = results.concat(childResults);
        });
        return results;
    }
    throw new Error('Unsupported type');
}
exports.default = expandTree;
