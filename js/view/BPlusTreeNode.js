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
const BPlusTreeNode = function(valuesParam = [],
                               NodeID,
                               positionParam,
                               rowParam = 0) {
  const nodePtr = [];
  const edgePtr = [];
  const id = NodeID;
  const row = rowParam;

  let position = positionParam;
  let values = valuesParam;


  return {
    values, 

    addChild: function(node, childIndex) {
      nodePtr.splice(childIndex, 0, node);
      return;
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
    },

    getChildren: function() {
      return(nodePtr);
    },

    getChildAmount: function() {
      return(nodePtr.length)
    },

    getPosition: function() {
      return(position);
    },

    setPosition: function(num) {
      position = num;
    },

    getRow: function() {
      return(row);
    },

    getSize: function() {
      return(values.length);
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
function createChild(parentNode,
                     values,
                     childIndex,
                     nodeID,
                     position,
                     row) {
  const newChildRow = parentNode.getRow() + 1;
  const newChild = BPlusTreeNode(values, nodeID, position, newChildRow);

  addChild(parentNode, newChild, childIndex);

  return(newChild);
}

function getChild(parentNode, childIndex) {
  return(parentNode.getChild(childIndex));
}


/**
 *  @desc Determine the new positions of child nodes with insert.
 *  @param BPlusTreeNode $parentNode - selected node
 *         BPlusTreeNode $childNode - child node to add
 */ 
function addChild(parentNode, childNode, childIndex) {
  const children = parentNode.getChildren();


  parentNode.addChild(childNode, childIndex);
  determineChildPosition(childNode, childIndex, children);

  
  return(true);
}


/**
 *  @desc determine the correct position of the child relative to the parent
 *  @param BPlusTreeNode $parentNode - the selected node
 *  @return Array - the updated list of generated commands
 */ 
function determineChildPosition(childNode, childIndex, children) {
  const leftChild = children[childIndex-1];
  const rightChild = children[childIndex+1];
  const insertChild = childNode;

  const halfNodeLen = WIDTH_PER_ELEM/2;
  const fullNodeLen = WIDTH_PER_ELEM;

  //for each additional value in the inserted node add half a node length
  //to the right and left nodes ajust value.
  const leftAdditionalLen = (insertChild.getSize() - 1) * halfNodeLen;
  const rightAdditionalLen = (insertChild.getSize() - 1) * halfNodeLen;
  
  const leftAdjustLen = halfNodeLen + leftAdditionalLen;
  const rightAdjustLen = halfNodeLen + rightAdditionalLen;
  const insertAdjustLen = halfNodeLen;


  //shift all nodes left of inserting node to the left by adjustLen
  //shift all nodes right of inserting node to the right by adjustLen
  //place the inserting node right of the left node or left of right node
  if(leftChild){
    insertChild.setPosition(leftChild.getPosition() + (insertAdjustLen));
  } else if(rightChild) {
    insertChild.setPosition(rightChild.getPosition() - (insertAdjustLen));
  }
  changeNodePositions(children.slice(0, childIndex), -leftAdjustLen);
  changeNodePositions(children.slice(childIndex+1), rightAdjustLen);


  return(true);
}

/**
 *  @desc shift node positions by the specified space
 *  @param Array $children - the selected nodes
 *  @return Array - the update children nodes
 */ 
function changeNodePositions(children, adjustLen, childIndex = 0) {
  //exit condition
  if(childIndex == children.length) {
    return(children);
  }


  const currentChild = children[childIndex++];
  const childPosition = currentChild.getPosition();


  currentChild.setPosition(childPosition + adjustLen);


  changeNodePositions(children, adjustLen, childIndex);
  return(children);
}


function getChildPositions(children, parentPosition, childIndex = 0) {
  calulateChildPosition(children[childIndex], parentPosition);
  adjustChildPositions(children, childPositions );
}

function calculateChildPositions(children, parentPosition, 
                                 childIndex = 0,
                                 childPositions = []) {
  if(childIndex == children.length){
    return(childPositions);
  }


  const childRowPosition = childIndex + 1;

  let currentChildPosition = parentPosition;


  //get child position if all nodes were one node
  if(childRowPosition == children.length/2+0.5){
    currentChildPosition = parentPosition;
  } else if(childRowPosition <= children.length/2) {
    currentChildPosition = parentPosition - NODE_SPACING * childRowPosition;
  } else {
    currentChildPosition = parentPosition + NODE_SPACING * (childRowPosition - (children.length/2));
  }


  childPositions.push(currentChildPosition);
  childIndex++;

  return(determineChildPositions(children,
                                 parentPosition,
                                 childIndex,
                                 childPositions));
}

function changePositions(centerNodeIndex, childPositions, childSize, childIndex = 0) {
  if(childIndex == children.length){
    return(childPositions);
  }

  //adjust length is the length of half the length of the center node minus
  //one node length.
  const adjustLength = (WIDTH_PER_ELEM/2)*(childSize-1);


  if(childIndex < centerNodeIndex) {
    childPositions[childIndex] = childPositions[childIndex] - adjustLength;
  } else if (childIndex > centerNodeIndex) {
    childPositions[childIndex] = childPositions[childIndex] + adjustLength;
  }
}

//helper function for determining children positions
function isCenterNode(childRowPosition, childrenAmount) {
  return(childRowPosition == ((childrenAmount/2)+0.5));
}

//to do create system for updating data structure with child position values.
function updateChildPositions(parentNode, childPositions, childIndex = 0) {
  const currentChild = parentNode.getChild(childIndex);

  currentChild.setPosition(childPositions[childIndex++]);

  if(childIndex < childPositions.length) {
    updateChildPositions(parentNode, childPositions, childIndex);
  }

  return(parentNode);
}

