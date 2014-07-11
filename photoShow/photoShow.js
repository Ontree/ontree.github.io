var obj, current = 1;

function showPhoto(){
	for (var i=0; i<obj.number;i++ ){
		var p=$('#mainPhoto div.Photo:eq('+i.toString()+')');
		if (i !=current){
			p.fadeOut();
		}
		else{
			p.fadeIn();
		}
	}
}

function createPhoto(){
	$('#mainPhoto').empty();
	for (var i=0; i<obj.number;i++ ){
		var p =$("<div>");
		p.addClass("Photo");
		var im=$("<img>");
		im.attr("src",obj.PhotoSrc[i]);
		p.append(im);
		$('#mainPhoto').append(p);
	}
	showPhoto();
}

function loadPhoto(st){
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
    	}
  	}
	xmlhttp.open("GET",st,true);
	xmlhttp.send();
}

$('.seriesPreviewItem').click((function(){
	return function(){
		$('.shade').attr("lang", "visual");
		$('#mainShow').attr("lang", "visual");;
		loadPhoto("series_"+this.id+".json");		
	};
})())

$('#mainShow').click(function(){
	if (current!=obj.number-1){
		current++;
	}
	else{
		current=0;
	}
	showPhoto();
})

