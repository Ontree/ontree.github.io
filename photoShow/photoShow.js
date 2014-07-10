function loadXMLDoc(st){
	var xmlhttp;
	if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest();
  	}
	else{
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange=function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
    		return (xmlhttp.responseText);
    	}
  	}
	xmlhttp.open("GET",st,true);
	xmlhttp.send();

}

$('.seriesPreviewItem').click((function(){
	return function(){//$('.shade').css("display","block");
	$('.shade').css('opacity',0.772);
	$('#mainShow').css("display","block");
	var obj=JSON.parse(loadXMLDoc("series_1.json"));
	console.log(obj);
	};
})())
