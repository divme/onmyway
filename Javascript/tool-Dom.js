// requestAnimationFrame()兼容性处理
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            console.log(currTime);
            var id = window.setTimeout(function() {
                callback();
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
//  正确获取浏览器可用区域的宽高
function getWindow(){
    var w = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    var h = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    console.log("宽度是" + w + ";" + '高度是' + h);
    return {
        width: w,
        height: h
    }
}
//  获取元素在文档内的Y位置
function getElePos(el){
    var pos = 0;
    while(el){
        pos += el.offsetTop;
        el = el.offsetParent;
    }
    // var pos = window.scrollY + el.getBoundingClientRect().top
    return pos;

}
//  获取鼠标点击位置（相对于文档的位置）
function getMousePos(evt){
    evt = evt||window.event;
    var x = 0, y = 0;

//        如果事件对象有pageX属性,对应firefox,opera,chrome,safari浏览器
    if(evt.pageX){
        x=evt.pageX;
        y=evt.pageY;
    }
//        如果对象有clientX属性,对应IE浏览器
    else if(evt.clientX){
        var offsetX=0,offsetY=0;
        //IE6及其以上版本
        if(document.documentElement.scrollLeft){
            offsetX=document.documentElement.scrollLeft;
            offsetY=document.documentElement.scrollTop;
        }
        //IE较旧的版本
        else if(document.body){
            offsetX=document.body.scrollLeft;
            offsetY=document.body.scrollTop;
        }
        x=evt.clientX+offsetX;
        y=evt.clientY+offsetY;
    }
    console.log("you clicked at x="+evt.clientX+" y="+evt.clientY);
    console.log("you clicked at x="+evt.screenX+" y="+evt.screenY);
    console.log("you clicked at x="+evt.pageX+" y="+evt.pageY);
}

//  实现getElementByclass的功能
function getelementbyclass(node, className){
    var ele = node.getElementsByTagName("*");
    var len = ele.length;
    var curClass = '';
    var index = -1;
    var arr = [];
    for(var i = 0; i < len; i++){
        curClass = ele[i].getAttribute('class');
        index = curClass.indexOf(className);
        if( index >= 0){
            arr.push(ele[i]);
        }
    }
    return arr;
}
//    事件监听兼容性封装
var eventHandler = {
    addHandler:function(element,type,func){
        if(window.addEventListener){
            element.addEventListener(type,func,false);
        }else if(element.detachEvent){
            element.attachEvent('on'+type,func);
        }else{
            element['on'+type]=func;
        }
    },
    removerHandler:function(element,type,func){
        if(window.removeEventListener){
            element.removeEventListener(type,func,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,func);
        }else{
            element['on'+type]=null;
        }
    }
}