
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(390, 0, 80, 80);

//create path
ctx.lineWidth = 10;
ctx.moveTo(450, 300);
ctx.lineTo(600, 200);
ctx.stroke();
