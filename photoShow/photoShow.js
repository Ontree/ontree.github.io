var obj, current = 0;

function showPhoto(){
	$('#mainPhoto').empty();
	for (var i=0; i<obj.number;i++ ){
		var p =$("<div>");
		p.addClass("Photo");
		if (i !=current){
			p.css("display","none");
		}
		else{
			p.css("display","block");
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
		$('.shade').attr("lang", "visual");
		$('#mainShow').css("display","block");
		loadPhoto("series_"+this.id+".json");
	};
})())

$('#mainShow').click(function(){console.log(obj.number,current);
	if (current!=obj.number-1){
		current++;
	}
	else{
		current=0;
	}
	showPhoto();
})

