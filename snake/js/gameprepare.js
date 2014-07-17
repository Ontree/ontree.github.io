//loading
bodyOnload =function(){
	preloadImg();
	$('#container').fadeIn(1000);
	$('#loading').fadeOut(1000);
}

function preloadImg(){
	var img = new Image();
	img.src = "image/greenBody.png" ;
	img.src = "image/blueBody.png" ;
	img.src = "image/yellowBody.png" ;
	img.src = "image/whiteBody.png" ;
	img.src = "image/greenFood.png" ;
	img.src = "image/blueFood.png" ;
	img.src = "image/yellowFood.png" ;
	img.src = "image/specialFood.png" ;
	img.src = "image/wall.png" ;
	img.src = "image/greenBall.png" ;
	img.src = "image/blueBall.png" ;
	img.src = "image/whiteBall.png" ;
	img.src = "image/yellowBall.png" ;
	img.src = "image/greenTarget.png" ;
	img.src = "image/blueTarget.png" ;
	img.src = "image/yellowTarget.png" ;
	img.src = "image/yellowLight.png" ;
	img.src = "image/blueLight.png" ;
	img.src = "image/greenLight.png" ;

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