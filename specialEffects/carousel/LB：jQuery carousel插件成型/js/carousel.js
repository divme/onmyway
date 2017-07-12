jQuery.fn.extend({ 
  slideFocus: function(){
    var This = $(this);
    var sWidth = This.width(),
      len    = This.find('ul li').length,
      index  = 0,
      Timer;

    // 添加控制器和前进后退键
    var btn = "<div class='btn'>";
    for(var i=0; i < len; i++) {
      btn += "<span></span>";
    };
    btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    This.append(btn);
    This.find('.btn span').eq(0).addClass('on');

    // 控制器和前进后退
    This.find('.btn span').mouseover(function(){
      index = This.find('.btn span').index(this);
      carousel(index);
    })
    This.find('.next').click(function(){
      index++;
      if(index == len){index = 0;}
      carousel(index);
    })
    This.find('.pre').click(function(){
      index--;
      if(index == -1){index = len - 1;}
      carousel(index);
    })


    // 自动carousel    
    This.find('ul').css("width",sWidth * len);
    This.hover(function(){
      clearInterval(Timer);
      show(This.find('.preNext'));
    },function(){
      hide(This.find('.preNext'));
      Timer=setInterval(function(){
        carousel(index);
        index++;
        if(len == index){index = 0;}
      }, 2000)
    }).trigger("mouseleave")

    // 基础函数
    function carousel(index){
      var new_width = -index * sWidth;
      This.find('ul').stop(true,false).animate({'left' : new_width},300);
      This.find('.btn span').stop(true,false).eq(index).addClass('on').siblings().removeClass('on');
    };
    function show(obj){ obj.stop(true,false).fadeIn();}
    function hide(obj){ obj.stop(true,false).fadeOut();}
  }
});