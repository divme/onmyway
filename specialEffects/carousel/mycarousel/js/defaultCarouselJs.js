function addLoadEvent(func) {
        var oldLoad = window.onload;
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
var pic = document.getElementsByClassName("pic");
var Timer,
    index = 0;

var con = document.querySelector('.container2');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var icon= document.getElementById('icon');

//图片轮播的基础函数
    function gallery(num){
            for (var i = 0; i < one.length; i++) {
                  pic[i].style.display="none";
                  one[i].style.background="seagreen";
            }
            pic[num].style.display="block";
            one[num].style.background="white";
            index = num;
        console.log(index);
    }   

//图片自动轮播的函数
    function autoplay(){
             if(index == pic.length){index = 0;}
             gallery(index);
             index++;
             Timer = setTimeout(autoplay,3000);
    }
//点击左箭头
    function clickleft(){
             index--;
             if ( index < 0 ){ index = pic.length-1 }
             gallery(index);
    }
//点击右箭头
    function clickright(){
            index++;
            if ( index >= pic.length){index = 0}
            gallery(index);
    }
               
addLoadEvent(autoplay);

con.onmouseenter = function(){
    clearTimeout(Timer)
};
con.onmouseleave = function(){
    Timer = setTimeout(autoplay,800)
};

left.onclick = clickleft;
right.onclick = clickright;

icon.onmouseover = function(e){
    var target = e.target;        
    switch(target.id){
        case "one":
            gallery(0);
            break;  

        case "two":
           gallery(1);
           break;

        case "three":
            gallery(2);
            break; 
    }
}

 
 