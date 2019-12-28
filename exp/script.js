function setup(){
	// code
	createCanvas(400,400)
	background(45)
}

/*
concept.capitalise()

the void object should be a canvas element and the Canvas class should be a simple rectangle
*/

class Canvas {
	constructor({x, y, width, height, color}){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.beingMoved = false;
		this.mouseHoveringOver = false;
	}

	render = function(){
		fill(this.color);
		noStroke();
		if(this.mouseHoveringOver == true){
			fill(this.color);
		}
		rect(this.x, this.y, this.width, this.height);
	}

	h = window.addEventListener("mousedown", (e)=>
	{
		if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y+this.height)
		{
			this.mouseHoveringOver = true;
			this.beingMoved = true;
			this.offsetX = mouseX - this.x;
			this.offsetY = mouseY - this.y;
		} else
		{
			this.mouseHoveringOver = false;
		}

	});

	b = window.addEventListener("mouseup", (e)=>{
		this.beingMoved = false;
	});
}

let data = [],
	redo_data = [],
	undo_done,
	prev_put_data,
	prev_fill = {},
	drawnSomething,
	brushSize = 20,
	brushColor = "red";

const UIObjects = []

a = new Canvas({x:10,y:10,width:100,height:100,color:"blue"})
UIObjects.push(a);


function draw ()
{
	// code
	background(51)
	for(let i of UIObjects)
	{
		if(mouseX > i.x && mouseX < i.x+i.width && mouseY > i.y && mouseY < i.y+i.height)
		{
			i.mouseHoveringOver = true;
			console.log("got in ")
		} else
		{
			i.mouseHoveringOver = false;
		}
		i.render();
	}
}



function mouseDragged(event)
{
	// we dont need to check for same location since this function is fired on mouse move
	if(a.beingMoved){
		a.x = mouseX - a.offsetX;
		a.y = mouseY - a.offsetY;
	}
	console.log(event)
 	fill(brushColor)
  	noStroke();
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

