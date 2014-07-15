
var PLAYGROUND_HEIGHT=300, PLAYGROUND_WIDTH=450,REFRESH_RATE=70, BLOCK_LEN=6;
var GAMEOVER = false, GAMESRART = false;
var MAX_X=(PLAYGROUND_WIDTH-PLAYGROUND_WIDTH%BLOCK_LEN)/BLOCK_LEN;
var MAX_Y=(PLAYGROUND_HEIGHT-PLAYGROUND_HEIGHT%BLOCK_LEN)/BLOCK_LEN;
var D_BODY_BLOCK = 4;//吃一块食物增加的长度
var PI = 3.1415926;
var flag=0;
//游戏组织
$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
	.addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("player", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("foods", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("walls", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("balls", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
	.addGroup("targets", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end();


//游戏背景画面
var background1 = new $.gameQuery.Animation({imageURL: "space.jpg"});
$("#background")
   .addSprite("background1", {animation: background1, 
               width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});


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
	var bodyId=body_Id;
	var color = c;
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
			direction = player.getDirection();
		}
		else{
			direction = $("#playerBody_"+ (bodyId - 1))[0].playerBody.getDirection();
		}
	}
	this.getDirection = function(){
		return(direction);
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

	this.eatFood = function(){ 
		if ($('#food')[0].color !='special'){
			color = $('#food')[0].color;
			lenToAdd += D_BODY_BLOCK;
			this.addBody();
		}
		else{
			balls.addBall();
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

//添加游戏玩家

var player = new player();



//食物对象
var foodAni =['green','blue','special'];
foodAni['green'] = new $.gameQuery.Animation({imageURL: "greenFood.png"});
foodAni['blue'] = new $.gameQuery.Animation({imageURL: "blueFood.png"});
foodAni['special'] = new $.gameQuery.Animation({imageURL: "specialFood.png"});
function food(){
	this.addFood = function(){
		var ran = Math.random();
		var color;
		if (ran<0){
			color = 'green';
		}
		else{
			if (ran < 0.9){
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
			var collided = $("#food").collision(".gQ_group,.playerBody,.wall");
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
//添加初始食物

var food = new food();



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
var wall = new wall();
wall.createWall();



//ball对象
function ball(node,s){
	var speed = s;
	var angle = Math.random() * 2* PI;
	this.node = node;
	var color = 'white';
	this.setColor = function(c){
		color = c;
	}
	this.update = function(){
		var dx = Math.round(speed*Math.cos(angle));
		var dy = -Math.round(speed*Math.sin(angle));
		this.node.x(this.node.x()+dx);
		this.node.y(this.node.y()+dy);
		if (this.node.x()>PLAYGROUND_WIDTH+4 ||this.node.x()<-4||this.node.y()>PLAYGROUND_HEIGHT+4 ||this.node.y()<-4){
			flag=""+angle;angle = PI+angle; flag=flag+angle+" "+this.node.x()+" "+this.node.y();
		}
		//碰撞
		var collided = this.node.collision(".gQ_group, .playerBody, .wall");
		
		if (collided.length > 0){
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
	}
}
function balls(){
	var speed = 5.4;
	var number = 0;
	this.addBall = function(){
		while(true){
			var pox = Math.round(Math.random() * PLAYGROUND_WIDTH);
			var poy = Math.round(Math.random() * PLAYGROUND_HEIGHT);
			$("#balls").addSprite("ball_"+number,{animation: ballAni, width: BLOCK_LEN, height: BLOCK_LEN, posx: pox, posy: poy});
			var collided = $("#ball_"+number).collision(".gQ_group,.playerBody,.wall");
			if(collided.length > 0){
				$("#ball_"+number).remove();
			}
			else {
				break;
			}
		}
		$('#ball_'+number).addClass("ball");
		$('#ball_'+number)[0].ball = new ball($('#ball_'+number), speed);
		number++;
	}
	this.update = function(){
		for (var i = 0; i < number;i++){
			$('#ball_'+i)[0].ball.update();
		}
	}
	this.addBall();
}
var ballAni =['green','blue','white'];
ballAni['green']=new $.gameQuery.Animation({imageURL: "greenBall.png"});
ballAni['blue']=new $.gameQuery.Animation({imageURL: "blueBall.png"});
ballAni['white']=new $.gameQuery.Animation({imageURL: "whiteBall.png"});
var balls = new balls();


//目标块
var targetAni =['green','blue'];
targetAni['green'] = new $.gameQuery.Animation({imageURL: "greenTarget.png"});
targetAni['blue'] = new $.gameQuery.Animation({imageURL: "blueTarget.png"});
function target(node, c){
	this.node = node;
	var color = c;
	this.damage = function(){
		this.remove();
	} 
}
function targets(){
	var number = 0;
	this.addTarget = function(block_x, block_y, block_width, block_height, color){
		$("#targets").addSprite("target_"+number,{animation: targetAni[color], width: block_width*BLOCK_LEN, height: block_height*BLOCK_LEN, posx: block_x*BLOCK_LEN, posy: block_y*BLOCK_LEN});	
		$('#target_'+number).addClass("target");
		$('#target_'+number)[0].ball = new ball($('#target_'+number), color);
		number++;
	}
}
var targets = new targets();
targets.addTarget(20,20,3,3,'blue');
//更新
$("#playground").registerCallback(function(){ 
	if (GAMEOVER || !GAMESRART){
		return;
	}
	player.update();
	balls.update();

   	

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
   				player.eatFood();
   				this.remove();
   				food.addFood();
   			} 
   		})
   	}




}, REFRESH_RATE);


//键盘操作
$(document).keydown(function(e){
	switch(e.keyCode){
		case 66:
			balls.addBall();
			break;
		case 65:
			player.setDirection('left');
			break;
		case 87:
			player.setDirection('up');
			break;
	    case 68:
			player.setDirection('right');
			break;
	    case 83:
		 	player.setDirection('down');
			break;
	}
});

//点击开始游戏

$("#startbutton").click(function(){
          $.playground().startGame(function(){
            $("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();food.addFood();});
            GAMESRART =true;
          });
        })