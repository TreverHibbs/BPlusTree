"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3BTree_1 = require("../src/d3BTree");
const chai_1 = __importDefault(require("chai"));
let assert = chai_1.default.assert;
describe('B+Tree', () => {
    describe('toHierarchy method', () => {
        it('should log a object', () => {
            const tree = new d3BTree_1.D3BTree(4);
            tree.add(1);
            tree.add(2);
            tree.add(3);
            const treeHierarchy = tree.toHierarchy();
            console.log("treeHierarchy", treeHierarchy);
            assert.typeOf(treeHierarchy, 'Object');
        });
    });
});
