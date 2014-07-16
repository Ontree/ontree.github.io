//游戏起始页面切换之音效
$('#sound').mouseover(function() {
	var soundstatus = $($('#sound')[0].firstChild).attr('src');
	if (soundstatus == 'image/soundon1.png')
	{
		$($('#sound')[0].firstChild).attr('src', 'image/soundon2.png');
	}
	else
	{
		$($('#sound')[0].firstChild).attr('src', 'image/soundoff2.png');	
	}
});

$('#sound').mouseout(function() {
	var soundstatus = $($('#sound')[0].firstChild).attr('src');
	if (soundstatus == 'image/soundon2.png')
	{
		$($('#sound')[0].firstChild).attr('src', 'image/soundon1.png');
	}
	else
	{
		$($('#sound')[0].firstChild).attr('src', 'image/soundoff1.png');	
	}
});

$('#sound').click(function() {
	var soundstatus = $($('#sound')[0].firstChild).attr('src');
	if (soundstatus == 'image/soundon2.png')
	{
		$($('#sound')[0].firstChild).attr('src', 'image/soundoff2.png');
		var au = $('audio');
		for (var i = 0; i< au.length; i++){
			au[i].volume = 0;
		}
	}
	else
	{
		$($('#sound')[0].firstChild).attr('src', 'image/soundon2.png');
		var au = $('audio');
		for (var i = 0; i< au.length; i++){
			au[i].volume = 1;
		}
	}
});

//游戏起始页面切换之option
$('#choice1').mouseover(function() {
	$($('#choice1')[0].firstChild).attr('src', 'image/normal2.png');
});
$('#choice1').mouseout(function() {
	$($('#choice1')[0].firstChild).attr('src', 'image/normal1.png');
});
$('#choice2').mouseover(function() {
	$($('#choice2')[0].firstChild).attr('src', 'image/help2.png');
});
$('#choice2').mouseout(function() {
	$($('#choice2')[0].firstChild).attr('src', 'image/help1.png');
});