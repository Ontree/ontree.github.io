
var PLAYGROUND_HEIGHT=300, PLAYGROUND_WIDTH=450,REFRESH_RATE=70, BLOCK_LEN=6;
var GAMEOVER = false, GAMESRART = 0;
var MAX_X=(PLAYGROUND_WIDTH-PLAYGROUND_WIDTH%BLOCK_LEN)/BLOCK_LEN;
var MAX_Y=(PLAYGROUND_HEIGHT-PLAYGROUND_HEIGHT%BLOCK_LEN)/BLOCK_LEN;
var D_BODY_BLOCK = 4;//吃一块食物增加的长度
var PI = 3.1415926;
var flag=0;
var targetNumber= ['green','blue'];


//游戏组织

	


//游戏背景画面
var background1 = new $.gameQuery.Animation({imageURL: "space.jpg"});

//音效
var click_1 = $('<audio id="click_1" src="click_1.mp3">');
$("body").append(click_1);


//玩家对象
var playerAni=['blue', 'white', 'green'];
playerAni['green'] = new $.gameQuery.Animation({imageURL: "greenBody.png"});
playerAni['blue'] = new $.gameQuery.Animation({imageURL: "blueBody.png"});
playerAni['white'] = new $.gameQuery.Animation({imageURL: "whiteBody.png"});

function playerBody(node, di, body_Id, c){
	this.node = node;
	var direction = di;
	var speed = BLOCK_LEN;
	var isNew = true;
	if (body_Id == 0)
		isNew = false;
	var bodyId=body_Id;
	this.color = c;
	this.updatePosition = function(){
		if (isNew){
			return (isNew = false);
		}
		switch (direction){
			case 'left': 
				this.node.x(this.node.x()-speed);
				break;
			case 'right':
				this.node.x(this.node.x()+speed);
				break;
			case 'up':
				this.node.y(this.node.y()-speed);
				break;
			case 'down':
				this.node.y(this.node.y()+speed);
				break;
			default:
				break;
		}
		if (bodyId){		
			return;
		}
	};
	this.updateDirection = function(){
		if (!bodyId){
			direction = thePlayer.getDirection();
		}
		else{
			direction = $("#playerBody_"+ (bodyId - 1))[0].playerBody.getDirection();
		}
	}
	this.getDirection = function(){
		return(direction);
	}
	this.toWhiteColor = function(c){
		if (this.color == c){
			this.color = 'white';
			this.node.setAnimation(playerAni[this.color], function(node){});
		}
	}
}

function player(){
	var length = 0;
	var direction = 'right';
	//speed = 3;
	var lenToAdd = 1;
	var color = 'white';
	this.addBody = function(){ 
		if (!lenToAdd){
			return;
		}
		if (length == 0){
			var pox = 3*BLOCK_LEN;
			var poy = 3*BLOCK_LEN;
			var direction = 'right';
		}
		else{
			var pox = $('#playerBody_'+(length-1)).x();
			var poy = $('#playerBody_'+(length-1)).y();
			var direction = $('#playerBody_'+(length-1))[0].playerBody.getDirection();
		}
		$("#player").addSprite("playerBody_"+length,{animation: playerAni[color], width: BLOCK_LEN, height: BLOCK_LEN, posx: pox, posy: poy});
		$("#playerBody_"+length).addClass("playerBody");
		$("#playerBody_"+length)[0].playerBody = new playerBody($("#playerBody_"+length), direction,length,color);
		$("#playerBody_"+length).css("background-size", ""+BLOCK_LEN+'px '+BLOCK_LEN+'px');
		length++;
		lenToAdd--;
	}
	this.addBody();

	this.update = function(){
		for (var i=0;i<length;i++){
			$('#playerBody_'+i)[0].playerBody.updatePosition();
		}
		for (var i=length-1; i>=0; i--){
			$('#playerBody_'+i)[0].playerBody.updateDirection();
		}
		this.addBody();
	}

	this.eatFood = function(c){ 
		if (c !='special'){
			color = c;
			lenToAdd += D_BODY_BLOCK;
			this.addBody();
		}
		else{
			theBalls.addBall();
		}
	}

	this.getLength = function(){
		return length;
	}

	this.getDirection = function(){
		return(direction);
	}

	this.setDirection = function(dir){
		switch(direction){
			case 'left':
				if (dir != 'right')
					direction = dir;
				break;
			case 'right':
				if (dir != 'left')
					direction = dir;
				break;
			case 'up':
				if (dir != 'down')
					direction = dir;
				break;
			case 'down':
				if (dir != 'up')
					direction = dir;
				break;
		}
	}

}





//食物对象
var foodAni =['green','blue','special'];
foodAni['green'] = new $.gameQuery.Animation({imageURL: "greenFood.png"});
foodAni['blue'] = new $.gameQuery.Animation({imageURL: "blueFood.png"});
foodAni['special'] = new $.gameQuery.Animation({imageURL: "specialFood.png"});
function food(){
	this.addFood = function(){
		var ran = Math.random();
		var color;
		if (ran<0.4 && targetNumber['green']>0){
			color = 'green';
		}
		else{
			if (ran < 0.8 && targetNumber['blue']>0){
				color = 'blue';
			}
			else
				color = 'special';
		}
		while(true){
			var pox = Math.ceil(Math.random() * MAX_X - 1)*BLOCK_LEN;
			var poy = Math.ceil(Math.random() * MAX_Y - 1)*BLOCK_LEN;
			$("#foods").addSprite("food",{animation: foodAni[color], width: BLOCK_LEN, height: BLOCK_LEN, posx: pox, posy: poy});
			$("#food").addClass('color');
			$("#food")[0].color = color;
			var collided = $("#food").collision(".gQ_group,.playerBody,.wall,.target");
			if(collided.length > 0){
				flag +=1;
				$("#food").remove();
			}
			else {
				break;
			}
		}

	}
}






//墙对象
function wall(){
	this.createWall = function(){
		$("#walls").addSprite("wall_"+0,{animation: wallAni, width: PLAYGROUND_WIDTH, height: BLOCK_LEN, posx: 0, posy: 0});
		$("#walls").addSprite("wall_"+1,{animation: wallAni, width: BLOCK_LEN, height: PLAYGROUND_HEIGHT, posx: 0, posy: 0});
		$("#walls").addSprite("wall_"+2,{animation: wallAni, width: BLOCK_LEN, height: PLAYGROUND_HEIGHT, posx: (MAX_X-1)*BLOCK_LEN, posy: 0});
		$("#walls").addSprite("wall_"+3,{animation: wallAni, width: PLAYGROUND_WIDTH, height: BLOCK_LEN, posx: 0, posy: (MAX_Y-1)*BLOCK_LEN});
		for (var i = 0; i < 4; i++)
			$('#wall_'+i).addClass("wall");
	}
}
//创建墙
var wallAni = new $.gameQuery.Animation({imageURL: "wall.png"});




//ball对象
function ball(node,s){
	var speed = s;
	var angle = Math.random() * 2* PI;
	this.node = node;
	var color = 'white';
	var deStackFlow = 0;
	this.setColor = function(c){
		color = c;
	}
	this.update = function(){
		if (deStackFlow>20){
			this.node.remove();
		}
		var dx = Math.round(speed*Math.cos(angle));
		var dy = -Math.round(speed*Math.sin(angle));
		if (Math.abs(dx) <= 1 || Math.abs(dy) <= 1){
			angle = Math.random() * 2* PI;
			deStackFlow++;
			return;
		}
		this.node.x(this.node.x()+dx);
		this.node.y(this.node.y()+dy);
		if (this.node.x()>PLAYGROUND_WIDTH||this.node.x()<0||this.node.y()>PLAYGROUND_HEIGHT ||this.node.y()<0){
			deStackFlow++;
			angle = PI+angle; 
			if (this.node.x()>PLAYGROUND_WIDTH)
				this.node.x(PLAYGROUND_WIDTH-7);
			if (this.node.x()<0)
				this.node.x(7);
			if (this.node.y()>PLAYGROUND_HEIGHT)
				this.node.y(PLAYGROUND_HEIGHT-7);
			if (this.node.y()<0)
				this.node.y(7);
		}

		//碰碎target
		var collided = this.node.collision(".gQ_group, .target");
		collided.each(function(){
      		if(this.target.color == color){
      			targetNumber[this.target.color]--;
      			if (targetNumber[this.target.color] == 0){	//改变身体和食物颜色
      				var cod = $('.playerBody');
      				for (var i =0 ;i < cod.length; i++){
      					cod[i].playerBody.toWhiteColor(this.target.color);
      				}
      				if ($('#food')[0].color == this.target.color){
      					$('#food').remove();
      					theFood.addFood();
      				}
      			}
      			var name = this.id;
      			name = name.replace(/target/, "targetLight");
      			$("#"+name).remove();
      			this.remove();
      		}
      	});

		//碰撞
		var collided = this.node.collision(".gQ_group, .playerBody, .wall, .target");
		
		for (var i = 0; i < collided.length; i++){   //碰撞到player
		    var cod = collided[i];
      		if(cod.playerBody){
      			if (cod.playerBody.color !='white'){
      				color = cod.playerBody.color;
      				this.node.setAnimation(ballAni[color], function(node){});
      				var name = (this.node)[0].id;
      				name = name.replace(/ball/, "ballLight");
      				$("#"+name).setAnimation(ballAni[color], function(node){});
      			}
      		}
		}	

		if (collided.length > 0){
			if (deStackFlow ==0){
				//debugger;
				$('#click_1')[0].load();
				$('#click_1')[0].play();
			}
			deStackFlow++;
			var cod = $(collided[0]);
			var cx = cod.x();
			var cy = cod.y();
			var wid = cod.width();
			if (collided.length >2){
				angle = PI+angle;
				this.update();
				return;
			}
			if (collided.length >1){
				if (collided[0].playerBody && collided[1].playerBody){  //蛇身中间
					cod = $(collided[1]);
					if(cx!=cod.x())
						wid = 2* wid;
					if (cx >cod.x())
						cx = cod.x();
					if (cy > cod.y())
						cy = cod.y();
				}
				else{
					angle = PI+angle;
					this.update();
					return;

				}
			}
			if (dx >=0 && dy>=0){
				if (this.node.x()< cx){
					angle = PI-angle;
					this.update();
				}
				else{
					angle = 0-angle;
					this.update();
				}
				return;
			}
			if (dx >=0 && dy<0){
				if (this.node.x()< cx){
					angle = PI-angle;
					this.update();
				}
				else{
					angle = 0-angle;
					this.update();
				}
				return;
			}
			if (dx <0 && dy<0){
				if (this.node.x()+BLOCK_LEN< cx+wid){
					angle = 0-angle;
					this.update();
				}
				else{
					angle = PI-angle;
					this.update();
				}
				return;
			}
			if (dx <0 && dy>=0){
				if (this.node.y()< cy){
					angle = 0-angle;
					this.update();
				}
				else{
					angle = PI-angle;
					this.update();
				}
				return;
			}
		}
		deStackFlow = 0;
	}
}
function balls(){
	var speed = 5.4;
	var number = 0;
	var wid = 6;
	this.addBall = function(){
		while(true){
			var pox = Math.round(Math.random() * PLAYGROUND_WIDTH);
			var poy = Math.round(Math.random() * PLAYGROUND_HEIGHT);
			$("#balls").addSprite("ball_"+number,{animation: ballAni['white'], width: wid, height: wid, posx: pox, posy: poy});
			var collided = $("#ball_"+number).collision(".gQ_group,.playerBody,.wall,.target");
			if(collided.length > 0){
				$("#ball_"+number).remove();
			}
			else {
				break;
			}
		}
		$('#ball_'+number).addClass("ball");
		$('#ball_'+number)[0].ball = new ball($('#ball_'+number), speed);
		$('#ball_'+number).css("background-size", "6px 6px");

		$("#balls").addSprite("ballLight_"+number,{animation: ballAni['white'], width: BLOCK_LEN+4, height: BLOCK_LEN+4, posx: pox-2, posy: poy-2});
		$('#ballLight_'+number).css("background-size", "10px 10px");
		$('#ballLight_'+number).addClass("ballLight");
		$('#ballLight_'+number).css("opacity","0.5");
		number++;
	}
	this.update = function(){
		for (var i = 0; i < number;i++){
			$('#ball_'+i)[0].ball.update();
			x1 = $('#ball_'+i).x();
			y1 = $('#ball_'+i).y();
			$('#ballLight_'+i).x(x1-2);
			$('#ballLight_'+i).y(y1-2);
		}
	}
	this.addBall();
}
var ballAni =['green','blue','white','whiteLght'];
ballAni['green']=new $.gameQuery.Animation({imageURL: "greenBall.png"});
ballAni['blue']=new $.gameQuery.Animation({imageURL: "blueBall.png"});
ballAni['white']=new $.gameQuery.Animation({imageURL: "whiteBall.png"});



//目标块
var targetAni =['green','blue'];
targetAni['green'] = new $.gameQuery.Animation({imageURL: "greenTarget.png"});
targetAni['blue'] = new $.gameQuery.Animation({imageURL: "blueTarget.png"});
targetAni['yellow'] = new $.gameQuery.Animation({imageURL: "yellowTarget.png"});
targetAni['yellowLight'] = new $.gameQuery.Animation({imageURL: "yellowLight.png"});
targetAni['blueLight'] = new $.gameQuery.Animation({imageURL: "blueLight.png"});
targetAni['greenLight'] = new $.gameQuery.Animation({imageURL: "greenLight.png"});

function target(node, c){
	this.node = node;
	this.color = c;
	this.damage = function(){
		this.remove();
	} 
}


function targets(){
	var number = 0;
	this.addTarget = function(block_x, block_y, block_width, block_height, color){
		$("#targets").addSprite("target_"+number,{animation: targetAni[color], width: block_width*BLOCK_LEN, height: block_height*BLOCK_LEN, posx: block_x*BLOCK_LEN, posy: block_y*BLOCK_LEN});	
		$('#target_'+number).addClass("target");
		$('#target_'+number)[0].target = new target($('#target_'+number), color);
		$('#target_'+number).css("background-size", ""+(block_width*BLOCK_LEN)+'px '+ (block_height*BLOCK_LEN)+'px');

		$("#targets").addSprite("targetLight_"+number,{animation: targetAni[color+'Light'], width: block_width*BLOCK_LEN+22, height: block_height*BLOCK_LEN+22, posx: block_x*BLOCK_LEN-11, posy: block_y*BLOCK_LEN-11});	
		$('#targetLight_'+number).css("background-size", ""+(block_width*BLOCK_LEN+22)+'px '+ (block_height*BLOCK_LEN+22)+'px');
		//$('#targetLight_'+number).css("opacity","0.5");
		number++;

	}
}


//更新
$("#playground").registerCallback(function(){ 
	if (GAMEOVER || GAMESRART != 2){
		return;
	}
	thePlayer.update();
	theBalls.update();
    //撞实了
    var collided = $("#playerBody_0").collision(".gQ_group, .playerBody, .wall, .target");
    if(collided.length > 0){
    	collided.each(function(){
    			GAMEOVER = true;
    	}) 
    }



    //吃东西
   	var collided = $("#playerBody_0").collision(".gQ_group, #food");
   	if(collided.length > 0){
   		collided.each(function(){
   			if(this.id =="food"){
   				thePlayer.eatFood(this.color);
   				this.remove();
   				theFood.addFood();
   			} 
   		})
   	}




}, REFRESH_RATE);


//键盘操作
$(document).keydown(function(e){
	switch(e.keyCode){
		case 66:
			theBalls.addBall();
			break;
		case 37:
			thePlayer.setDirection('left');
			break;
		case 38:
			thePlayer.setDirection('up');
			break;
	    case 39:
			thePlayer.setDirection('right');
			break;
	    case 40:
		 	thePlayer.setDirection('down');
			break;
	}
	if (GAMESRART == 1 && e.keyCode >=37 && e.keyCode <= 40){
		GAMESRART = 2;
		thePlayer.eatFood('white');
	}
});


var theWall, thePlayer, theTargets, theFood, theBalls;
function setGame(){ 
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
	.addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("foods", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("balls", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("targets", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("walls", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("player", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end();
	$("#background")
     .addSprite("background1", {animation: background1, 
             width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
}

function toStartGame(n){
	theWall = new this.wall();
	theWall = undefined;
	theWall = new this.wall();
	theWall.createWall();
	thePlayer = new this.player();
	theTargets = new this.targets();
	theFood = new this.food();
	switch(n){           //设定关卡
		case 1:
			theTargets.addTarget(20,20,15,15,'blue');
			theTargets.addTarget(40,40,10,17,'green');
			targetNumber['green'] = 1;
			targetNumber['blue'] = 1;	
			break;
	}
	theFood.addFood();
	theBalls = new this.balls();
	GAMEOVER =false;
}

//点击开始游戏

$("#startbutton").click(function(){
	setGame();
    $.playground().startGame(function(){
    	toStartGame(1);
        $("#welcomeScreen").fadeTo(1000,0,function(){
        	$(this).remove();
        });
        GAMESRART =1;
    });
})

$("#replay").click(function(){
	$.playground().clearAll();
	$('#gQ_scenegraph').remove();
	GAMEOVER =true;
	setGame();
    $.playground().startGame(function(){
    	toStartGame(1);
        //$("#welcomeScreen").fadeTo(1000,0,function(){
        //	$(this).remove();
        //});
        GAMESRART =1;
    });
})