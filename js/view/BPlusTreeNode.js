/**
 *  @desc - a factory function for creating a B+ tree object
 *  @return Object - a object representing a B+ tree
 */ 
const BPlusTree = function() {
  const bPlusTreeRoot = null;


  return {
    bPlusTreeRoot
  };
}


/**
 *  @desc - a factory function for creating a B+ tree node
 *  @return Object - a object representing a B+ tree
 */ 
const BPlusTreeNode = function(valuesParam = [], NodeID) {
  const nodePtr = [];
  const edgePtr = [];
  const id = NodeID;
  let values = valuesParam;


  return {
    values, 

    addChild: function(node, edge, childIndex) {
      nodePtr[childIndex] = node;
      edgePtr[childIndex] = edge;
    },

    setValues: function(newValues) {
      values = newValues;
      return;
    },
    
    pushValue: function(num) {
      values.push(num);
    },

    getID: function() {
      return(id);
    },

    getValue: function(index) {
      return(values[index]);
    },

    getValues: function() {
      return(values);
    },
    
    pushNode: function(node) {
      nodePtr.push(node);
    },

    getChild: function(childIndex) {
      return(nodePtr[childIndex]);
    }
  };
}

/**
 *  @desc - a factory function for creating a B+ tree edge
 *  @return Object - a object representing a edge
 */ 
const makeBPlusTreeEdge = function(parentNodeParam, childNodeParam, edgeID) {
  const parentNode = parentNodeParam;
  const childNode = childNodeParam;
  const id = edgeID;

  return {
    setParentNode: function(node) {
      return(true);
    },

    setChildNode: function(node) {
      return(true);
    },

    getParentNode: function() {
      return(parentNode);
    },

    getChildNode: function() {
      return(childNode);
    }
  };
}


/**
 *  @desc - a factory function for creating a B+ tree leaf
 *  @return Object - a object representing a B+ tree
 */ 
const BPlusTreeLeaf = function() {
  const value = [];
  const prevLeaf = null;
  const nextLeaf = null;


  return {
    value, prevLeaf, nextLeaf
  };
}





/********************************\
 #BPLUSTREE_MANIPULATION_FUNC
\********************************/
/**
 *  @desc create new node and add it as a child to selected node
 *  @param BPlusTreeNode $parentNode - the selected node
 *         Array $values - vlues of the new child node
 *         ind $childIndex - the position of the new child in relative to 
 *                           parent nodes other children
 *         int $the - id to be assigned to the new child node
 *         int $edgeID - the ID to be assigned to the new edge
 *  @return Array - the updated list of generated commands
 */ 
function createChild(parentNode, values, childIndex, nodeID, edgeID) {
  newChild = BPlusTreeNode(values, nodeID);

  newEdge = makeBPlusTreeEdge(parentNode, newChild, edgeID);
  parentNode.addChild(newChild, newEdge, childIndex);

  return(true);
}

function getChild(parentNode, childIndex) {
  return(parentNode.getChild(childIndex));
}

