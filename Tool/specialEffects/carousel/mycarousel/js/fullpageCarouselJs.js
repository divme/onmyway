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

var btn = document.getElementsByClassName("btn");
var inContainer = document.getElementsByClassName("inner-container");
var Timer,
    index = -1;

var con = document.querySelector('.wrapper');
var container = document.querySelector('.container');
var incontainer = document.querySelectorAll('.inner-container');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var icon= document.getElementById('icon');

var width = window.innerWidth,
    height = window.innerHeight;
for(var mm = 0, len = incontainer.length; mm < len; mm++){
    incontainer[mm].style.width = width +'px';
}
container.style.width = width*4 + 'px';
container.style.height = height + 'px';

//图片轮播的基础函数
function gallery(num){
    for (var i = 0; i < btn.length; i++) {
        btn[i].style.background="seagreen";
    }
    console.log(num);
    btn[num].style.background="white";
    container.style.left = -num * width +'px';
    index = num;
    // console.log(index);
}

//图片自动轮播的函数
function autoplay(){
    index++;
    if(index == inContainer.length){index = 0;}
    gallery(index);
    Timer = setTimeout(autoplay,3000);
}
//点击左箭头
function clickleft(){
    index--;
    if ( index < 0 ){ index = inContainer.length-1 }
    gallery(index);
}
//点击右箭头
function clickright(){
    index++;
    if ( index >= inContainer.length){index = 0}
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
    var arrBtn = [].slice.apply(btn);
    if ((target.nodeName).toLowerCase() == 'span'){
        var num = arrBtn.indexOf(target);
        gallery(num)
    }
};

 
 