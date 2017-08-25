/*Created by zy on 2017/3/24.*/
// 标准封装
(function(){
    function getTransform(){
        var transform = '';
        var divStyle = document.createElement('div').style,
            transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
            i = 0,
            len = transformArr.length;

        for(; i < len; i++)  {
            if(transformArr[i] in divStyle) {
                return transform = transformArr[i];
            }
        }

        return transform;
    }
    var transform = getTransform();
    function Drag(id){
        this.elem = document.getElementById(id);
        this.startX = 0 ;
        this.startY = 0 ;
        this.sourceX = 0;
        this.sourceY = 0;
        this.init();
    }
    Drag.prototype = {
        constructor: Drag,
        init: function(){
            this.setDrag();
//                this.elem.addEventListener('mousedown',this.start,false);
        },
        getStyle: function(property){
            return this.elem.currentStyle?this.elem.currentStyle[property]:document.defaultView.getComputedStyle(this.elem,false)[property];
        },
        getPosition: function(){
            var pos = {x: 0,y: 0};
            if(transform){
                var transformValue = this.getStyle(transform);
                if(transformValue == 'none'){
                    this.elem.style[transform] = 'translate(0,0)';
                } else {
                    var temp = transformValue.match(/-?\d+/g);
                    pos = {
                        x : parseInt(temp[4].trim()),
                        y : parseInt(temp[5].trim())
                    }
                }
            } else {
                if (this.getStyle('position') == 'static'){
                    this.elem.style.position = 'relative';
                } else {
                    pos = {
                        x : parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
                        y : parseInt(this.getStyle('top') ? this.getStyle('top') : 0)
                    }
                }
            }
            return pos ;
        },
        setPosition: function(pos){
            if(transform) {
                this.elem.style[transform] = 'translate(' + pos.x +'px,'+pos.y+'px)';
            } else {
                this.elem.style.left = pos.x + 'px';
                this.elem.style.top = pos.y + 'px';
            }
        },
//            start: function(e){
//                e.preventDefault();
//                this.startX = e.pageX;
//                this.startY = e.pageY;
//
//                var pos = this.getPosition();
//                this.sourceX = pos.x;
//                this.sourceY = pos.y;
//
//                this.elem.addEventListener('mousemove', this.move, false);
//                this.elem.addEventListener('mouseup', this.end, false);
//            },
//            move: function(e){
//                var currentX = e.pageX;
//                var currentY = e.pageY;
//
//                var distanceX = currentX - this.startX;
//                var distanceY = currentY - this.startY;
//
//                this.setPosition({
//                    x: (this.sourceX + distanceX).toFixed(),
//                    y: (this.sourceY + distanceY).toFixed()
//                })
//            },
//            end: function(e){
//                this.elem.removeEventListener('mousemove', this.move);
//                this.elem.removeEventListener('mouseup', this.end);
//            }
        setDrag : function(){
            var self = this;
            this.elem.addEventListener('mousedown',start,false);

            function start(e){
                e.preventDefault();
                self.startX = e.pageX;
                self.startY = e.pageY;

                var pos = self.getPosition();
                self.sourceX = pos.x;
                self.sourceY = pos.y;

                self.elem.addEventListener('mousemove', move, false);
                self.elem.addEventListener('mouseup', end, false);
            }

            function move(e){
                var currentX = e.pageX;
                var currentY = e.pageY;

                var distanceX = currentX - self.startX;
                var distanceY = currentY - self.startY;

                self.setPosition({
                    x: (self.sourceX + distanceX).toFixed(),
                    y: (self.sourceY + distanceY).toFixed()
                })
            }

            function end(e){
                self.elem.removeEventListener('mousemove', move);
                self.elem.removeEventListener('mouseup', end);
            }
        }
    };
    window.Drag = Drag;
}());




<!--基础函数封装-->
//    (function(){
//        var oelem;
//        var startX = 0,
//                startY = 0;
//        var sourceX = 0,
//                sourceY = 0;
//
//    // id获取一个元素
//        function id(obj){
//            return document.getElementById(obj);
//        }
//
//    // 判断transform类型
//        function getTransform() {
//            var transform = '' ,
//                    divStyle = document.createElement('div').style ,
//                    transformArr = ['transform','webkitTransform','MozTransform','msTransform','OTransform']
//            len = transformArr.length;
//
//            for(var i = 0; i < len ;i++){
//                if (transformArr[i] in divStyle){
//                    return transform = transformArr[i];
//                }
//            }
//            return transform ;
//        }
//
//    // 得到元素css样式
//        function getStyle(elem , property) {
//            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem,false)[property]:elem.currentStyle[property];
//        }
//    //   function getStyle(elem,name) {
//    //        return (elem.currentStyle || getComputedStyle(elem,false))[name];
//    //   }
//
//    // 获取元素初始位置
//        function getTargetPos(elem) {
//            var pos = {x:0,y:0};
//            var transform = getTransform();
//            if(transform){
//                var transformValue = getStyle(elem , transform);
//                if (transformValue == 'none'){
//                    elem.style[transform] = 'translate(0,0)' ;
//                    return pos ;
//                }else{
//                    var temp = transformValue.match(/-?\d+/g);
//                    return pos = {
//                        x : praseInt(temp[4].trim()),
//                        y : pransInt(temp[5].trim())
//                    }
//                }
//            }else{
//                if(getStyle(elem,'position') == 'static'){
//                    elem.style.position = 'relative';
//                    return pos;
//                }else{
//                    var x = parseInt(getStyle(elem,'left') ? getStyle(elem,'left') : 0);
//                    var y = parseInt(getStyle(elem,'top') ? getStyle(elem,'top') : 0);
//                    return pos = {
//                        x : x,
//                        y : y
//                    }
//                }
//            }
//        }
//
//    // 设置元素位置
//        function setTargetPos(elem , pos){
//            var transform = getTransform();
//            if(transform){
//                elem.style[transform] = 'translate('+pos.x + 'px,' + pos.y + 'px)' ;
//            }else{
//                elem.style.left = pos.x +'px' ;
//                elem.style.top = pos.y + 'px' ;
//            }
//            return elem ;
//        }
//
//        function start(e){
//            e.preventDefault();
//            startX = e.pageX;
//            startY = e.pageY;
//
//            var pos = getTargetPos(oelem);
//            sourceX = pos.x;
//            sourceY = pos.y;
//
//            oelem.addEventListener('mousemove' , move , false);
//            oelem.addEventListener('mouseup' , end , false);
//        }
//
//        function move(e){
//            var currentX = e.pageX,
//                currentY = e.pageY;
//
//            var distanceX = currentX - startX,
//                distanceY = currentY - startY;
//            console.log(distanceX);
//            console.log(sourceX);
//
//            setTargetPos(oelem,{
//                x : sourceX + distanceX,
//                y : sourceY + distanceY
//            })
//        }
//
//        function end(e){
//            oelem.removeEventListener('mousemove',move);
//            oelem.removeEventListener('mouseup',end);
//        }
//        window.drag=function(id){
//            oelem = document.getElementById(id);
//            oelem.addEventListener('mousedown',start,false);
//        }
//    }())
//    drag('img');
