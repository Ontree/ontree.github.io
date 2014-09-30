var borderOffset = 4;
var gridSize;

function draw(grid){
	if (grid == "undefined"){
		alert("Big Error!");
	}
	
	var redraw = false;
	if (oldGrid.length != grid.length || oldGrid[0].length != grid[0].length){
		redraw = true;
		oldGrid = new Array();
		for (var i = 0; i < grid.length; ++i){
			oldGrid[i] = new Array();
		}
	}
	
	var DeadColor = "#DDDDDD"; //Colour for dead cells
	var AliveColor = "#FF0000"; //Colour for alive cells
	
	var gridHeight = grid.length; //Number of grids per column
	var gridWidth = grid[0].length; //Number of grids per row
	var lineWidth = Math.max(1, 4 - parseInt(gridHeight / 10));
	
	//Calculate the size of canvas
	var screenHeight = parseInt($(window).height() * 0.9);
	var canvasHeight = parseInt((screenHeight - lineWidth) / gridHeight) * gridHeight + lineWidth;
	gridSize = (canvasHeight - lineWidth) / gridHeight; //Size of every grid
	var canvasWidth = gridSize * gridWidth + lineWidth;
	canvasHeight += borderOffset * 2;
	canvasWidth += borderOffset * 2;
	
	$(".page").css("width", 250 + canvasWidth);
	
	if (oldHeight != screenHeight){
		redraw = true;
		oldHeight = screenHeight;
	}
	
	//Draw
	
	if (redraw){
		var c = $("#grid");
		c.attr("height", canvasHeight);
		c.attr("width", canvasWidth);
		cxt = c.get(0).getContext("2d");
	}
	
	for (var i = 0; i < gridHeight; ++i){
		for (var j = 0; j < gridWidth; ++j){
			if (redraw || oldGrid[i][j] != grid[i][j]){
				cxt.beginPath();
				if (grid[i][j] == 1){
					cxt.fillStyle = AliveColor;
				}
				else{
					cxt.fillStyle = DeadColor;
				}
				
				//Calculate the left-top coordinate of grid
				var top = i * gridSize + borderOffset + lineWidth;
				var left = j * gridSize + borderOffset + lineWidth;
				
				cxt.rect(left, top, gridSize - lineWidth, gridSize - lineWidth);
				cxt.fill();
				cxt.closePath();
				
				//Record the old board
				oldGrid[i][j] = grid[i][j];
			}
		}
	}
}

//Calculate the mouse position in board
function getPos(coorX, coorY){
	return {
		y: parseInt((coorX - borderOffset) / gridSize),
		x: parseInt((coorY - borderOffset) / gridSize)
	};
}
