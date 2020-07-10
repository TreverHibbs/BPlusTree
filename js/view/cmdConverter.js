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
  var values = bPlusTreeNode.getValues().slice();
  var nodeID = bPlusTreeNode.getID();
  var valuesOrigLength = values.length;


  command = createCommand("CreateBTreeNode", nodeID, WIDTH_PER_ELEM,
                          NODE_HEIGHT, values.shift(), STARTING_X, STARTING_Y,
                          BACKGROUND_COLOR, FOREGROUND_COLOR);
  commands.push(command);

  addValues(commands, nodeID, values, valuesOrigLength);

  command = createCommand("SetText", idIndex, 1, nodeID);
  commands.push(command);
  command = createCommand("Step");
  commands.push(command);
  nodeID++;

  return(commands);
}


/**
 *  @desc highlight node that is currently being examined in the algorithm
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $nodeID - the id of the node to highlight
 *  @return Array - the updated list of generated commands
 */ 
function highlightNode(commands, nodeID) {
  command = createCommand("SetHighlight", nodeID, 1);
  commands.push(command);
  command = createCommand("Step");
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
function addValue(commands, nodeID, values) {
  command = createCommand("SetNumElements", nodeID, (valueIndex+1)); 
  commands.push(command);
  command = createCommand("SetText", nodeID, value, valueIndex);
  commands.push(command);
  command = createCommand("Step");
  commands.push(command);
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
 *         Array $values - list of values to add to node
 *  @return String $command - New animation command string
 */ 
function addValues(commands, nodeID, values, valuesOrigLength,
                   elementsSetFlag, valueIndex) {
  var valueIndex = 0;


  if (elementsSetFlag == undefined) {
    //third argument needs +1 because of 0 indexing.
    command = createCommand("SetNumElements", nodeID, valuesOrigLength); 
    commands.push(command);
    elementsSetFlag = 1;
  }
  
  if (values.length != 0) {
    command = createCommand("SetText", nodeID, values.shift(), valueIndex++);
    commands.push(command);
    addValues(commands,
              nodeID,
              values,
              valuesOrigLength,
              elementsSetFlag,
              valueIndex);
  }

  return(commands);
}

