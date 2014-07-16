//pause, continue; quit; retry右侧控制区
$('.playaction').mouseover(function() {
	var action = $(this.firstChild).attr('src');
	if (action == 'image/pause1.png')
	{
		$(this.firstChild).attr('src', 'image/pause2.png');
	}
	else if (action == 'image/quit1.png')
	{
		$(this.firstChild).attr('src', 'image/quit2.png');
	}
	else
	{
		$(this.firstChild).attr('src', 'image/retry2.png');
	}
});

$('.playaction').mouseout(function() {
	var action = $(this.firstChild).attr('src');
	if (action == 'image/pause2.png')
	{
		$(this.firstChild).attr('src', 'image/pause1.png');
	}
	else if (action == 'image/quit2.png')
	{
		$(this.firstChild).attr('src', 'image/quit1.png');
	}
	else
	{
		$(this.firstChild).attr('src', 'image/retry1.png');
	}
});

//pause, quit, retry对话框
$('.reply').mouseover(function() {
	$($('.reply')[0].children[0]).attr('src', 'image/continue2.png');
});
$('.reply').mouseout(function() {
	$($('.reply')[0].children[0]).attr('src', 'image/continue1.png');
});
$('.reply1').mouseover(function() {
	var str = $(this.firstChild).attr('src');
	if (str == 'image/yes1.png')
	{
		$(this.firstChild).attr('src', 'image/yes2.png');
	}
	else if (str == 'image/no1.png')
	{
		$(this.firstChild).attr('src', 'image/no2.png');
	}
	else if (str == 'image/quit1.png')
	{
		$(this.firstChild).attr('src', 'image/quit2.png');
	}
	else
	{
		$(this.firstChild).attr('src', 'image/retry2.png');
	}
});
$('.reply1').mouseout(function() {
	var str = $(this.firstChild).attr('src');
	if (str == 'image/yes2.png')
	{
		$(this.firstChild).attr('src', 'image/yes1.png');
	}
	else if (str == 'image/no2.png')
	{
		$(this.firstChild).attr('src', 'image/no1.png');
	}
	else if (str == 'image/quit2.png')
	{
		$(this.firstChild).attr('src', 'image/quit1.png');
	}
	else
	{
		$(this.firstChild).attr('src', 'image/retry1.png');
	}
});

$('.playaction').click(function() {
	var act = $(this.firstChild).attr('src');
	if (act == 'image/pause2.png'){
		if ($('#level').css("display")=="none"){
			$('#messagebox').css('display', 'block');
			$($('.messagetitle')[0].firstChild).attr('src', 'image/pause1.png');
			$('.reply').css('display', 'block');
			$('.reply1').css('display', 'none');
		}
	}
	else if (act == 'image/retry2.png'){
		if ($('#level').css("display")=="none"){
			$('#messagebox').css('display', 'block');
			$($('.messagetitle')[0].firstChild).attr('src', 'image/retry1.png');
			$('.reply1').css('display', 'block');
			$('.reply').css('display', 'none');
		}
	}
	else 
	{
		$('#messagebox').css('display', 'block');
		$($('.messagetitle')[0].firstChild).attr('src', 'image/quit1.png');
		$('.reply1').css('display', 'block');
		$('.reply').css('display', 'none');
		$('#level').css("display","none");
	}
});

//continue
$('.reply').click(function() {
	$('#messagebox').css('display', 'none');
});
//no
$($('.reply1')[1]).click(function() {
	$('#messagebox').css('display', 'none');
});
//yes
$($('.reply1')[0]).click(function() {
	var act = $($('.messagetitle')[0].firstChild).attr('src');
	if (act == 'image/quit1.png')
	{
		$('#mode').css('display', 'none');
		$('#playground1').fadeIn('slow');
	}
	else
	{

	}
	$('#messagebox').css('display', 'none');
});
//quit
$($('.reply1')[2]).click(function() {
	$('#mode').css('display', 'none');
	$('#playground1').fadeIn('slow');
	$('#lose').css('display', 'none');
});
//retry
$($('.reply1')[3]).click(function() {
	$('#lose').css('display', 'none');
});

//游戏页面之音效切换
$('#playsound').mouseover(function() {
	var soundstatus = $($('#playsound')[0].firstChild).attr('src');
	if (soundstatus == 'image/soundon1.png')
	{
		$($('#playsound')[0].firstChild).attr('src', 'image/soundon2.png');
	}
	else
	{
		$($('#playsound')[0].firstChild).attr('src', 'image/soundoff2.png');	
	}
});

$('#playsound').mouseout(function() {
	var soundstatus = $($('#playsound')[0].firstChild).attr('src');
	if (soundstatus == 'image/soundon2.png')
	{
		$($('#playsound')[0].firstChild).attr('src', 'image/soundon1.png');
	}
	else
	{
		$($('#playsound')[0].firstChild).attr('src', 'image/soundoff1.png');	
	}
});

$('#playsound').click(function() {
	var soundstatus = $($('#playsound')[0].firstChild).attr('src');
	if (soundstatus == 'image/soundon2.png')
	{
		$($('#playsound')[0].firstChild).attr('src', 'image/soundoff2.png');
		var au = $('audio');
		for (var i = 0; i< au.length; i++){
			au[i].volume = 0;
		}
	}
	else
	{
		$($('#playsound')[0].firstChild).attr('src', 'image/soundon2.png');
		var au = $('audio');
		for (var i = 0; i< au.length; i++){
			au[i].volume = 1;
		}
	}
});