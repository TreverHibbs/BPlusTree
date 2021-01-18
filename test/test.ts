import BTree from 'sorted-btree';


const tree = BTree(4);


tree.add(1);
tree.add(2);
tree.add(3);

const treeHierarchy = tree.toHierarchy;

console.log("treeHierarchy", treeHierarchy);

