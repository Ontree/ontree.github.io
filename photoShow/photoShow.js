var obj;

function showPhoto(){
	$('#mainPhoto').empty();
	for (var i=1; i<=obj.number;i++ ){
		var p =$("<div>");
		p.addClass("Photo");
		if (i !=1){
			p.css("display","none");
		}
		//p.attr("id",i.toString());
		var im=$("<img>");
		im.attr("src",obj.PhotoSrc[i]);
		p.append(im);
		$('#mainPhoto').append(p);
	}
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
    		showPhoto();
    	}
  	}
	xmlhttp.open("GET",st,true);
	xmlhttp.send();
}

$('.seriesPreviewItem').click((function(){
	return function(){
		$('.shade').css("display","block");
		$('.shade').css('opacity',0.772);
		$('#mainShow').css("display","block");
		loadPhoto("series_1.json");
	};
})())
