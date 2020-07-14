/**
 * @desc This file will hold functions for interfacing with the model per 
 * the mvc design pattern specifications.
 * @author Trever Hibbs treverhibbs@gmail.com
*/





/*
 * CONTENTS
 *
 * CONSTANTS
 *
 * MAIN-VIEW-FACTORY-FUNC
 *   RENDER-FUNCTIONS
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
var HIGHLIGHT_VAL = 1;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


objectManager = new ObjectManager();
animationManager = new AnimationManager(objectManager);





/*------------------------------------*\
  #MAIN-VIEW-FUNC
\*------------------------------------*/

/**
 *  @desc - a factory function for creating a view object
 *  @return bool - a animate function for animating model commands
 */ 
const View = function() {
  let nodeIndex = 0; 
  const bPlusTree = BPlusTree();


  /*------------------------------------*\
    #RENDER-FUNCTIONS
  \*------------------------------------*/
  
  /**
   *  @desc creates a list of commands for the creation a BTree root.
   *  @param Array $commands - an Array of animation libaray commands.
   *         int $value - the value of the root node,
   *  @return Array - the updated list of generated commands
   */ 
  function renderAddValue(animationCommands, value, valueIndex, nodeID) { 
    addValue(animationCommands, value, valueIndex, nodeID);
  
    return(animationCommands);
  }
  
  /**
   *  @desc Returns list of animation commands for the creation of a node
   *  @param int $value - the value of the root node,
   *  @return Array - the updated list of generated commands
   */ 
  function renderCreateNode(animationCommands, value) { 
    if (this.bPlusTree.bPlusTreeRoot == undefined) {
      this.nodeIndex = 0;
      this.bPlusTree.bPlusTreeRoot = BPlusTreeNode();
      this.bPlusTree.bPlusTreeRoot.pushValue(value); 
      this.bPlusTree.bPlusTreeRoot.setID(this.nodeIndex++); 
    } else {
      console.log('error, node already exists at this location');
    }

    createNode(animationCommands,
               this.bPlusTree.bPlusTreeRoot);
  
    return(animationCommands);
  }


  /**
   *  @desc renders the animation of inserting a root node
   *  @param int $value - the value of the root node,
   *  @return Array - the updated list of generated commands
   */ 
  function renderCreateRoot(animationCommands, value) { 
    if (bPlusTree.BPlusTreeRoot == null) {
      bPlusTree.bPlusTreeRoot = BPlusTreeNode();
      bPlusTree.bPlusTreeRoot.pushValue(value); 
      bPlusTree.bPlusTreeRoot.setID(nodeIndex++); 
    } else {
      console.log('error: root already exists');
    }

    createNode(animationCommands,
               bPlusTree.bPlusTreeRoot);
  
    return(animationCommands);
  }

  
  /**
   *  @desc renders a highlight animation
   *  @param Array $animationCommands - an array of the generated animation
   *                                    commands
   *         int $nodeIndex - the ID of the object currently being worked on
   *  @return Array - the updated list of generated commands
   */ 
  function renderHighlightNode(animationCommands, nodeIndex) {
    highlightNode(animationCommands, nodeIndex);
    unHighlightNode(animationCommands, nodeIndex);

    return(animationCommands);
  }
  
  /**
   *  @desc replaced node with new node with new values
   *  @param Array $animationCommands - an array of the generated animation
   *                                    commands
   *         int $nodeIndex - the ID of the object currently being worked on
   *  @return Array - the updated list of generated commands
   */ 
  function renderChangeNodeValues(animationCommands, nodeIndex, values) {
    bPlusTree.bPlusTreeRoot.setValues(values);
    
    addValues(animationCommands, nodeIndex,
              bPlusTree.bPlusTreeRoot.getValues());

    return(animationCommands);
  }


  /*------------------------------------*\
    #RETURN-View-OBJECT
  \*------------------------------------*/
  return {
    nodeIndex, bPlusTree,


    /**
     *  @desc - a function for animating a list of model commands
     *  @param Array $modelCommands - a array of model command objects to animate
     *         Array $animationCommands - a list of animation library commands
     *                                    for use with recursive calls
     *  @return bool - on success return true else false
     */ 
    animate: function(modelCommands, animationCommands, nodeIndex) {
      //variable declaration
      if (animationCommands == undefined) {
        var animationCommands = [];
      }
      if (nodeIndex == undefined) {
        var nodeIndex = 0;
      }
      var command = {};
      //the current index of the iteration loop


      if (modelCommands.length == 0) {
        if (animationCommands.length != 0) {
          animationManager.StartNewAnimation(animationCommands);
          return(true);
        } else {
          return(false);
        }
      } else {
        command = modelCommands.shift();
      }


      if (command.name == "addValue") {
        renderAddValue(animationCommands,
                       command.value,
                       command.valueIndex,
                       nodeIndex);
      } else if (command.name == "createNode") {
        renderCreateNode(animationCommands, command.value);
      } else if (command.name == "createRoot") { 
        renderCreateRoot(animationCommands, command.value);
      } else if (command.name == "examineNode") {
        renderHighlightNode(animationCommands, nodeIndex);
      } else if (command.name == "changeNodeValues") {
        renderChangeNodeValues(animationCommands, nodeIndex, command.values);
      } else {
        return(false);
      }


      this.animate(modelCommands, animationCommands, nodeIndex);
      return(true);

    }
  }
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
 * CREATE-ROOT
 * { "name":"createRoot", "value":1 }
 *
 * INSERT-COMMAND
 * { "name":"insert", "value":1 "valueIndex":0 } 
 * 
 * LOOK-AT-NODE
 *
 *
 *
 */

