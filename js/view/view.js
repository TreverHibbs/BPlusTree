/**
 * @desc This file will hold functions for interfacing with the model per 
 * the mvc design pattern specifications.
 * @author Trever Hibbs treverhibbs@gmail.com
*/





//canvas initialization
/*
 * CONTENTS
 *
 * CONSTANTS
 *
 * MAIN-VIEW-FUNC
 *   view()
 *
 */





/*------------------------------------*\
  #CONSTANTS
\*------------------------------------*/

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
var BACKGROUND_COLOR = "#f4e5e8";
var PRINT_COLOR = FOREGROUND_COLOR;

var idIndex = 0;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


objectManager = new ObjectManager();
animationManager = new AnimationManager(objectManager);





/*------------------------------------*\
  #MAIN-VIEW-FUNC
\*------------------------------------*/

/**
 *  @desc executes a list of model commands
 *  @param jsonObj $modelCommands - a object containg a list of commands
 *  @return bool - true if commands executed false if invalid commands are sent
 */ 
function view(modelCommands) {
  var animationCommands = [];
  var command = {};
  
  



  console.log(modelCommands);
  if (modelCommands.length == 0) {
    if (animationCommands != []) {
      animationManager.StartNewAnimation(animationCommands);
    } else {
      return(false);
    }
  } else {
    command = modelCommands.shift();
  }



  if (command.name == "insert") {
    renderInsert(command);
  } else {
    return(false);
  }


  view(modelCommands);
  return(true);
}





/*------------------------------------*\
  #MODEL-COMMANDS-DESCRIPTION
\*------------------------------------*/

/**
 * COMMAND-STRUCTURE
 *
 * { 
 *   "name":"$name",
 *   "value":"$value",
 *   "valueIndex":"$valueIndex",
 * }  
 * 
 * $name - the name of the command
 * $value - value to insert or delete
 * $valueIndex - index/position of the value to be deleted/inserted within a node
 *
 *
 * INSERT-COMMAND
 * { "name":"insert", "value":1, "nodeID":0 } 
 *
 */
