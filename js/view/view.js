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
  let objectIndex = 0; 
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
    addStep(animationCommands);
  
    return(animationCommands);
  }
  
  /**
   *  @desc Returns list of animation commands for the creation of a node
   *  @param int $value - the value of the root node,
   *  @return Array - the updated list of generated commands
   */ 
  function renderCreateNode(animationCommands, values) { 
    if (bPlusTree.bPlusTreeRoot == null) {
      bPlusTree.bPlusTreeRoot = BPlusTreeNode(values, objectIndex++);
    } else {
      console.log('error, node already exists at this location');
    }

    createNode(animationCommands,
               bPlusTree.bPlusTreeRoot);
    addStep(animationCommands);
  
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
      bPlusTree.bPlusTreeRoot.pushValue(value, objectIndex++); 
    } else {
      console.log('error: root already exists');
    }

    createNode(animationCommands,
               bPlusTree.bPlusTreeRoot);
    addStep(animationCommands);
  
    return(animationCommands);
  }

  
  /**
   *  @desc renders a highlight animation
   *  @param Array $animationCommands - an array of the generated animation
   *                                    commands
   *         int $selectedNodeID - the ID of the object currently being worked on
   *  @return Array - the updated list of generated commands
   */ 
  function renderHighlightNode(animationCommands, selectedNodeID) {
    highlightNode(animationCommands, selectedNodeID);
    unHighlightNode(animationCommands, selectedNodeID);
    addStep(animationCommands);

    return(animationCommands);
  }
  
  /**
   *  @desc replaced node with new node with new values
   *  @param Array $animationCommands - an array of the generated animation
   *                                    commands
   *         int $selectedNodeID - the ID of the object currently being worked on
   *  @return Array - the updated list of generated commands
   */ 
  function renderChangeNodeValues(animationCommands, selectedNodeID, values) {
    bPlusTree.bPlusTreeRoot.setValues(values);
    
    addValues(animationCommands, selectedNodeID,
              bPlusTree.bPlusTreeRoot.getValues());
    addStep(animationCommands);

    return(animationCommands);
  }

  /**
   *  @desc animate the splitting of a node
   *  @param Array $animationCommands - an array of the generated animation
   *                                    commands
   *         Array $command.values - values of the original node after split
   *         Array $command.leftValues - values of left node
   *         Array $command.rightValues - values of right node
   *  @return Array - the updated list of generated commands
   */ 
   function renderSplitNode(animationCommands, selectedNodeID,
                            values, leftValues, rightValues) {
     const firstChildIndex = 0;
     const secondChildIndex = 1;
     const selectedNode = bPlusTree.bPlusTreeRoot;


     //update B-plus-tree datastructure
     selectedNode.setValues(values);
     createChild(bPlusTree.bPlusTreeRoot, leftValues, firstChildIndex,
                 objectIndex++, objectIndex++);
     createChild(bPlusTree.bPlusTreeRoot, leftValues, secondChildIndex,
                 objectIndex++, objectIndex++);

     //animate visuals
     createNode(animationCommands, getChild(selectedNode, firstChildIndex, 0));
     createNode(animationCommands, getChild(selectedNode, secondChildIndex, 0));
     addStep(animationCommands);


     return(animationCommands);
   }


  /*------------------------------------*\
    #RETURN-View-OBJECT
  \*------------------------------------*/
  return {
    objectIndex, bPlusTree,


    /**
     *  @desc - a function for animating a list of model commands
     *  @param Array $modelCommands - a array of model command objects to animate
     *         Array $animationCommands - a list of animation library commands
     *                                    for use with recursive calls
     *  @return bool - on success return true else false
     */ 
    animate: function(modelCommands, animationCommands = [], selectedNodeID = 0) {
      //variable declaration
      let command = {};


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
                       selectedNodeID);
      } else if (command.name == "createNode") {
        renderCreateNode(animationCommands, command.values);
      } else if (command.name == "createRoot") { 
        renderCreateRoot(animationCommands, command.values);
      } else if (command.name == "examineNode") {
        renderHighlightNode(animationCommands, selectedNodeID);
      } else if (command.name == "changeNodeValues") {
        renderChangeNodeValues(animationCommands, selectedNodeID, command.values);
      } else if (command.name == "splitNode") {
        renderSplitNode(animationCommands,
                        selectedNodeID,
                        command.values,
                        command.leftValues,
                        command.rightValues);
      } else {
        return(false);
      }


      this.animate(modelCommands, animationCommands, selectedNodeID);
      return(true);
    }
  }
}





/*------------------------------------*\
  #MODEL-COMMANDS-DESCRIPTION
\*------------------------------------*/

/**
 * ***IMPORTANT-NOTE***
 * As I implement these commands I am sure that the details will change. I will
 * update this list as things are finalized.
 *
 * ***JSON-OBJ-STRUCTURE***
 * { 
 *   "name":"$name",
 *   "value":"$value",
 *   "valueIndex":"$valueIndex",
 * }  
 * 
 * ***COMAND-LIST***
 * @common-parameters - $name - the name of the command 
 *                      $value - value to insert or delete
 *
 * CREATE-ROOT
 * { "name":"createNode", "value":1 }
 *
 * EXAMINE-CHILD
 * @description - This command is used to navigate the B+ Tree. Whenever a 
 *                nodes values are being examined this should be queued first.
 * @parameters $child - The index of the branch to examine. If it is the first
 *                      command in the queue child is not required.
 * { "name":"examineChild", "child":"0"}
 *
 * EXAMINE-PARENT
 * @description - This command is used to navigate the B+ Tree. 
 * @usage - parent of the last node operated on needs to be updated/examined
 * { "name":"examineParent" }
 * 
 * CHANGE-NODE-VALUES
 * @description - Sets the values of a node. The values list must be in order.
 * @parameters - $values - The values to set
 * @usage - this command is pushed whenever a nodes values are updated without
 *          the need for a split or a merge. This includes deleting
 * { "name":"changeNodeValues", "values":[1, 2, ...] }
 *
 * SPLIT-NODE
 * @description - This command will animate a split
 * @parameters $values - The new values of the parent node after the split
 *             $leftValues - The values of the left child node after split
 *             $rightValues - The values of the right child node after split
 * @usage - when a nodes is split push this command to communicate the results 
 *          of the split
 * { "name":"splitNode", "values":[1, 2, ...], "leftValues":[1, 2, ...],
 *   "rightValues":[1, 2, ...] }
 *
 * ********************
 * ***IMPORTANT-NOTE***
 * ********************
 * Everying past this point is very fuzzy and is almost certainly going to change.
 *
 * DELETE-NODE
 * @description - animate the deletion of a node. Do not use this is merge is
 *                going to occur.
 * { "name":"deleteNode" }
 *
 * MERGE-CHILD
 * @description - animate the mergin of a parent node with its child
 * @parameters $values - values of the resulting node.
 * { "name":"mergeChild" "values":[1, 2, ...]}
 *
 */

