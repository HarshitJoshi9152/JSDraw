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
	prev_put_data,
	prev_fill = {},
	drawnSomething,
	brushSize = 20,
	brushColor = "red";
function draw() {
	// if(height !== window.innerHeight || width !== window.innerWidth){
	// 	canvas.width = window.innerWidth;
	// 	canvas.height = window.innerHeight;
	// }
  if(data[1] && prev_put_data !== data[data.length - 1]){
  	prev_put_data = data[data.length-1];
  	ctx.putImageData(prev_put_data,0,0);
  	console.log("data put", prev_put_data);
  }
  if(mouseIsPressed){
  	if(JSON.stringify(prev_fill) !== JSON.stringify({mouseX,mouseY,brushSize,brushColor})){
	  	fill(brushColor)
	  	ellipse(mouseX,mouseY,brushSize,brushSize);
	  	prev_fill = {mouseX,mouseY,brushSize,brushColor};
	  	drawnSomething = true;
  	}
  }
}

window.onkeydown = (e)=>{
	console.log(e)
	if(e.ctrlKey == true && e.key == "ArrowUp"){
		brushSize++;
	}
	if(e.ctrlKey == true && e.key == "ArrowDown"){
		brushSize--;
	}
	if(e.ctrlKey == true && e.key == "z" && data.length > 1){
		let imageData = data[data.length-2];
		ctx.putImageData(imageData,0,0);
		data.length = data.length - 1;
	}
}

window.addEventListener("mouseup", (e)=>{
	// FIXED ISSUE :: data get pushed irrespective of wether we have drawn anything or not
	if(drawnSomething){
		data.push(ctx.getImageData(0,0,width,height));
		drawnSomething = false;
	}
})

// window.addEventListener("mousemove", (e)=>{
//   	console.count("check")
//   	// translate(mouseX,mouseY)
//   	fill(brushColor)
//   	ellipse(mouseX,mouseY,brushSize,brushSize);
//   	// data.push(ctx.getImageData(0,0,width,height));
// });


/*
todo

draw line between checkpoint using distance formula

if in brush mode the coordinates and radius are same dont draw ellipse another time;

make UI for using stokeCap Join etc
*/