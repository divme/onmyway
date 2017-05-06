function addLoadEvent(func) {
	var oldLoad=window.onload;
	if (typeof window.load!=='function') {
		 window.onload=func;
		}
	else{
		window.onload=function(){
			oldLoad();
			func();
		}
	}
}

var one = document.getElementsByClassName("one");
var pic = document.getElementsByClassName("pic"),
    Timer,
    j = 0;

//图片轮播的基础函数
function gallery(num){
         for (var i =0;i<one.length;i++) {
    				pic[i].style.display="none";
    				one[i].style.background="seagreen";
    	}
         pic[num].style.display="block";
         one[num].style.background="white";
	  }   

//图片自动轮播的函数  
function autoplay(){
       if(j==one.length){j=0;}
       gallery(j);
	   j++;
	   Timer = setTimeout("autoplay()",6000);
	}

//点击左箭头
function clickleft(){
    for (var k=0;k<one.length;k++) {
    	if(pic[k].style.display=="block"){
             
    		 var m=k-1;
 		     if (m==-1) { m=2;}
 		     gallery(m);
    		 break;
    	}
    	continue;
   }
}

//点击右箭头
function clickrigh(){
    for (var k=0;k<one.length;k++) {
    	if(pic[k].style.display=="block"){
             var m=k+1;
    		 if (m==one.length) {m=0;}
             gallery(m);
    		 break;
    	}
    	continue;
    }
}
   
addLoadEvent(autoplay);

