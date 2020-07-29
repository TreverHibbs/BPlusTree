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
                     edgeID,
                     position,
                     row) {
  const newChildRow = parentNode.getRow() + 1;


  newChild = BPlusTreeNode(values, nodeID, position, newChildRow);

  newEdge = makeBPlusTreeEdge(parentNode, newChild, edgeID);
  parentNode.addChild(newChild, newEdge, childIndex);

  return(newChild);
}

function getChild(parentNode, childIndex) {
  return(parentNode.getChild(childIndex));
}


/**
 *  @desc determine the correct position of the child relative to the parent
 *  @param BPlusTreeNode $parentNode - the selected node
 *  @return Array - the updated list of generated commands
 */ 
function determineChildPositions(parentNode) {
  const parentPosition = parentNode.getPosition();
  const childAmount = parentNode.getChildAmount();
  const children = parentNode.getChildren();

  //calculate the total space that will be used for the row.
  const childSpace = NODE_SPACING * childAmount;
  //The far left side of a node is its horizonta position coordinate.
  //Therefore to get the middle of the children row to line up with the
  //middle of the parent node half the total width of 
  //the parent node must be added to parent position value.
  
  //parenthesis are required arround division to force math to happen
  //otherwise numbers will only be concatenated.
  
  const halfLenOfParent = parentPosition + (WIDTH_PER_ELEM/2);
  const firstChildPosition = halfLenOfParent - (childSpace/2);

  //determine the placement of the children in that space
  const childPositions = getChildPositions(children, parentPosition);

  //update the datastructure with the horizontal positions of children
  updateChildPositions(parentNode, childPositions);

  return(true);
}

function getChildPositions(children, parentPosition,
                           childIndex = 0,
                           childPositions = []) {
  if(childIndex == children.length){
    return(childPositions);
  }
  let currentChildPosition = parentPosition;


  if(children.length % 2 == 0) {
    if(childIndex+1 <= children.length/2) {
      currentChildPosition = parentPosition - NODE_SPACING;
    } else {
      currentChildPosition = parentPosition + NODE_SPACING;
    }
  } else {
    if(childIndex+1 == children.length/2+0.5){
      currentChildPosition = parentPosition;
    } else if (childIndex+1 < children.length) {
      currentChildPosition = parentPosition - NODE_SPACING;
    } else {
      currentChildPosition = parentPosition + NODE_SPACING;
    }
  }

  childPositions.push(currentChildPosition);
  childIndex++;

  const currentChild = children[childIndex];

  currentChildPosition = currentChildPosition + NODE_SPACING;

  return(getChildPositions(children,
                           currentChildPosition,
                           childIndex,
                           childPositions));
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

