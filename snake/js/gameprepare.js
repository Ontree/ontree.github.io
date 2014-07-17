//loading
windowOnload =function(){
	$('#container').fadeIn(1000);
	$('#loading').fadeOut(1000);
}
window.onload=windowOnload();


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