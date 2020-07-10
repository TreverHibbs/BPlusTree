/**
 *  @desc - a factory function for creating a B+ tree object
 *  @return Object - a object representing a B+ tree
 */ 
const BPlusTree = function() {
  const bPlusTreeRoot = null;





  return {
    bPlusTreeRoot,

    /**
     *  @desc - a function for animating a list of model commands
     *  @param Array $modelCommands - a array of model command objects to animate
     *         Array $animationCommands - a list of animation library commands
     *                                    for use with recursive calls
     *  @return bool - on success return true else false
     */ 
    get: function() {
      return(true);
    }
  };
}


/**
 *  @desc - a factory function for creating a B+ tree node
 *  @return Object - a object representing a B+ tree
 */ 
const BPlusTreeNode = function() {
  const nodePtr = [];
  const values = [];
  const id = 0;


  return {
    nodePtr, values, 

    setID: function(num) {
      this.id = num;
      return;
    },
    
    pushValue: function(num) {
      this.values.push(num);
    },

    getID: function() {
      return(this.id);
    },

    getValue: function(index) {
      return(this.values[index]);
    },

    getValues: function() {
      return(this.values);
    }

  };
}


/**
 *  @desc - a factory function for creating a B+ tree leaf
 *  @return Object - a object representing a B+ tree
 */ 
const BPlusTreeLeaf = function() {
  const value = [];
  const prevLeaf = null;
  const nextLeaf = null;


  return {
    value, prevLeaf, nextLeaf
  };
}

