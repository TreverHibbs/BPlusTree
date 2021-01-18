import { D3BTree } from '../src/d3BTree';
import mocha from 'mocha';
import chai from 'chai';
let assert = chai.assert;




describe('B+Tree', () => {
  describe('toHierarchy method', () => {
    it('should log a object', () => {
      const tree = new D3BTree(4);
      tree.add(1);
      tree.add(2);
      tree.add(3);

      const treeHierarchy = tree.toHierarchy();
      console.log("treeHierarchy", treeHierarchy);
      assert.typeOf(treeHierarchy, 'Object');
    });
  });
});

