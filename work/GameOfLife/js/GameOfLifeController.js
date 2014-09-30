/*
$(document).on("click", "#accelerate", function(){
	clearInterval(interval);
  	if (speed > 16 ){
   		speed /= 2;
		if (speed <= 16){
			$("#accelerate")[0].disabled = true;
		}
		if (speed <= 8000){
			$("#decelerate")[0].disabled = false;
		}
		if ($("#start").text() == "Pause"){
			update();
		}
		showPeriod();
	}
});

$(document).on("click","#decelerate",function(){
	clearInterval(interval);
  	if (speed < 8000 ){
   		speed *= 2;
		if (speed >= 8000){
			$("#decelerate")[0].disabled = true;
		}
		if (speed > 16){
			$("#accelerate")[0].disabled = false;
		}
		if ($("#start").text() == "Pause"){
			update();
		}
		showPeriod();
	}
});

$(document).on("click", "#more", function(){
	gamePause();
	if (width < 80){
   		width += 8;
   		height += 6;
		if (width >= 80){
			$("#more")[0].disabled = true;
		}
		if (width > 8){
			$("#less")[0].disabled = false;
		}
   		initializeRandom(0.25);
		showSize();
   	}  	
});

$(document).on("click", "#less", function(){
	gamePause();
	if (width > 8){
   		width -= 8;
   		height -= 6;
		if (width <= 8){
			$("#less")[0].disabled = true;
		}
		if (width < 80){
			$("#more")[0].disabled = false;
		}
   		initializeRandom(0.25);
		showSize();
   	}  	
});
*/

//Mouse event: Start button
$(document).on("click", "#start", function(){
	if ($("#start").text() == "Start"){
		gameStart();
	}
	else{
		gamePause();
	}
});

//Mouse event: Random button
$(document).on("click", "#random", function(){
	gamePause();
	initializeRandom(0.25);
});

//Mouse event: Clear button
$(document).on("click", "#clear", function(){
	gamePause();
	initalizeGrid();
	draw(grid);
});

//Mouse event: Click on the board
//Change status of the clicked cell
$(document).on("click", "#grid", function(e){
	if ($("#start").text() == "Pause"){
		return false;
	}
	x = e.offsetX
	y = e.offsetY
	pos = getPos(x, y);
	if (grid[pos.x][pos.y] == 1){
		grid[pos.x][pos.y] = 0;
	}
	else{
		grid[pos.x][pos.y] = 1;
	}
	draw(grid);
});

//Slider Controller
$(function(){
    $("#periodSlider").slider({
		min: 4,
		max: 13,
		value: 7,
		slide: function( event, ui ){
			speed = Math.pow(2, ui.value);
			showPeriod();
			if ($("#start").text() == "Pause"){
				clearInterval(interval);
				update();
			}
		}
    });
	
	$("#sizeSlider").slider({
		min: 8,
		max: 80,
		step: 8,
		value: 24,
		slide: function( event, ui ){
			gamePause();
			width = ui.value;
			height = width / 8 * 6;
			initializeRandom(0.25);
			showSize();
		}
    });
});