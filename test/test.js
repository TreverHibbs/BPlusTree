var assert = chai.assert;

var string1 = "hello";
var string2 = "world";

describe('String', function() {
  it('should start empty', function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
    
    objectManager = new ObjectManager();
    animationManager = new AnimationManager(objectManager);
   
    command = createCommand("CreateBTreeNode",idIndex , WIDTH_PER_ELEM, NODE_HEIGHT, 1, STARTING_X, STARTING_Y, BACKGROUND_COLOR,  FOREGROUND_COLOR);
    commands = [];
    commands[0] = command;
    command = createCommand("SetText", idIndex, 1, 0);
    commands[1] = command;
    console.log(command);
    
    animationManager.StartNewAnimation(commands);
    var string1 = "hello";
    var string2 = "world";
    
    assert.equal(createCommand(string1, string2), "hello<;>world",
                 "cmdConverter returns new animation command");
  });
});

