"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.D3BTree = void 0;
const sorted_btree_1 = __importDefault(require("sorted-btree"));
class D3BTree extends sorted_btree_1.default {
    toHierarchy() {
        console.log("Woof! Woof!");
    }
}
exports.D3BTree = D3BTree;
