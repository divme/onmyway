/**
 * Created by zy on 2018/2/9.
 */
// 封装requestAnimationFrame
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
var Tween = {
    linear: function (t, b, c, d){
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 2.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};

// 封装一下移动端的运动函数，此函数只是跟随手指移动而运动而已，其他效果参数酌情添加，效果在回调中自己实现
// 此函数仅限x或者y上的单方向运动
// 举例说明该函数在移动端的实例，包含但不限于：轮播图，下拉刷新，上拉加载，左右滑屏切换等
// init:{
//     wrap: 运动元素盒子,
//     el: 运动元素,
//     dir: x||y 想让元素的运动方向,
//     backOut: none||out 不超出边界||超出边界添加回弹,
//     start: 触摸开始的回调函数,
//     move: 手指移动时的回调函数,
//     end: 触摸结束的回调函数
// }

// 基本功能外注意的点：
// 1. 防止安卓大面积按压误触，记录lastPoint 位置做比较；
// 2. 防止手指变相，isFirst以手指第一次移动方向为准，直到这次滑动结束；
// 3. 比较x和y方向变化，判断是想往哪个方向滑动，如果是和设定方向一样，就滑动；

function swiper(init){
    var wrap = init.wrap;
    var el = init.el;
    var dir = init.dir; //预定滑动方向
    var realdir;  //实际滑动方向
    var isFirst = true; //为了防止变相，对于滑动方向与预定方向是否一致的判断在一次滑动过程里只判断一次
    //backOut的效果，需要判断边界，max为0，min需要计算
    var min = {
           x: wrap.clientWidth - el.clientWidth,
           y: wrap.clientHeight - el.clientHeight
    };
    // 手指开始的位置
    var startTouchLocation = {
           x: 0,
           y: 0
        },
    // 元素开始的位置
        startEleLocation = {
           x: 0,
           y: 0
        };
    // 防止安卓大面积误触，记录手指刚才的位置，和当前位置相比，没移动就return
    var lastTouchPosition = {
           x: 0,
           y: 0
    };

    el.addEventListener('touchstart', function(e){
        init.start  && init.start.call(el, e);
        startTouchLocation = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        startEleLocation = {
            x: css(el, 'translateX'),
            y: css(el, 'translateY')
        };
        lastTouchPosition = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };

    });
    el.addEventListener('touchmove', function(e){
        var curTouchLocation = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        var touchDis = {
            x: curTouchLocation.x - startTouchLocation.x,
            y: curTouchLocation.y - startTouchLocation.y
        };

        if(lastTouchPosition.x - curTouchLocation.x == 0  && lastTouchPosition.y - curTouchLocation.y == 0)
            return;

        if(isFirst){
            realdir = Math.abs(touchDis.x) > Math.abs(touchDis.y)? 'x':'y';
            isFirst = false;
        }

        if(realdir == dir){
            if(dir == 'x'){
                var nowPosX = startEleLocation.x + touchDis.x;
                if(init.backOut == 'none'){
                    nowPosX = nowPosX > 0? 0 : nowPosX;
                    nowPosX = nowPosX < min[dir]? min[dir] : nowPosX;
                }else if(init.backOut == 'out'){
                    nowPosX = nowPosX > 0? startEleLocation.x + touchDis.x*0.4 : nowPosX;
                    nowPosX = nowPosX < min[dir]? startEleLocation.x + touchDis.x*0.4 : nowPosX;
                }
                css(el, 'translateX', nowPosX);
            }else{
                var nowPosY = startEleLocation.y + touchDis.y;
                if(init.backOut == 'none'){
                    nowPosY = nowPosY > 0? 0 : nowPosY;
                    nowPosY = nowPosY < min[dir]? min[dir] : nowPosY;
                }
                css(el, 'translateY', nowPosY);
            }
        }else{
            console.log('滑动方向与预定方向不一致');
        }

        // 这里重置一下，是因为可能会移动一段距离后，再大面积误触
        lastTouchPosition = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };

        init.move  && init.move.call(el, e);
    });
    el.addEventListener('touchend', function(e){
         isFirst = true;
         init.end  && init.end.call(el, e);
    });
}


// 如果只是简单效果的话, 可以不用此函数,用 transition 做个过渡就足够了
// 运动函数，利用 Tween 定义运动效果
// 此函数接受的 target 和 css 函数内所传入参数只接受 css函数第1、2类
// Tween对象内效果方法所需参数及解析：
//     t: 当前次数；
//     b：样式初始值；
//     c: 样式差值；
//     d：总次数
//     返回值：当前次数下的样式值
// init = {
//     el: 运动元素,
//     time: 运动时间,
//     type: 运动效果函数名,
//     target：{ 运动目标：位置、效果等
//        left: 100,
//        top: 200
//     },
//     callback: 运动完之后的回调函数
// }
function move(init){
    var t = 0;
    var b = {};
    var c = {};
    var d = Math.ceil(init.time/16.7);
    if(init.el.timer)
        window.cancelAnimationFrame(init.el.timer);

    for(var as in init.target){
        if(init.target.hasOwnProperty(as)){
            b[as] = css(init.el, as);
            if(typeof Number(b) != 'number') return;
            c[as] = init.target[as] - b[as];
        }
    }
    init.el.timer = window.requestAnimationFrame(innerMove);
    function innerMove(){
        var cur;
        if( d == 0 || t >= d){
            window.cancelAnimationFrame(init.el.timer);
            console.log('gg');
            init.callback&&init.callback.call(init.el);
        } else {
            t++;
            for(var s in init.target){
                if(init.target.hasOwnProperty(s)) {
                    cur = Tween[init.type](t, b[s], c[s], d);
                    css(init.el, s, cur);
                }
            }
            init.el.timer = window.requestAnimationFrame(innerMove);
        }
    }
}


// 设置或者获取元素的属性,我分为以下几类进行处理:
// 1. transform: 这个属性单独来一个函数处理,并且要求el的所有transform;
// 2. width, height, top, bottom, left, right: 单位为px;这几个属性的单位问题在函数内处理掉;
// 3. opacity: 无单位;
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
                if(window.getComputedStyle){
                    return parseFloat(window.getComputedStyle(el)[attr])
                }else{
                    return parseFloat(el.currentStyle[attr]);
                }
            }else{
                el.style[attr] = val + 'px';
                return;
            }
        }
    }
    if(arguments.length == 2){
        return window.getComputedStyle? window.getComputedStyle(el)[attr] : el.currentStyle[attr];
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
        if(el.transform[attr] == undefined)
            el.transform[attr] = 0;
        return el.transform[attr];
    }
    el.transform[attr] = val;
    var str = '';
    for( s in el.transform){
        if(el.transform.hasOwnProperty(s)){
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
    }
    el.style.webkitTransform = el.style.transform = str;
}


// 封装移动端触摸函数tap，替代click
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