var obj, currentPhoto = 0, currentPage=0, perPage=5;
var time = 4500, interval; 

function showPhoto(){
	for (var i=0; i<obj.photoNumber;i++ ){
		var p=$('#mainPhoto div.Photo:eq('+i.toString()+')');
		if (i !=currentPhoto){
			p.fadeOut();
		}
	}
	for (var i=0; i<obj.photoNumber;i++ ){
		var p=$('#mainPhoto div.Photo:eq('+i.toString()+')');
		if (i ==currentPhoto){
			p.fadeIn();
		}
	}
}

function createPhoto(){
	$('#mainPhoto').empty();
	$('#mainPhoto').append($('<div id="nextPhoto"></div>'));
	$('#mainPhoto').append($('<div id="prePhoto"></div>'));
	$('#mainPhoto').append($('<img src="close.png" id="close">'));
	$('#mainPhoto').append($('<img src="start.png" id="start">'));
	$('#mainPhoto').append($('<img src="stop.png" id="stop">'));
	$('#nextPhoto').click(function(){
		if (currentPhoto!=obj.photoNumber-1){
			currentPhoto++;
		}
		else{
			currentPhoto=0;
		}
		showPhoto();
	});
	$('#prePhoto').click(function(){
		if (currentPhoto!=0){
			currentPhoto--;
		}
		else{
			currentPhoto=obj.photoNumber-1;
		}
		showPhoto();
	});
	$('#close').click(function(){
		currentPhoto = 0;
		currentPage= 0;
		$('#mainPhoto').empty();
		$('.shade').attr("lang", "");
		$('#mainShow').attr("lang", "");
		clearInterval(interval);
	});
	$('#start').click(function(){
		$('#start').css("display","none");
		$('#stop').css("display","block");
		interval = setInterval(fun,time);
		function fun(){
        	if (currentPhoto!=obj.photoNumber-1){
				currentPhoto++;
			}
			else{
				currentPhoto=0;
			}
			showPhoto();
    	}
	});
	$('#stop').click(function(){
		$('#start').css("display","block");
		$('#stop').css("display","none");
		clearInterval(interval);
	});
	for (var i=0; i<obj.photoNumber;i++ ){
		var p =$("<div>");
		p.addClass("Photo");
		var im=$("<img>");
		im.attr("src",obj.photoSrc[i]);
		p.append(im);
		$('#mainPhoto').append(p);
	}
	showPhoto();
}

function createReview(){
	$('#reviewlist').empty();
	var j=perPage*currentPage;
	var k=j+perPage;
	if (k>obj.reviewNumber)
		k=obj.reviewNumber
	for (var i=j; i<k;i++ ){
		var p =$("<li>");
		p.text(obj.review[i]);
		var t=$("<p>");
		t.text(obj.reviewTime[i]);
		p.append(t);
		$('#reviewlist').append(p);
	}
}

function loadObj(st){
	var xmlhttp, response;
	if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest();
  	}
	else{
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange=function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
    		obj=eval("("+xmlhttp.responseText+")");
    		createPhoto();
    		createReview();
    	}
  	}
	xmlhttp.open("GET",st,true);
	xmlhttp.send();
}

$('.seriesPreviewItem').click((function(){
	return function(){
		$('.shade').attr("lang", "visual");
		$('#mainShow').attr("lang", "visual");
		loadObj("series_"+this.id+".json");		
	};
})())


$('#nextPage').click(function(){
	if (currentPage!=Math.floor((obj.reviewNumber-1)/perPage)){
		currentPage++;
		createReview();
	}
})
$('#prePage').click(function(){
	if (currentPage!=0){
		currentPage--;
		createReview();
	}
})


