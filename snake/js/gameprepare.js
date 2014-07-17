//loading
bodyOnload =function(){
	var img = new Array();
	for (var i = 0; i<19;i++){
		img[i] = new Image();
	}
	preloadImg(img);
	img[18].onload = function(){
		$('#container').fadeIn(1000);
		$('#loading').fadeOut(1000);
	}
}

function preloadImg(img){
	img[0].src = "image/greenBody.png" ;
	img[1].src = "image/blueBody.png" ;
	img[2].src = "image/yellowBody.png" ;
	img[3].src = "image/whiteBody.png" ;
	img[4].src = "image/greenFood.png" ;
	img[5].src = "image/blueFood.png" ;
	img[6].src = "image/yellowFood.png" ;
	img[7].src = "image/specialFood.png" ;
	img[8].src = "image/wall.png" ;
	img[9].src = "image/greenBall.png" ;
	img[10].src = "image/blueBall.png" ;
	img[11].src = "image/whiteBall.png" ;
	img[12].src = "image/yellowBall.png" ;
	img[13].src = "image/greenTarget.png" ;
	img[14].src = "image/blueTarget.png" ;
	img[15].src = "image/yellowTarget.png" ;
	img[16].src = "image/yellowLight.png" ;
	img[17].src = "image/blueLight.png" ;
	img[18].src = "image/greenLight.png" ;
}


//游戏起始页面切换之进入游戏和帮助
//帮助界面
$('#choice2').click(function() {
	$('#playground1').fadeOut('slow');
	$('#help').fadeIn('slow');
});

$('#helpback').mouseover(function() {
	$($('#helpback')[0].firstChild).attr('src', 'image/goback2.png');
});
$('#helpback').mouseout(function() {
	$($('#helpback')[0].firstChild).attr('src', 'image/goback1.png');
});

$('#helpback').click(function() {
	$('#help').fadeOut('slow');
	$('#playground1').fadeIn('slow');
});

//游戏界面
//仍需添加playscreen中的不同效果
$('#choice1').click(function() {
	$('#playground1').css('display', 'none');
	$($('#playsound')[0].firstChild).attr('src', $($('#sound')[0].firstChild).attr('src'));
	$('#mode').fadeIn('slow');
});