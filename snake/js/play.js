//初始页面切换
$('#play').mouseover(function() {
 	$('#play').css('opacity', '1');
 });

$('#play').mouseout(function() {
 	$('#play').css('opacity', '0.75');
 }); 

$('#play').click(function() {
	$('#play').remove();
	//可以换个酷炫的效果
	$('#playground1').fadeIn('slow');
	$('audio')[0].play();
});