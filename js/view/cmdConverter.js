/**
 * @desc This file holds functions for the convertion of a model command
 *       into animation commands.
 * @author Trever Hibbs treverhibbs@gmail.com
*/


/*
 * CONTENTS
 *
 * COVERSION-FUNCTIONS 
 *   creatNode()
 *   createChildNode()
 *   connectNodes()
 *   connectSiblingNodes()
 *   highlightNode()
 *   unHighlightNode()
 *   highlightEdge()
 *   unHighlightEdge()
 *   addValues()
 *   addStep()
 *   moveNode()
 *
 * HELPER-FUNCTIONS
 *   createCommand()
 *   genSetTextCmd()
 *   determineNodeHeight()
 *   getChildIndex()
 *
 */





/*------------------------------------*\
  #COVERSION-FUNCTIONS 
\*------------------------------------*/

/**
 *  @desc creates a list of commands for the creation a BTree root.
 *  @param Array $commands - an Array of animation libaray commands.
 *         BPlusTreeNode $bPlusTreeNode - the node to render
 *  @return Array - the updated list of generated commands
 */ 
function createNode(commands, bPlusTreeNode) {
  //copy bPlusTreeNode.values to new array variable  
  var values = bPlusTreeNode.getValues().slice();
  var nodeID = bPlusTreeNode.getID();
  var valuesOrigLength = values.length;


  command = createCommand("CreateBTreeNode", nodeID, WIDTH_PER_ELEM,
                          NODE_HEIGHT, values.length, STARTING_X, STARTING_Y,
                          BACKGROUND_COLOR, FOREGROUND_COLOR);
  commands.push(command);

  genSetTextCmd(commands, nodeID, values);

  return(commands);
}

/**
 *  @desc creates a list of commands for the creation a BTree child node.
 *  @param Array $commands - an Array of animation libaray commands.
 *         BPlusTreeNode $childNode - the child node to be created
 *         BPlusTreeNode $parentNode - the parent of the child node
 *         BPlusTreeNode $originNode - the node from which the new child node
 *                                     has split from
 *  @return Array - the updated list of generated commands
 */ 
function createChildNode(commands, childNode, parentNode, originNode = null) {
  const childNodeID = childNode.getID();
  const childNodeValues = childNode.getValues();
  const childIndex = getChildIndex(childNode, parentNode);
  const anchorPoint = childIndex;

  const leftSiblingNode = parentNode.getChild(childIndex-1);
  const rightSiblingNode = parentNode.getChild(childIndex+1);

  let childVerticlePosition = 0; 
  let childOriginPosition = 0;


  //if origin position is specified then node will be created at that
  //position and then moved to its final position.
  if(originNode != null) {
    childVerticlePosition = determineNodeHeight(originNode.getRow());
    childOriginPosition = originNode.getPosition();
  } else {
    childVerticlePosition = determineNodeHeight(childNode.getRow());
    childOriginPosition = childNode.getPosition();  
  }


  command = createCommand("CreateBTreeNode",
                          childNodeID,
                          WIDTH_PER_ELEM,
                          NODE_HEIGHT,
                          childNodeValues.length,
                          childOriginPosition,
                          childVerticlePosition,
                          BACKGROUND_COLOR,
                          FOREGROUND_COLOR);
  commands.push(command);


  genSetTextCmd(commands, childNodeID, childNodeValues);


  //connect with parent node
  connectNodes(commands, parentNode, childNode, anchorPoint);


  //move node if origin Node specified
  if(originNode != null) {
    moveNode(commands, childNode); 
  }


  return(commands);
}


/**
 *  @desc animate an edge connection between two animated node objects
 *  @param BPlusTreeNode-Object $selectedNode - the parent node
 *         BPlusTreeNode-Object $selectedNodeChild - the child node
 *  @return Array - the updated list of generated commands
 */ 
function connectNodes(commands, selectedNode, selectedNodeChild, anchorPoint = 0) {
  let command = createCommand("Connect",
                              selectedNode.getID(),
                              selectedNodeChild.getID(),
                              LINK_COLOR,
                              0,
                              0,
                              "",
                              anchorPoint);
  commands.push(command);

  return(commands);
}


/**
 *  @desc animate edge connection between sibling nodes
 *  @param Array $commands - list of animation commands to execute next
 *         BPlusTreeNode $leftSiblingNode - the left sibling node
 *         BPlusTreeNode $rightSiblingNode - the right sibling node
 *  @return Array - the updated list of generated commands
 */ 
function connectSiblingNodes(commands, leftSiblingNode, rightSiblingNode) {
  let command = createCommand("Connect",
                              leftSiblingNode.getID(),
                              rightSiblingNode.getID(),
                              LINK_COLOR,
                              0,
                              1,
                              "",
                              1);
  commands.push(command);

  return(commands);
}


/**
 *  @desc highlight node that is currently being examined in the algorithm
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $nodeID - the id of the node to highlight
 *  @return Array - the updated list of generated commands
 */ 
function highlightNode(commands, nodeID) {
  command = createCommand("SetHighlight", nodeID, HIGHLIGHT_VAL);
  commands.push(command);

  return(commands);
}


/**
 *  @desc unhighlight a node
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $nodeID - the id of the node to highlight
 *  @return Array - the updated list of generated commands
 */ 
function unHighlightNode(commands, nodeID) {
  //third argument site highlight to zero.
  command = createCommand("SetHighlight", nodeID, 0);
  commands.push(command);

  return(commands);
}


/**
 *  @desc highlight a edge
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $fromNodeID - the id the the node which the edge starts at
 *         int $toNodeID - the id of the node where the edge ends at
 *  @return Array - the updated list of generated commands
 */ 
function highlightEdge(commands, fromNodeID, toNodeID) {
  command = createCommand("SetEdgeHighlight", fromNodeID, toNodeID, HIGHLIGHT_VAL);
  commands.push(command);

  return(commands);
}

//see above function comment block
function unHighlightEdge(commands, fromNodeID, toNodeID) {
  const unHighlightValue = 0;


  command = createCommand("SetEdgeHighlight", fromNodeID, toNodeID, unHighlightValue);
  commands.push(command);

  return(commands);
}


/**
 *  @desc adds a value to a existing node.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $nodeID - ID of the node to add value to
 *         Array $values - the array of values to set for the node
 *  @return Array $commands - The modified array of commands
 */ 
function addValues(commands, nodeID, values) {
  command = createCommand("SetNumElements", nodeID, values.length); 
  commands.push(command);
  
  genSetTextCmd(commands, nodeID, values);
}


/**
 *  @desc adds a step command to animation command queue
 *  @param Array $commands - an Array of animation libaray commands.
 *  @return Array $commands - The modified array of commands
 */ 
function addStep(commands) {
  command = createCommand("Step");
  commands.push(command);

  return(commands);
}


/**
 *  @desc smoothly moves a node to its current position and height
 *  @param Array $commands - an Array of animation libaray commands.
 *         BPlusTreeNode $node - the node to be moved to its current position
 *  @return Array $commands - The modified array of commands
 */ 
function moveNode(commands, node) {
  const nodeID = node.getID();
  const nodePosition = node.getPosition();
  const nodeHeight = determineNodeHeight(node.getRow());
  command = createCommand("Move", nodeID, nodePosition, nodeHeight);
  commands.push(command);

  return(commands);
}





/*------------------------------------*\
  #HELPER-FUNCTIONS 
\*------------------------------------*/

/**
 *  @desc Converts a list of values into animation command format
 *  @param arguments $arguments - Uses however many arguments are passed to it
 *  @return String $command - New animation command string
 */ 
function createCommand() {
  var command = "";
  let commands = Array.from(arguments);
  var command = commands.reduce( function(accumulator, currentValue) {
    return(accumulator + "<;>" + currentValue);
  });
  return(command);
}

/**
 *  @desc Converts a list of values into a list of animation commands for
 *        adding values to node
 *  @param Array $commands - master list of animation commands.
 *         int $nodeID - id of the node to add values to
 *         Array $values - list of values to add to node
 *         int $valueIndex - current index of value to add
 *                           used for recursive loop indexing
 *  @return String $command - New animation command string
 */ 
function genSetTextCmd(commands, nodeID, values,
                       valueIndex) {
  if(valueIndex == undefined){
    var valueIndex = 0;
  }


  if (values.length != 0) {
    command = createCommand("SetText", nodeID, values.shift(), valueIndex++);
    commands.push(command);
    genSetTextCmd(commands,
                  nodeID,
                  values,
                  valueIndex);
  }

  return(commands);
}

/**
 *  @desc convert the row of a node to it's height
 *  @param BPlusTreeNode $nodeRow - the node to have it's height determined.
 *  @return int expression - the y coordinate of the node
 */ 
function determineNodeHeight(nodeRow) {
  return(STARTING_Y + nodeRow * NODE_VERTICAL_SPACING);
}

/**
 *  @desc: returns true if child is left of parent node position wise.
 *  @param: BPlusTreeNode $childNode - the child node
 *          BPlusTreeNode $parentNode - the parent node
 *  @return: boolean - true if left of parent false if not
 */ 
function getChildIndex(childNode, parentNode, childIndex = 0) {
  const children = parentNode.getChildren();


  if (childIndex === children.length) {
    console.log("unable to determine child index");
    return(0);
  } else if(children[childIndex] === childNode) {
    return(childIndex);
  }

  childIndex++;
  return(getChildIndex(childNode, parentNode, childIndex));
}
