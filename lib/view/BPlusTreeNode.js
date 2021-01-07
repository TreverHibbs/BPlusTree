/**
 * @desc - this file contains the main BPlusTree and BPlusTreeNode data
 *         structures. It also contains functions to manipulate these data
 *         structures.
 * @author - Trever Hibbs treverhibbs@gmail.com
*/


/*
 * CONTENTS
 *
 * DATA-STRUCTURES
 *   BPlusTree
 *   BPlusTreeNode
 *
 * BPLUSTREE-MANIPULATION-FUNCTIONS
 *   createChild()
 *   getChild()
 *   addChild()
 *   determineChildPosition()
 *   changeNodePositions()
 *   changePositions()
 *
 */





/*------------------------------------*\
  #DATA-STRUCTURES
\*------------------------------------*/

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
 *  @return BPlusTreeNode - a datastructure representing a BPlusTreeNode
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

    //function will place node at childIndex and shift other nodes in array
    //if a node already existed at the specified index.
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





/*------------------------------------*\
  #BPLUSTREE-MANIPULATION-FUNCTIONS
\*------------------------------------*/

/**
 *  @desc create new node and add it as a child to selected node
 *  @param BPlusTreeNode $parentNode - the selected node
 *         Array $values - values of the new child node
 *         ind $childIndex - the position of the new child relative to 
 *                           parent nodes other children
 *         int $nodeID - id to be assigned to the new child node
 *         int $position - the horizontal coordinate to be assigned
 *                         to new child node
 *         int $row - the row index of the new child node
 *  @return BPlusTreeNode - the new child node object
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

/**
 *  @desc return the specified child node of the parent node
 *  @param BPlusTreeNode $parentNode - selected node
 *         int $childIndex - the index of the child to return
 */ 
function getChild(parentNode, childIndex) {
  return(parentNode.getChild(childIndex));
}


/**
 *  @desc insert the child node into the parent nodes child node array
 *        then call a function to set the horizontal positions of 
 *        parent nodes children after insert
 *  @param BPlusTreeNode $parentNode - selected node
 *         BPlusTreeNode $childNode - child node to add
 *         int $childIndex - the index to insert the new child at
 */ 
function addChild(parentNode, childNode, childIndex) {
  const children = parentNode.getChildren();


  parentNode.addChild(childNode, childIndex);
  determineChildPosition(childNode, childIndex, children);

  
  return(true);
}


/**
 *  @desc determine the correct position of the children relative to the parent
 *  @param BPlusTreeNode $childNode - the most recently inserted child node
 *         int $childIndex - the index of the most recently inserted child node
 *         Array $children - the array of children node object of the parent
 *  @return boolean - true
 */ 
function determineChildPosition(childNode, childIndex, children) {
  const leftChild = children[childIndex-1];
  const rightChild = children[childIndex+1];
  const insertChild = childNode;

  const halfNodeLen = WIDTH_PER_ELEM/2;
  const fullNodeLen = WIDTH_PER_ELEM;

  const halfNodeSpacing = NODE_SPACING/2;

  //for each additional value in the inserted node add half a node length
  //to the right and left nodes positional value
  //this will cause the nodes arround the inserted node to shift left and right
  //depending on what side the inserted node they are on.
  const additionalLen = (insertChild.getSize() - 1) * halfNodeLen;
  
  const adjustLen = halfNodeLen + additionalLen + halfNodeSpacing;
  const insertAdjustLen = halfNodeLen + halfNodeSpacing;


  //shift all nodes left of inserting node to the left by adjustLen
  //shift all nodes right of inserting node to the right by adjustLen
  //place the inserting node right of the left node or left of right node
  if(leftChild){
    insertChild.setPosition(leftChild.getPosition() + (insertAdjustLen));
  } else if(rightChild) {
    insertChild.setPosition(rightChild.getPosition() - (insertAdjustLen));
  }
  changeNodePositions(children.slice(0, childIndex), -adjustLen);
  changeNodePositions(children.slice(childIndex+1), adjustLen);


  return(true);
}

/**
 *  @desc shift node positions by the specified adjust length
 *  @param Array $children - the selected nodes
 *  @return Array - the updated children nodes array
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

/********************\
|* HELPER FUNCTIONS *|
\********************/
//nothing yet
