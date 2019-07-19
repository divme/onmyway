(function(){
	window.requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;
	window.cancelAnimationFrame = window.cancelAnimationFrame|| window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame;
	if(!requestAnimationFrame){
		var lastTime = Date.now();
		window.requestAnimationFrame = function(callback){
			var id;
			var nowTime = Date.now();
			var delay = Math.max(16.7-(nowTime-lastTime),0);
			id = setTimeout(callback,delay);
			lastTime = nowTime + delay;
			return id;
		};
	}
	if(!cancelAnimationFrame){
		window.cancelAnimationFrame = function(index){
			clearTimeout(index);
		};
	}
})();

function swiper(init){
	var wrap = init.wrap;//滑屏元素的父级
	var scroll = wrap.children[0];//滑动的元素
	var startPonit = {};//手指的初始位置
	var startEl = {};// 元素的初始位置
	var dir = init.dir;
	var isFirst = true; //判断用户是否 是第一次执行move;
	var lastTime = 0;
	var lastTimeDis = 0;
	var noloop = init.noloop;
	var translateLimited = init.maxTranslateValue;
	var isDir = { //判断用户在对哪个方向进行滑屏
		x: false,
		y: false
	};
	var dirTranslate = {
		x: "translateX",
		y: "translateY"
	};
	var lastPoint = {};
	var lastDis = 0;//最后一次的手指移动距离
	var maxX = css(wrap, 'width');

	css(scroll,"translateX",0);
	css(scroll,"translateY",0);
	css(scroll,"translateZ",0);
	wrap.addEventListener('touchstart', function(e) {
		init.start&&init.start.call(wrap,e);
		var touch = e.changedTouches[0];
		startPonit = {
			x: touch.pageX,
			y: touch.pageY
		};
		lastPoint = {
			x: touch.pageX,
			y: touch.pageY
		};
		startEl = {
			x: css(scroll,"translateX"),
			y: css(scroll,"translateY")
		};
		lastTime = Date.now();
		lastTimeDis = 0;
		lastDis = 0;
	});
	wrap.addEventListener('touchmove', function(e) {
		var touch = e.changedTouches[0];
		var nowTime = Date.now();
		var isMove = true;
		var nowPonit = {
			x: touch.pageX,
			y: touch.pageY
		};
		if(lastPoint.x == nowPonit.x && lastPoint.y == nowPonit.y){
			return;
		}
		var dis = {
			x: (nowPonit.x - startPonit.x) > maxX ? maxX : (nowPonit.x - startPonit.x),
			y: nowPonit.y - startPonit.y
		};
		if(init.move){
			 isMove = init.move.call(wrap, dis[dir], e);
		}
		if(isFirst){
			if(Math.abs(dis.x) > Math.abs(dis.y)) {
				isDir.x = true;
				isFirst = false;
			} else {
				isDir.y = true;
				isFirst = false;
			}
		}
		var target = {
			x: startEl.x + dis.x,
			y: startEl.y + dis.y
		};

		if (noloop && isMove)
		{
			var translate = css(scroll, dirTranslate[dir]);
			var translateValue = parseInt(translate);
			if (target[dir] > 0 && translateValue <= 0)
				return;
			if (target[dir] - translateValue < 0 && translateValue <= -translateLimited)
				return;
		}

		if(isDir[dir] && isMove){
			css(scroll,dirTranslate[dir],target[dir]);
			e.preventDefault();
			lastDis = nowPonit[dir] - lastPoint[dir];//获取最后一次的距离
			lastTimeDis = nowTime - lastTime;
		}
		lastPoint.x = nowPonit.x;
		lastPoint.y = nowPonit.y;
		lastTime = nowTime;
	});
	wrap.addEventListener('touchend', function(e) {
		var lastSpeed = 0;
		if (lastTimeDis != 0)
			lastSpeed = lastDis/lastTimeDis;//最后一次移动速度

		init.end&&init.end.call(wrap, lastSpeed, e);

		isFirst = true;
		isDir = {
			x: false,
			y: false
		};

	});
}

function css(el,attr,val){
	var transformAttr = ["rotate","rotateX","rotateY","rotateZ","skewX","skewY","scale","scaleX","scaleY","translateX","translateY","translateZ"];
	for(var i = 0; i < transformAttr.length; i++){
		if(attr == transformAttr[i]){ //如果 attr 等transform其中一个值就代表用用户想要操作的是 transform
			return transform(el,attr,val);
		}
	}
	if(val === undefined){
		val = getComputedStyle(el)[attr];
		val = parseFloat(val);
		return val;
	}
	if(attr == "opacity"){
		el.style[attr] = val;
	} else {
		el.style[attr] = val + "px";
	}
}

function transform(el,attr,val){
	if(!el.transform){
		el.transform = {
		};
	}
	if(val === undefined){
		return el.transform[attr];
	}
	el.transform[attr] = val;
	var str = "";
	for(var s in el.transform){
		switch(s){
			case "rotate":
			case "rotateX":
			case "rotateY":
			case "rotateZ":
			case "skewX":
			case "skewY":
				str += s +"("+el.transform[s]+"deg) ";
				break;
			case "scale":
			case "scaleX":
			case "scaleY":
				str += s +"("+el.transform[s]+") ";
				break;
			case "translateX":
			case "translateY":
			case "translateZ":
				str += s +"("+el.transform[s]+"px) ";
				break;	
		}
	}
	el.style.WebkitTransform = el.style.transform = str;
}

function startMove(init){
	var t = 0;
	var b = {};//样式的初始值
	var c = {};//样式的差值
	var d = Math.ceil(init.time/16.7);
	cancelAnimationFrame(init.el.timer);
	for(var s in init.target) {
		b[s] = css(init.el,s);
		c[s] = init.target[s] - b[s];
	}
	init.el.timer = requestAnimationFrame(move);
	function move(){
		if(t > d || d == 0){
			cancelAnimationFrame(init.el.timer);
			init.callBack&&init.callBack.call(init.el);
		} else {
			t++;
			for(var s in init.target){
				var val = Tween[init.type](t,b[s],c[s],d);
				css(init.el,s,val);
			}
			init.callIn&&init.callIn.call(init.el);
			init.el.timer = requestAnimationFrame(move);
		}
	}
}

function tap(el,fn){
	var startPoint = {};
    var startTime, endTime;
	el.addEventListener('touchstart', function(e) {
		startPoint = {
			x: e.changedTouches[0].pageX,
			y: e.changedTouches[0].pageY
		}
        // startTime = Date().now;
        startTime =new Date().getTime();
	});
	el.addEventListener('touchend', function(e) {
		var nowPoint = {
			x: e.changedTouches[0].pageX,
			y: e.changedTouches[0].pageY
		}
		// endTime = Date().now;
		endTime =new Date().getTime();
		if(Math.abs(nowPoint.x - startPoint.x) < 5
		    &&Math.abs(nowPoint.y - startPoint.y) < 5
            && endTime-startTime < 300){
			fn&&fn.call(el,e);
		}
	});
}
