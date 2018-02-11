/**
 * Created by zy on 2018/2/9.
 */
(function(){
    window.requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame|| window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame;
    if(!window.requestAnimationFrame){
        var lastTime = new Date().getTime();
        window.requestAnimationFrame = function(callback){
            var timer;
            var delay = 16.7;
            var now = new Date().getTime();
            if( now-lastTime >= 16.7){
                delay = 0;
            }else{
                delay = now-lastTime;
            }
            lastTime = now;
            timer = setTimeout(callback, delay);
            return timer;
        }
    }
    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(timer){
            clearTimeout(timer);
        }
    }
}());


// 设置或者获取元素的属性,我分为以下几类进行处理:
// 1. opacity: 无单位;
// 2. width, height, top, bottom, left, right: 单位为px;这几个属性的单位问题在函数内处理掉;
// 3. transform: 这个属性单独来一个函数处理,并且要求el的所有transform;
// 4. border, background, margin, padding, color 等等其他属性
function css(el, attr, val){
    var transformArr = [
        'translate','translateX','translateY','translateZ',
        'scale', 'scaleX', 'scaleY', 'scaleZ',
        'rotate', 'rotateX', 'rotateY', 'rotateZ',
        'skew', 'skewX','skewY'
    ];
    var pxArr = ['width', 'height', 'top', 'left', 'bottom', 'right'];
    for(var i = 0; i < transformArr.length; i++){
        if(attr == transformArr[i]){
            return transform(el, attr, val);
        }
    }
    for(var k = 0; k < pxArr.length; k++){
        if(attr == pxArr[k]){
            if(arguments.length == 2){
                return parseFloat(window.getComputedStyle(el)[attr]) || parseFloat(el.currentStyle[attr]);
            }else{
                el.style[attr] = val + 'px';
                return;
            }
        }
    }
    if(arguments.length == 2){
        return window.getComputedStyle(el)[attr] || el.currentStyle[attr];
    }
    el.style[attr] = val;
}

// transform 函数 要求该el的transform属性都在js中定义
// 思路：给el对象一个名为transform的对象属性，该el的所有transform相关属性值都存放在该transform内
function transform(el, attr, val){
    if(!el.transform){
        el.transform = {}
    }
    if(val == undefined){
        return el.transform[attr];
    }
    el.transform[attr] = val;
    console.log(el.transform);
    var str = '';
    for( s in el.transform){
        switch(s){
            case "translate":
            case "translateX":
            case "translateY":
            case "translateZ":
                str += s + '(' + el.transform[s] +'px) ';
                break;
            case "scale":
            case "scaleX":
            case "scaleY":
            case "scaleZ":
                str += s + '(' + el.transform[s] +') ';
                break;
            case "rotate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
            case "skew":
            case "skewX":
            case "skewY":
                str += s + '(' + el.transform[s] +'deg) ';
                break;
        }
    }
    el.style.webkitTransform = el.style.transform = str;
}

function tap(el, ca
llback){
    var startX, startY;
    var startTime;
    el.addEventListener('touchstart', function(e){
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
        startTime = new Date().getTime();
    });
    el.addEventListener('touchend', function(e){
        var now = new Date().getTime();
        var endX = e.changedTouches[0].pageX;
        var endY = e.changedTouches[0].pageY;
        if( (endX - startX) < 5 && (endY - startY) < 5 && now-startTime < 100){
            callback && callback.call(el);
        }
    });
}