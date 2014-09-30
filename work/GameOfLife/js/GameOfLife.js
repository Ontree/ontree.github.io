var width = 24, height = 18, speed = 128;
var oldGrid = new Array();
var oldHeight = 0;
var grid = new Array();
var interval;
var cxt;

function showPeriod(){
	$("#period").text("Simulate period: " + speed + " ms");
}

function showSize(){
	$("#size").text("Board size: " + height + " * " + width);
}

function gameStart(){
	$("#message").text("Game Processing");
	$("#start").text("Pause");
	update();
}

function gamePause(){
	$("#message").text("Game Paused");
	$("#start").text("Start");
	clearInterval(interval);
}

function initalizeGrid(){
	grid = new Array(height);
	for (var i = 0; i < height; ++i){
		grid[i] = new Array(width);
		for (var j = 0; j < width; ++j){
			grid[i][j] = 0;
		}
	}
}

function initializeRandom(lifeRatio){
	initalizeGrid();
	for (var i = 0 ; i < height; i++){
		for (var j = 0; j < width; j++){
			if (Math.random() < lifeRatio){
				grid[i][j] = 1;
			}
			else{
				grid[i][j] = 0;
			}
		}
	}
	draw(grid);
}

function nextGeneration(){
	var newGrid = new Array();
	for (var i = 0; i < height; i++){
		newGrid[i] = new Array();
	}
   	for (var i = 0; i < height; i++){
   		for (var j = 0; j < width; j++){
   			var LifeNum = 0;
   			for (var k = -1; k <= 1; k++){
   				for (var l = -1; l <= 1; l++){
   					if (k != 0 || l != 0){
   						var x = (i + k + height) % height;
   						var y = (j + l + width) % width;
   						if (grid[x][y])
   							LifeNum++;
   					}
   				}
   			}
   			switch (LifeNum){
   			case 2:
   				newGrid[i][j] = grid[i][j];
   				break;
   			case 3:
   				newGrid[i][j] = 1;
   				break;
   			default:
   				newGrid[i][j] = 0;
   			}
   			
   		}
   	}
   	for (var i = 0; i < height; i++){
   		grid[i] = newGrid[i].concat();
    }
	draw(grid);
}

function testNextGeneration(testGrid){
	height = testGrid.length;
	width = testGrid[0].length;
	grid = new Array();
    for (var i = 0; i < height; i++){
   		grid[i] = testGrid[i].concat(); 
   	}
    nextGeneration();
    return(grid);
}

function update(){
	clearInterval(interval);
	interval = setInterval(nextGeneration, speed);	
}

$(document).ready(function(){
	oldGrid[0] = new Array();
	initalizeGrid();
	draw(grid);
	showPeriod();
	showSize();
});

