var obj, currentPhoto = 0;

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
	for (var i=0; i<obj.reviewNumber;i++ ){
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
		$('#mainShow').attr("lang", "visual");;
		loadObj("series_"+this.id+".json");		
	};
})())

$('#mainShow').click(function(){
	if (currentPhoto!=obj.photoNumber-1){
		currentPhoto++;
	}
	else{
		currentPhoto=0;
	}
	showPhoto();
})

