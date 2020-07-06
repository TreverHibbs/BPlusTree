/**
 * @desc This file will hold functions for interfacing with the model per 
 * the mvc design pattern specifications.
 * @author Trever Hibbs treverhibbs@gmail.com
*/





//canvas initialization
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


objectManager = new ObjectManager();
animationManager = new AnimationManager(objectManager);



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
