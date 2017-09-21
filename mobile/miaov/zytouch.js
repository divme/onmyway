/**
 * Created by mszq on 2017/9/19.
 */
/**
1. 手势事件系列：tap, longtap, gesture: move事件绑定了scale和rotation属性
2. 运动函数 move
3. 设置获取css系列: css(), transform()
4.
**/
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

function tap(el, callback){
    var startX, startY;
    var endX, endY;
    var startTime, endTime;
    el.addEventListener('touchstart',function(e){
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
        startTime = new Date().getTime();
    });
    el.addEventListener('touchend',function(e){
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        endTime = new Date().getTime();
        if(Math.abs(endX-startX) < 5 && Math.abs(endY-startY) < 5 && endTime-startTime < 300){
            callback && callback.call(el, e);
        }
    })
}
function longtap(el, callback){
    var startX, startY;
    var endX, endY;
    var startTime, endTime;
    el.addEventListener('touchstart',function(e){
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
        startTime = new Date().getTime();
    });
    el.addEventListener('touchend',function(e){
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        endTime = new Date().getTime();
        if(Math.abs(endX-startX) < 5 && Math.abs(endY-startY) < 5 && endTime-startTime >= 300 && endTime-startTime < 2250){
            callback && callback.call(el, e);
        }
    })
}
// init ={
//     el: el,
//     start: fn,　　
//     change: fn,　　
//     end: fn　　
// }
function gesture(init){
    var ifGesture = false; // 当前是否为多指事件
    var el = init.el; // 绑定事件的元素
    var startPos = [];
    var startDis = 0;
    var startRotation = 0;
    el.addEventListener('touchstart', function(e){
        var touches = e.touches;
        if(touches.length >= 2){
            ifGesture = true;
            startPos[0] = {
                x: touches[0].pageX,
                y: touches[0].pageY
            };
            startPos[1] = {
                x: touches[1].pageX,
                y: touches[1].pageY
            };
            startDis = getDis(startPos[0], startPos[1]);
            startRotation = getRotate(startPos[0], startPos[1]);
            init.start && init.start.call(el, e);
        }
    });
    el.addEventListener('touchmove', function(e){
        var touches = e.touches;
        var curPos = [];

        if(touches.length >= 2 && ifGesture){
            curPos[0] = {
                x: touches[0].pageX,
                y: touches[0].pageY
            };
            curPos[1] = {
                x: touches[1].pageX,
                y: touches[1].pageY
            };
            var curDis = getDis(curPos[0], curPos[1]);
            var curRotation = getRotate(curPos[0], curPos[1]);
            e.scale = curDis/startDis;
            e.rotation = curRotation - startRotation;
            init.change && init.change.call(el, e);
        }
    });
    el.addEventListener('touchend', function(e){
        if(ifGesture){
            init.end && init.end.call(el, e);
        }
    })
}

function css(el, attr, val){
    var transforms = ['transform', 'rotate','rotateX','rotateY','rotateZ','translate','translateX','translateY','translateZ','scale','scaleX','scaleY','skew',"skewX","skewY"];
    for(var i = 0, len = transforms.length; i < len; i++){
        if( attr == transforms[i]){
            return transform(el, attr, val);
        }
    }
    if( val == undefined ){
        return window.getComputedStyle?window.getComputedStyle(el)[attr] : el.currentStyle[attr];
    }
    el.style[attr] = val;
}
function transform(el, attr, val){
    var str = '', curAttr;
    if(!el.transform){
        el.transform = {};
    }
    if(val == undefined){
        if(attr == "transform"){
            return el.transform;
        }
        return el.transform[attr]? el.transform[attr] : 0.01;
    }
    el.transform[attr] = val;
    for(curAttr in el.transform){
        if(el.transform.hasOwnProperty(curAttr)){
            str += curAttr + "(" + el.transform[curAttr] +") ";
        }
    }
    el.style.WebkitTransform = el.style.transform = str;
}
function move(el, attr, val, fn){
    var curAttr, // 获得元素当前属性值
        dif,   // 目标值与当前值之差
        variation, // 本次改变的量
        reg = /\./,
        valreg = /[a-zA-Z]/,
        result;  // transform 时，

    var index = val.search(valreg);
    var unit = val.slice(index);
    if(index < 0){
        unit = "";
    }

    val = parseFloat(val);

    var timer = window.requestAnimationFrame(animation);
    function animation(){
        curAttr = parseFloat(css(el, attr));
        if(val == curAttr){
            window.cancelAnimationFrame(timer);
            fn&&fn();
        }

        if(reg.test(val) || reg.test(curAttr)){
            dif = addTwoFloat(3, false, val, curAttr);
            variation = parseFloat(dif/10);
            result = addTwoFloat(3, true, curAttr, variation);
            if(Math.abs(dif) < 0.01){
                result = val;
            }
        }else{
            dif = val - curAttr;
            variation = parseFloat(dif/30);
            result = curAttr + variation;
        }
        css(el, attr, result + unit);
        timer = window.requestAnimationFrame(animation);
    }
}


function addTwoFloat(keepnum, mode, num1, num2){
    var result,
        resultStr,
        arguments = [].slice.apply(arguments);
    var arr = [];
    for(var i = 2,leng=arguments.length;i < leng;i++){
        var type = typeof arguments[i],
            instance = arguments[i] instanceof Number;
        if(type !='number') {
            arguments[i] = Number(arguments[i]);
            if(typeof arguments[i] != 'number'){
                return;
            }
        }
        var str = arguments[i].toString();
        var snum = str.indexOf('.');
        if(snum < 0){
            arr[i-2] = 0
        }else{
            var newstr = str.slice(snum+1);
            arr[i-2] = newstr.length;
        }
    }
    arr.sort(function(a,b){return b-a});
    arguments.shift();
    arguments.shift();
    if(mode){
        result = arguments.reduce(function(total, cur, curIndex){
            return total += cur*Math.pow(10,arr[0]);
        }, 0);
    }else{
        result = arguments.reduce(function(total, cur, curIndex){
            return total -= cur*Math.pow(10,arr[0]);
        }, arguments[0]*Math.pow(10,arr[0])*2);
    }
    result = result/Math.pow(10,arr[0]);
    if(keepnum){
        resultStr = result.toFixed(keepnum);
        result = Number(resultStr);
    }
    return result;
}
//        计算两个点的直线距离
function getDis(point1, point2){
    var x = point2.x - point1.x;
    var y = point2.y - point1.y;
    return Math.sqrt(x*x+y*y);
}

function getRotate(point1, point2){
    var x = point2.x - point1.x;
    var y = point2.y - point1.y;
    return Math.atan2(y, x)*180/Math.PI;
}