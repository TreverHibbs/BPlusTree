var assert = chai.assert;


//declare variables for testing
var commands = [];


describe('cmdConverter.js', function () {
  before(function () {
    ctx.clearRect(0, 0, 900, 600);
    var objectManager = new ObjectManager();
    var animationManager = new AnimationManager(objectManager);
  });

  describe('createCommand()', function() {
    it('Should result in hello<;>world', function() {
      var string1 = "hello";
      var string2 = "world";
      
      assert.equal(createCommand(string1, string2), "hello<;>world",
                   "cmdConverter returns new animation command");
    });
  });


  describe('createNode()', function() {
    it('Should result in a root node being created with three vlalues', function() {
      
      var animationCommands = [];
      bPlusTree = BPlusTree();
      bPlusTree.bPlusTreeRoot = BPlusTreeNode();
      bPlusTree.bPlusTreeRoot.pushValue(1);
      bPlusTree.bPlusTreeRoot.pushValue(2);
      bPlusTree.bPlusTreeRoot.pushValue(3);
      bPlusTree.bPlusTreeRoot.setID(0); 

      console.log(bPlusTree.bPlusTreeRoot.getValues());
      console.log(bPlusTree.bPlusTreeRoot.getValues);

      createNode(animationCommands, bPlusTree.bPlusTreeRoot);
                 
      console.log(animationCommands);
      console.log(bPlusTree.bPlusTreeRoot.getValues());

      animationManager.StartNewAnimation(animationCommands);

    });
  });
});





/* OLD TESTS */

//command = createCommand("CreateBTreeNode",idIndex , WIDTH_PER_ELEM, NODE_HEIGHT, 1, STARTING_X, STARTING_Y, BACKGROUND_COLOR,  FOREGROUND_COLOR);
//commands = [];
//commands[0] = command;
//command = createCommand("SetText", idIndex, 1, 0);
//commands[1] = command;
//console.log(command);

//animationManager.StartNewAnimation(commands);

//STARTING_X = 70; //STARTING_Y = 80;
//
//var slider = document.getElementById("speedSlider");
//
//
//var canvas = document.getElementById("myCanvas");
//var ctx = canvas.getContext("2d");
//ctx.fillStyle = "#FF0000";
//ctx.fillRect(390, 0, 80, 80);
//
////create path
//ctx.lineWidth = 10;
//ctx.moveTo(450, 300);
//ctx.lineTo(600, 200);
//ctx.stroke();
//
//myBTreeNode = new AnimatedBTreeNode(0, 10, 10, 1, "white", "red");
//myBTreeNode.x = 400;
//myBTreeNode.y = 300;
//myBTreeNode.draw(ctx);
//
//ctx.clearRect(0, 0, 900, 600);
//
//
//myObjectManager = new ObjectManager();
//myAnimationManager = new AnimationManager(myObjectManager);
//
////method arguments ObjectID, widthPerElem, height, numElems, backgroundColor, forgroundColor
//myObjectManager.addBTreeNode(0, 20, 10, 1, "white", "red"); 
//myObjectManager.setNodePosition(0, STARTING_X, STARTING_Y);
//
//moveCommand = "MOVE<;>0<;>300<;>450";
//commands = [moveCommand];
//
//slider.oninput = function() {
//  slider.speed = this.value;
//}
//
//slider.speed = DEFAULT_SPEED;
//myAnimationManager.SetSpeed(slider.speed);
//
//myAnimationManager.StartNewAnimation(commands);
//

