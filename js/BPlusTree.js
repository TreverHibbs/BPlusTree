
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(390, 0, 80, 80);

//create path
ctx.lineWidth = 10;
ctx.moveTo(450, 300);
ctx.lineTo(600, 200);
ctx.stroke();

myBTreeNode = new AnimatedBTreeNode(0, 10, 10, 1, "white", "red");
myBTreeNode.x = 400;
myBTreeNode.y = 300;
myBTreeNode.draw(ctx);

function init() {
    window.requestAnimationFrame(draw);
}

function draw() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";

    ctx.clearRect(0,0,300,300);
    
    ctx.rotate(1*Math.PI / 180);
    ctx.translate(2, 0);
    ctx.fillRect(0, -12, 40, 24);

    ctx.save();

    ctx.restore();

    window.requestAnimationFrame(draw);
}

init();

