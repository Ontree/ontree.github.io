var PLAYGROUND_HEIGHT=600, PLAYGROUND_WIDTH=900,REFRESH_RATE=80, BLOCK_LEN=12;
var GAMEOVER = false, GAMESRART = 0;
var MAX_X=(PLAYGROUND_WIDTH-PLAYGROUND_WIDTH%BLOCK_LEN)/BLOCK_LEN;
var MAX_Y=(PLAYGROUND_HEIGHT-PLAYGROUND_HEIGHT%BLOCK_LEN)/BLOCK_LEN;
var D_BODY_BLOCK = 4;//吃一块食物增加的长度
var PI = 3.1415926;
var flag=0;
var music_click = 0, music_long = 0, playerLevel = 1;
var targetNumber= ['green','blue','yellow'];
var targetTotal = 0, targetOrigin;


//游戏背景画面
var background1 = new $.gameQuery.Animation({imageURL: "image/space.jpg"});




//玩家对象
var playerAni=['blue', 'white', 'green','yellow'];
playerAni['green'] = new $.gameQuery.Animation({imageURL: "image/greenBody.png"});
playerAni['blue'] = new $.gameQuery.Animation({imageURL: "image/blueBody.png"});
playerAni['yellow'] = new $.gameQuery.Animation({imageURL: "image/yellowBody.png"});
playerAni['white'] = new $.gameQuery.Animation({imageURL: "image/whiteBody.png"});

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
	var directionChange = 'right';
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
		direction = directionChange;
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
		$('#eat')[0].play();
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
					directionChange = dir;
				break;
			case 'right':
				if (dir != 'left')
					directionChange = dir;
				break;
			case 'up':
				if (dir != 'down')
					directionChange = dir;
				break;
			case 'down':
				if (dir != 'up')
					directionChange = dir;
				break;
		}
	}

}





//食物对象
var foodAni =['green','blue','special'];
foodAni['green'] = new $.gameQuery.Animation({imageURL: "image/greenFood.png"});
foodAni['blue'] = new $.gameQuery.Animation({imageURL: "image/blueFood.png"});
foodAni['yellow'] = new $.gameQuery.Animation({imageURL: "image/yellowFood.png"});
foodAni['special'] = new $.gameQuery.Animation({imageURL: "image/specialFood.png"});
function food(){
	this.addFood = function(){
		var ran;
		var color="";
		while(color==""){
			ran = Math.random();
			if (ran < 0.3 && targetNumber['green']>0){
				color = 'green';
			}
			else{
				if (ran < 0.6 && targetNumber['blue']>0 && ran >= 0.3){
					color = 'blue';
				}
				else{
					if (ran < 0.9 && targetNumber['yellow']>0 && ran >= 0.6){
						color = 'yellow';
					}
					else{
						if (ran >=0.9)
							color = 'special';
					}
				}
				
			}
		}
		while(true){
			var pox = Math.ceil(Math.random() * MAX_X - 1)*BLOCK_LEN;
			var poy = Math.ceil(Math.random() * MAX_Y - 1)*BLOCK_LEN;
			$("#foods").addSprite("food",{animation: foodAni[color], width: BLOCK_LEN, height: BLOCK_LEN, posx: pox, posy: poy});
			$("#food").addClass('color');
			$("#food").css("background-size", ""+BLOCK_LEN+'px '+BLOCK_LEN+'px');
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
var wallAni = new $.gameQuery.Animation({imageURL: "image/wall.png"});




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
		if (speed == 0){
			return;
		}
		if (deStackFlow>20){
			debugger;
			//theBalls.number--;
			this.node.x(10000);
			this.node.y(10000);
			speed = 0;
			return;
		}
		var dx = Math.round(speed*Math.cos(angle));
		var dy = -Math.round(speed*Math.sin(angle));
		while (Math.abs(dx) <= 2 || Math.abs(dy) <= 2){
			angle = Math.random() * 2* PI;
			dx = Math.round(speed*Math.cos(angle));
			dy = -Math.round(speed*Math.sin(angle));
		}
		this.node.x(this.node.x()+dx);
		this.node.y(this.node.y()+dy);
		if (this.node.x()>PLAYGROUND_WIDTH||this.node.x()<0||this.node.y()>PLAYGROUND_HEIGHT ||this.node.y()<0){
			angle = PI+angle; 
			if (this.node.x()>PLAYGROUND_WIDTH)
				this.node.x(PLAYGROUND_WIDTH-14);
			if (this.node.x()<0)
				this.node.x(14);
			if (this.node.y()>PLAYGROUND_HEIGHT)
				this.node.y(PLAYGROUND_HEIGHT-14);
			if (this.node.y()<0)
				this.node.y(14);
		}

		//碰碎target
		var collided = this.node.collision(".gQ_group, .target");
		collided.each(function(){
      		if(this.target.color == color){
      			targetNumber[this.target.color]--;
      			targetTotal--;
      			if (targetTotal<targetOrigin/2){  //进入激动状态
      				debugger;
      				$('#drum')[0].play();
      				$('.targetLight').each(function(){
      					this.remove();
      				});
      				$('.targetLight_2').each(function(){
      					$(this).css("display","block");
      				});
      			}

      			if (!targetTotal){			//win!
      				if (levelChosen == playerLevel){
      					playerLevel++;
      				 	$('#level_'+playerLevel).removeClass("lock").addClass('level');
      				 	document.cookie="playerLevel="+playerLevel; 
      				}
      				$.playground().clearAll();
					$('#gQ_scenegraph').remove();
					GAMEOVER =true;
					$('#win').css("display","block");
      			}                            
      			if (targetNumber[this.target.color] == 0){	//改变身体和食物颜色
      				var cod = $('.playerBody');
      				for (var i =0 ;i < cod.length; i++){
      					cod[i].playerBody.toWhiteColor(this.target.color);
      				}
      				if ($('#food').length > 0){
      					if ($('#food')[0].color == this.target.color){
      						$('#food').remove();
      						theFood.addFood();
      					}
      				}
      			}
      			var name1 = this.id;
      			var name2;
      			name2 = name1.replace(/target/, "targetLight");
      			var name3 = name2+"_2";
      			var name4 = name1.replace(/target/, "targetRotate");
      			/*$("#"+name2).addClass('targetRemove');
      			$("#"+name1).addClass('targetRemove');
      			$("#"+name1).removeClass("target");*/
      			$("#"+name1).remove();
      			$("#"+name2).remove();
      			$("#"+name3).remove();
      			$("#"+name4).css("display","block");
      			$("#"+name4).setAnimation(targetRotateAni[name4]);

      			$('#long_'+music_long)[0].play();
      			music_long++;
      			music_long = music_long % 4;
      			$('#click_'+music_click)[0].play();
				music_click++;
				music_click = music_click % 29;
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
			if (deStackFlow ==0){// 音效
				//debugger
				$('#click_'+music_click)[0].play();
				music_click++;
				music_click = music_click % 29;
			}
			
			var cod = $(collided[0]);
			var cx = cod.x();
			var cy = cod.y();
			var wid = cod.width();
			if (collided.length >2){
				angle = PI+angle;
				deStackFlow++;
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
					deStackFlow++;
					this.update();
					return;

				}
			}
			if (dx >=0 && dy>=0){
				if (this.node.x()< cx){
					angle = PI-angle;
					deStackFlow++;
					this.update();
				}
				else{
					angle = 0-angle;
					deStackFlow++;
					this.update();
				}
				return;
			}
			if (dx >=0 && dy<0){
				if (this.node.x()< cx){
					angle = PI-angle;
					deStackFlow++;
					this.update();
				}
				else{
					angle = 0-angle;
					deStackFlow++;
					this.update();
				}
				return;
			}
			if (dx <0 && dy<0){
				if (this.node.x()+BLOCK_LEN< cx+wid){
					angle = 0-angle;
					deStackFlow++;
					this.update();
				}
				else{
					angle = PI-angle;
					deStackFlow++;
					this.update();
				}
				return;
			}
			if (dx <0 && dy>=0){
				if (this.node.y()< cy){
					angle = 0-angle;
					deStackFlow++;
					this.update();
				}
				else{
					angle = PI-angle;
					deStackFlow++;
					this.update();
				}
				return;
			}
		}
		deStackFlow = 0;
	}
}
function balls(){
	var speed = 11;
	this.number = 0;
	var wid = 12;
	this.addBall = function(){
		while(true){
			var pox = Math.round(Math.random() * PLAYGROUND_WIDTH);
			var poy = Math.round(Math.random() * PLAYGROUND_HEIGHT);
			$("#balls").addSprite("ball_"+this.number,{animation: ballAni['white'], width: wid, height: wid, posx: pox, posy: poy});
			var collided = $("#ball_"+this.number).collision(".gQ_group,.playerBody,.wall,.target");
			if(collided.length > 0){
				$("#ball_"+this.number).remove();
			}
			else {
				break;
			}
		}
		$('#ball_'+this.number).addClass("ball");
		$('#ball_'+this.number)[0].ball = new ball($('#ball_'+this.number), speed);
		$('#ball_'+this.number).css("background-size", "12px 12px");

		$("#balls").addSprite("ballLight_"+this.number,{animation: ballAni['white'], width: BLOCK_LEN+8, height: BLOCK_LEN+8, posx: pox-4, posy: poy-4});
		$('#ballLight_'+this.number).css("background-size", "20px 20px");
		$('#ballLight_'+this.number).addClass("ballLight");
		$('#ballLight_'+this.number).css("opacity","0.5");
		this.number++;
	}
	this.update = function(){
		for (var i = 0; i < this.number;i++){
			if ($('#ball_'+i).length){
				$('#ball_'+i)[0].ball.update();
				x1 = $('#ball_'+i).x();
				y1 = $('#ball_'+i).y();
				$('#ballLight_'+i).x(x1-4);
				$('#ballLight_'+i).y(y1-4);
			}
		}
	}
	this.addBall();
}
var ballAni =['green','blue','white',];
ballAni['green']=new $.gameQuery.Animation({imageURL: "image/greenBall.png"});
ballAni['blue']=new $.gameQuery.Animation({imageURL: "image/blueBall.png"});
ballAni['white']=new $.gameQuery.Animation({imageURL: "image/whiteBall.png"});
ballAni['yellow']=new $.gameQuery.Animation({imageURL: "image/yellowBall.png"});


//目标块
var targetAni =['green','blue','yellow'];
targetAni['green'] = new $.gameQuery.Animation({imageURL: "image/greenTarget.png"});
targetAni['blue'] = new $.gameQuery.Animation({imageURL: "image/blueTarget.png"});
targetAni['yellow'] = new $.gameQuery.Animation({imageURL: "image/yellowTarget.png"});
targetAni['yellowLight'] = new $.gameQuery.Animation({imageURL: "image/yellowLight.png"});
targetAni['blueLight'] = new $.gameQuery.Animation({imageURL: "image/blueLight.png"});
targetAni['greenLight'] = new $.gameQuery.Animation({imageURL: "image/greenLight.png"});
function target(node, c){
	this.node = node;
	this.color = c;
	this.damage = function(){
		this.remove();
	} 
}

var targetRotateAni =Array();
function targets(){
	var number = 0;
	var light;
	this.addTarget = function(block_x, block_y, block_width, block_height, color){
		light = 44;
		if (block_width<=5){
			light = 22;
		}
		
		var Ani = new $.gameQuery.Animation({imageURL: "image/"+color+"Light_2.png", numberOfFrame: 4,
			delta: block_height*BLOCK_LEN+light,
			rate: 90,
			type: $.gameQuery.ANIMATION_VERTICAL });//| $.gameQuery.ANIMATION_ONCE});

		var Ani_2 = new $.gameQuery.Animation({imageURL: "image/"+color+"rotate.png", numberOfFrame: 7,
			delta: block_height*BLOCK_LEN,
			rate: 115,
			type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_ONCE});

		$("#targets").addSprite("target_"+number,{animation: targetAni[color], width: block_width*BLOCK_LEN, height: block_height*BLOCK_LEN, posx: block_x*BLOCK_LEN, posy: block_y*BLOCK_LEN});	
		$('#target_'+number).addClass("target");
		$('#target_'+number)[0].target = new target($('#target_'+number), color);
		$('#target_'+number).css("background-size", ""+(block_width*BLOCK_LEN)+'px '+ (block_height*BLOCK_LEN)+'px');


		$("#targets").addSprite("targetLight_"+number+"_2",{animation: Ani, width: block_width*BLOCK_LEN+light, height: block_height*BLOCK_LEN+light, posx: block_x*BLOCK_LEN-light/2, posy: block_y*BLOCK_LEN-light/2});	
		$('#targetLight_'+number+"_2").css("background-size", ""+(block_width*BLOCK_LEN+light)+'px '+ (block_height*BLOCK_LEN+light)*4+'px');
		$('#targetLight_'+number+"_2").css("display","none");
		$('#targetLight_'+number+"_2").addClass("targetLight_2");

		$("#targets").addSprite("targetLight_"+number,{animation: targetAni[color+'Light'], width: block_width*BLOCK_LEN+light, height: block_height*BLOCK_LEN+light, posx: block_x*BLOCK_LEN-light/2, posy: block_y*BLOCK_LEN-light/2});	
		$('#targetLight_'+number).css("background-size", ""+(block_width*BLOCK_LEN+light)+'px '+ (block_height*BLOCK_LEN+light)+'px');
		$('#targetLight_'+number).addClass("targetLight");
		
		$("#targets").addSprite("targetRotate_"+number,{animation: Ani_2, width: block_width*BLOCK_LEN, height: block_height*BLOCK_LEN, posx: block_x*BLOCK_LEN, posy: block_y*BLOCK_LEN});	
		debugger;
		targetRotateAni["targetRotate_"+number] = Ani_2;
		$("#targetRotate_"+number).css("background-size", ""+(block_width*BLOCK_LEN)+'px '+ (block_height*BLOCK_LEN)*7+'px');
		$("#targetRotate_"+number).css("display","none");
		$("#targetRotate_"+number).addClass("targetRotate");
		number++;
	}
}


//更新
$("#playscreen").registerCallback(function(){ 
	if (GAMEOVER || GAMESRART != 2){
		return;
	}
	theBalls.update();
}, 60);
$("#playscreen").registerCallback(function(){ 
	if (GAMEOVER || GAMESRART != 2){
		return;
	}
	thePlayer.update();
	//theBalls.update();
    //撞实了
    var collided = $("#playerBody_0").collision(".gQ_group, .playerBody, .wall, .target");
    if(collided.length > 0){
    			GAMEOVER = true;
				$.playground().clearAll();
				$("#lose").css("display",'block');
				return;
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
		case 65:
			thePlayer.setDirection('left');
			break;
		case 87:
			thePlayer.setDirection('up');
			break;
	    case 68:
			thePlayer.setDirection('right');
			break;
	    case 83:
		 	thePlayer.setDirection('down');
			break;
	}
	if (GAMESRART == 1 && (e.keyCode ==65 || e.keyCode == 87 || e.keyCode ==68 || e.keyCode == 83)){
		GAMESRART = 2;
		thePlayer.eatFood('white');
	}
});


//cookie
var strCookie=document.cookie; 
var arr=strCookie.split("="); 
if(arr.length>1){
	playerLevel = parseInt(arr[1]);
}
for (var i = playerLevel+1; i <=6; i++ ){
	$('#level_'+i).removeClass('level').addClass("lock");
}


var theWall, thePlayer, theTargets, theFood, theBalls;
function setGame(){ 
	music_click = 0;
	$("#click_0")[0].load();
	$("#playscreen").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
	.addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("foods", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("balls", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("targets", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("walls", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("player", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end();
	//$("#background").addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
	//$('#background1').css('background-size', "" + PLAYGROUND_WIDTH + "px " + PLAYGROUND_HEIGHT)	


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
			theTargets.addTarget(25,15,20,20,'blue');
			targetNumber['blue'] = 1;
			targetNumber['yellow'] = 0;	
			targetNumber['green'] = 0;	
			targetTotal = 1;	
			break;
		case 2:
			theTargets.addTarget(20,20,15,15,'blue');
			theTargets.addTarget(40,40,10,17,'green');
			targetNumber['green'] = 1;
			targetNumber['blue'] = 1;
			targetNumber['yellow'] = 0;
			targetTotal = 2;	
			break;
		case 3:
			theTargets.addTarget(20,0,10,20,'blue');
			theTargets.addTarget(20,30,10,20,'blue');
			theTargets.addTarget(40,15,20,20,'yellow');
			targetNumber['yellow'] = 1;
			targetNumber['blue'] = 2;
			targetNumber['green'] = 0;
			targetTotal = 3;	
			break;
		case 4:
			theTargets.addTarget(32,13,5,5,'blue');
			theTargets.addTarget(20,17,20,20,'green');
			theTargets.addTarget(35,15,10,10,'yellow');
			targetNumber['yellow'] = 1;
			targetNumber['blue'] = 1;
			targetNumber['green'] = 1;
			targetTotal = 3;
			break;
		case 5:
			theTargets.addTarget(20,22,4,4,'yellow');
			theTargets.addTarget(27,15,4,4,'yellow');
			theTargets.addTarget(27,22,4,4,'yellow');
			theTargets.addTarget(27,29,4,4,'yellow');
			theTargets.addTarget(34,8,4,4,'yellow');
			theTargets.addTarget(34,15,4,4,'yellow');
			theTargets.addTarget(34,22,4,4,'yellow');
			theTargets.addTarget(34,29,4,4,'yellow');
			theTargets.addTarget(34,36,4,4,'yellow');
			theTargets.addTarget(41,15,4,4,'yellow');
			theTargets.addTarget(41,22,4,4,'yellow');
			theTargets.addTarget(41,29,4,4,'yellow');
			theTargets.addTarget(48,22,4,4,'yellow');
			targetNumber['yellow'] = 13;
			targetNumber['blue'] = 0;
			targetNumber['green'] = 0;
			targetTotal = 13;
			break;
		case 6:
			theTargets.addTarget(20,8,4,4,'green');
			theTargets.addTarget(20,15,4,4,'green');
			theTargets.addTarget(20,22,4,4,'green');
			theTargets.addTarget(20,29,4,4,'green');
			theTargets.addTarget(20,36,4,4,'green');
			theTargets.addTarget(27,8,4,4,'green');
			theTargets.addTarget(27,15,4,4,'yellow');
			theTargets.addTarget(27,22,4,4,'yellow');
			theTargets.addTarget(27,29,4,4,'yellow');
			theTargets.addTarget(27,36,4,4,'green');
			theTargets.addTarget(34,8,4,4,'green');
			theTargets.addTarget(34,15,4,4,'yellow');
			theTargets.addTarget(34,22,4,4,'blue');
			theTargets.addTarget(34,29,4,4,'yellow');
			theTargets.addTarget(34,36,4,4,'green');
			theTargets.addTarget(41,8,4,4,'green');
			theTargets.addTarget(41,15,4,4,'yellow');
			theTargets.addTarget(41,22,4,4,'yellow');
			theTargets.addTarget(41,29,4,4,'yellow');
			theTargets.addTarget(41,36,4,4,'green');
			theTargets.addTarget(48,8,4,4,'green');
			theTargets.addTarget(48,15,4,4,'green');
			theTargets.addTarget(48,22,4,4,'green');
			theTargets.addTarget(48,29,4,4,'green');
			theTargets.addTarget(48,36,4,4,'green');
			targetNumber['yellow'] = 8;
			targetNumber['blue'] = 1;
			targetNumber['green'] = 16;
			targetTotal = 25;
			break;
	}
	targetOrigin = targetTotal;
	for (var i = 0; i < $('audio').length; i++){
		$('audio')[i].pause();
	}
	theFood.addFood();
	theBalls = new this.balls();
	GAMEOVER =false;
}

//选关,开始游戏
var levelChosen = 1;
$(".level:not(.lock)").click(function(){
	debugger;
	setGame();
	levelChosen  =parseInt(this.id[this.id.length-1]);
	$('#level').css("display", "none");
	$.playground().startGame(function(){
    	toStartGame(levelChosen);
       // $("#welcomeScreen").fadeTo(1000,0,function(){
       // 	$(this).remove();
        //});
        GAMESRART =1;
    });
	
})

//normal
$("#choice1").click(function(){
	$('#level').css("display", "block");
})


//暂停
$('.playaction').click(function(){
	$.playground().pauseGame();
})

//继续
$('.reply').click(function(){
	$.playground().resumeGame();
})


$($('.reply1')[0]).click(function(){
	var act = $($('.messagetitle')[0].firstChild).attr('src');
	if (act == 'image/quit1.png') //quit's yes
	{
		$.playground().clearAll();
	}
	else                          //retry's yes
	{
		$.playground().clearAll();
		$('#gQ_scenegraph').remove();
		GAMEOVER =true;
		setGame();
    	$.playground().startGame(function(){
    	toStartGame(levelChosen);
        GAMESRART =1;
    	});
    }
})


$($('.reply1')[1]).click(function(){
	$.playground().resumeGame();
});

$($('.reply1')[3]).click(function() { //lose's retry
	$('#gQ_scenegraph').remove();
	GAMEOVER =true;
	setGame();
    $.playground().startGame(function(){
    	toStartGame(levelChosen);
        GAMESRART =1;
    });
});


//win
$($('.reply1')[4]).click(function(){//quit
	$.playground().clearAll();
});
$($('.reply1')[5]).click(function(){//next
	if (levelChosen == 6){
		$.playground().clearAll();
		$('#win').css('display', 'none');
		$('#finalwin').css("display", "block");

	}
	else{
		levelChosen++;
		setGame();
    	$.playground().startGame(function(){
    	toStartGame(levelChosen);
        GAMESRART =1;
		});
    }
});

