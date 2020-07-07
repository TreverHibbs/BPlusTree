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



