/**
 * @desc This file holds functions for the convertion of a model command
 * to animation commands.
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





function createCommand() {
  var command = arguments[0];
  for(i = 1; i < arguments.length; i++) {
    command = command + "<;>" + String(arguments[i]);
  }
  return(command);
}
