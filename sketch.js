let ctx;

function setup() {
  // put setup code here
  createCanvas(window.innerWidth, window.innerHeight)
  ctx = canvas.getContext("2d");
  background(51)
  noStroke();
  data.push(ctx.getImageData(0,0,width,height))
}

let data = [],
	redo_data = [],
	undo_done,
	prev_put_data,
	prev_fill = {},
	drawnSomething,
	brushSize = 20,
	brushColor = "red";


function draw() {

  if(data[1] && prev_put_data !== data[data.length - 1])
  {
  	prev_put_data = data[data.length-1];
  	ctx.putImageData(prev_put_data,0,0);
  	console.log("data put", prev_put_data);
  }
  if(mouseIsPressed && JSON.stringify(prev_fill) !== JSON.stringify({mouseX,mouseY,brushSize,brushColor}))
  {
	fill(brushColor)
  	ellipse(mouseX,mouseY,brushSize,brushSize);
  	prev_fill = {mouseX,mouseY,brushSize,brushColor};
  	drawnSomething = true;
  	if(undo_done == true)
  	{
		// redo_data array must be flushed when we make changes after using undo
  		redo_data.length = 0;
  	}
	console.count("loop");
  }
}


function mouseDragged()
{
	fill(brushColor)
	ellipse(mouseX,mouseY,brushSize,brushSize);
	// console.log(mouseX,mouseY)
	prev_fill = {mouseX,mouseY,brushSize,brushColor};
	drawnSomething = true;
	if(undo_done == true)
	{
		// redo_data array must be flushed when we make changes after using undo
		redo_data.length = 0;
	}
	console.count("function");
}

window.onkeydown = (e) =>
{

	if(e.ctrlKey == true && e.key == "y" && redo_data.length > 0){
		let imageData = redo_data[redo_data.length-1];
		ctx.putImageData(imageData,0,0);
		data.push(redo_data.pop());
		// redo_data array must be flushed when we make changes after using undo
	}
	if(e.ctrlKey == true && e.key == "z" && data.length > 1){
		let imageData = data[data.length-2];
		ctx.putImageData(imageData,0,0);
		redo_data.push(data.pop());
		undo_done = true;
	}
}

function mouseReleased()
{
	// FIXED ISSUE :: data get pushed irrespective of wether we have drawn anything or not
	if(drawnSomething)
	{
		data.push(ctx.getImageData(0,0,width,height));
		drawnSomething = false;
	}
}

function mouseWheel(event)
{
	if(event.delta == 100 && event.shiftKey == true)
	{
		// downward motion of mouse wheel
		brushSize--;
	}
	if(event.delta == -100 && event.shiftKey == true)
	{
		// upward motion of mouse wheel
		brushSize++;
	}
	if(brushSize < 1){
		brushSize = 1;
	}
	if(brushSize > 100){
		brushSize = 100;
	}
}

/*

this version uses 'mousedown' event but using 'mouseover' event can be better

todo

draw line between checkpoint using distance formula

if in brush mode the coordinates and radius are same dont draw ellipse another time;

make UI for using stokeCap Join etc
*/