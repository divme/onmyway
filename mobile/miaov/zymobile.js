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
}

function tap(el, callback){
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