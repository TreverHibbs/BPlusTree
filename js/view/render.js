/**
 * @desc this file is for parsing render
 *       commands and executing the right animations
 * @author Trever Hibbs treverhibbs@gmail.com
*/


/*
 * CONTENTS
 *
 * RENDER-FUNCTIONS
 *
 */





/*------------------------------------*\
  #RENDER-FUNCTIONS
\*------------------------------------*/

/**
 *  @desc creates a list of commands for the creation a BTree root.
 *  @param Array $commands - an Array of animation libaray commands.
 *         int $value - the value of the root node,
 *  @return Array - the updated list of generated commands
 */ 
function renderAddValue(animationCommands, value, valueIndex) { 
  addValue(animationCommands, value, valueIndex);

  return(animationCommands);
}

/**
 *  @desc Returns list of animation commands for the creation of a node
 *  @param int $value - the value of the root node,
 *  @return Array - the updated list of generated commands
 */ 
function renderCreateNode(animationCommands, value) { 
  createNode(animationCommands, value);

  return(animationCommands);
}
