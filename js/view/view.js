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


/**
 *  @desc executes a list of model commands
 *  @param jsonObj $modelCommands - a object containg a list of commands
 *  @return bool - true if commands executed false if invalid commands are sent
 */ 
function view(modelCommands) {
  var animationCommands = [];

  createRoot(animationCommands, modelCommands[0].value) 

  animationManager.StartNewAnimation(animationCommands);
  return(true);
}

