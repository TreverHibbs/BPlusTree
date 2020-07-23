/**
 * @desc This file holds functions for the convertion of a model command
 * into animation commands.
 * @author Trever Hibbs treverhibbs@gmail.com
*/


/*
 * CONTENTS
 *
 * COVERSION-FUNCTIONS 
 *   creatRoot()
 *   highlightNode()
 *   addToNode()
 *
 * HELPER-FUNCTIONS
 *
 */





/*------------------------------------*\
  #VARIABLES
\*------------------------------------*/

/**
 *  @desc creates a list of commands for the creation a BTree root.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $value - the value of the root node,
 *  @return Array - the updated list of generated commands
 */ 





/*------------------------------------*\
  #COVERSION-FUNCTIONS 
\*------------------------------------*/

/**
 *  @desc creates a list of commands for the creation a BTree root.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $value - the value of the root node,
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

  console.log(commands);
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
 *  @desc adds a value to a existing node.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $value - the value to add to existing node,
 *         int $nodeID - ID of the node to add value to
 *         int $valueIndex - where in the node to place the value
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
 *  @desc adds a step command to animation command queue
 *  @param Array $commands - an Array of animation libaray commands.
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
 *  @return int expression - the x coordinate of the node
 */ 
function determineNodeHeight(nodeRow) {
  return(STARTING_Y + nodeRow * NODE_VERTICAL_SPACING);
}

