$.fn.extend({
  slideFocus: function(){
         var it = $(this);
         var width = it.width(),
             count = it.find('ul li').length,
             index = 0,
             Timer;
         // 添加控制器和左右按钮
         var btn = "<div class='btns'>";
         for(var i = 0 ; i < count ; i++){
           btn += "<span class='btn'></span>"
         }    
         btn += "</div><div class='prenext pre'></div><div class='prenext next'></div>";
         it.append(btn);
         it.find('.btn').eq(0).addClass('on');
         // 设置ul的宽度
         it.find('ul').css('width',count*width);
         
         // 基础函数
         function carousel(index){
             var newleft = - index * width ;
             it.find('ul').stop(stop,false).animate({'left':newleft},300);
             it.find('.btn').stop(stop,false).eq(index).addClass('on').siblings().removeClass('on');
         }
         function show(obj){obj.stop(true,false).fadeIn()}
         function hide(obj){obj.stop(true,false).fadeOut()}

         // 自动carousel
         it.hover(function(){
             clearInterval(Timer);
             show(it.find('.prenext'));
         },function(){
             hide(it.find('.prenext'));
             Timer = setInterval(function(){
                carousel(index);
                index++;
                if(index == count){ index = 0 }
            },3000)
         }).trigger('mouseleave');
         
         // 控制器和前后键
         it.find('.btns').on('mouseover','.btn',function(){
             index = $('.btn').index(this);
             carousel(index);
         });
         it.find('.pre').click(function(){
             index--;
             if(index == -1){ index = count -1 }
             carousel(index);  
         });
         it.find('.next').click(function(){
             index++;
             if(index==count){ index=0 }
             carousel(index);
         })
  }
});