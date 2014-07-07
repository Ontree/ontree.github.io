y=$('#listCourseBox .lh30');

function makeMenu(course,i)
{
	alert(i);//$(course).children("ul:eq(0)").css("display","block");alert(i);}
	
}
for(var i=0;i<y.length;i++)
{
	for (var j=9;j<14;j++)
		if (j%2==1)
		y[i].childNodes[j].childNodes[0].innerHTML="1073741824";
	p=document.createElement('td');
	p.innerHTML="<span style='margin-left:10px'>"+(i+1).toString()+"</span>";
	var x=y[i].childNodes[1];
	y[i].insertBefore(p,x);

	course=$('#listCourseBox .lh30 td[width="40%"]:eq('+i.toString()+')');
	var menuList="<ul class='menu' style='display: none'><li class='menu1'><a href='1'>课程首页</a></li><li class='menu2'><a href='2'>课程文件</a></li><li class='menu3'><a href='3'>课程信息</a></li><li class='menu4'><a href=''>课程作业</a></li><li class='menu5'><a href=''>群组学习</a></li><li class='menu6'><a href=''>讨论区</a></li></ul>"
	//$(".menu li").css('float','left');
	

	course.append(menuList);
	var href1=$(course).children("a:eq(0)").attr("href");
	href1=href1.replace(/coursehome/,"courseware");
    //href1='';
	alert(href1);
	//alert($(course).children("a:eq(1)").attr("href"));
	$(course).find("a:eq(2)").attr("href",href1);

 
   
	//new makeMenu(course,i);
	$(course).mouseover((function(course_){ 
	return function(){$(course_).children("ul:eq(0)").css("display","block");};
	})(course)); 

	$(course).mouseout((function(course_){ 
	return function(){$(course_).children("ul:eq(0)").css("display","none");};
	})(course)); 
	
}
$(".menu li").css('width','80px');
$(".menu li").css('background','#CCC');
$(".menu a:hover").css('background','#999');
