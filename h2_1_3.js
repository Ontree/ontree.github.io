

function makeMenu(course,i)
{
	alert(i);//$(course).children("ul:eq(0)").css("display","block");alert(i);}
	
}
c=document.createElement("link");
c.href="https://rawgithub.com/Ontree/ontree.github.io/master/csstext.css";
c.type="text/css";
c.rel="stylesheet";
document.body.appendChild(c);


f=document.createElement('iframe');
f.src="https://rawgithub.com/Ontree/ontree.github.io/master/welcome.html";
f.name="iframe_a";
f.width="100%";
f.height="1000px"
f.frameborder="0";

d=document.createElement('div');
d.className="frame";
x=$('.footers');
y=$('body');
y.append(d,x);
$('.frame').append(f);

y=$('#listCourseBox .lh30');
for(var i=0;i<y.length;i++)
{
	p=document.createElement('td');
	p.innerHTML="<span style='margin-left:10px'>"+(i+1).toString()+"</span>";
	var x=y[i].childNodes[1];
	y[i].insertBefore(p,x);

	course=$('#listCourseBox .lh30 td[width="40%"]:eq('+i.toString()+')');
	var menuList="<ul class='menu' style='display: none'><li class='menu1'><a href='1'>课程首页</a></li><li class='menu2'><a href='2'>课程文件</a></li><li class='menu3'><a href='3'>课程信息</a></li><li class='menu4'><a href=''>课程作业</a></li><li class='menu5'><a href=''>群组学习</a></li><li class='menu6'><a href=''>讨论区</a></li></ul>"
	//$(".menu li").css('float','left');
	

	course.append(menuList);
	var href=Array();
	href[0]=$(course).children("a:eq(0)").attr("href");
	href[1]=href[0];
	href[2]=href[0].replace(/coursehome/,"courseware");
	href[3]=href[0].replace(/coursehome/,"courseinfo");
    href[4]=href[0].replace(/coursehome/,"homework");
    href[5]=href[0].replace(/coursehome/,"groupLearning");
    href[6]=href[0].replace(/coursehome/,"forum");

    for (var j=1;j<7;j++)
    {
		$(course).find("a:eq("+j.toString()+")").attr("href",href[j]);
		$(course).find("a:eq("+j.toString()+")").attr("target",'iframe_a');
	}

	$(course).mouseover((function(course_){ 
	return function(){$(course_).children("ul:eq(0)").css("display","block");};
	})(course)); 

	$(course).mouseout((function(course_){ 
	return function(){$(course_).children("ul:eq(0)").css("display","none");};
	})(course)); 
	//course.attr("width","50px");
}

