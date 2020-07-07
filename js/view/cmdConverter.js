/**
 * @desc This file holds functions for the convertion of a model command
 * into animation commands.
 * @author Trever Hibbs treverhibbs@gmail.com
*/





//constants delcarations
var STARTING_X = 450; STARTING_Y = 300;
var DEFAULT_SPEED = 20;
var FIRST_PRINT_POS_X = 50;
var PRINT_VERTICAL_GAP = 20;
var PRINT_MAX = 990;
var PRINT_HORIZONTAL_GAP = 50;

var MIN_MAX_DEGREE = 3;
var MAX_MAX_DEGREE = 7;

var HEIGHT_DELTA  = 50;
var NODE_SPACING = 15; 
var STARTING_Y = 30;
var WIDTH_PER_ELEM = 40;
var NODE_HEIGHT = 20;

var MESSAGE_X = 5;
var MESSAGE_Y = 10;

var TOMATO_RED = "#d51b10"
var MAROON = "#a82d43";
var LINK_COLOR = "#a82d43";
var HIGHLIGHT_CIRCLE_COLOR = "#a82d43";
var FOREGROUND_COLOR = "#a82d43";
var BACKGROUND_COLOR = "#EEFFEE";
var PRINT_COLOR = FOREGROUND_COLOR;

var idIndex = 0;


//Create the objects for canvas animation control
objectManager = new ObjectManager();
animationManager = new AnimationManager(objectManager);




/**
 *  @desc creates a list of commands for the creation a BTree root.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $value - the value of the root node,
 *  @return Array - the updated list of generated commands
 */ 
function createRoot(commands, value) {
  var nodeID = 0;

  command = createCommand("CreateBTreeNode", nodeID, WIDTH_PER_ELEM,
                          NODE_HEIGHT, 1, STARTING_X, STARTING_Y,
                          BACKGROUND_COLOR, FOREGROUND_COLOR);
  commands.push(command);
  command = createCommand("SetText", idIndex, 1, nodeID);
  commands.push(command);

  return(commands);
}


/**
 *  @desc adds a value to a existing node.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $value - the value to add to existing node,
 *         int $nodeID - index of the newly created node value.
 *  @return Array $commands - The modified array of commands
 */ 
function addToNode(commands, value, nodeID) {
  command = createCommand("SetNumElements", nodeID, 2); 
  commands.push(command);
  command = createCommand("SetText", nodeID, value, 1);
  commands.push(command);

  return(commands);
}





/**
 *  @desc Converts a list of values into animation command format
 *  @param arguments $arguments - Uses however many arguments are passed to it
 *  @return String $command - New animation command string
 */ 
//helper functions
function createCommand() {
  var command = "";
  let commands = Array.from(arguments);
  var command = commands.reduce( function(accumulator, currentValue) {
    return(accumulator + "<;>" + currentValue);
  });
  return(command);
}

