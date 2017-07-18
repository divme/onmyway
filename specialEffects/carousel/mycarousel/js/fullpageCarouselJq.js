/**
 * Created by mszq on 2017/7/17.
 */
$(function(){
    var width = window.innerWidth,
        height = window.innerHeight,
        $inner = $(".inner-container"),
        $con  = $('.container'),
        $wrapper = $('.wrapper'),
        count = $inner.length,
        index = 0,
        Timer;

    // 添加控制器和左右按钮
//			var btn = "<div class='btns' id='icon'>";
//			for(var i = 0 ; i < count ; i++){
//				btn += "<span class='btn'></span>"
//			}
//			btn += "</div>";
//			btn += "</div><div class='prenext left'></div><div class='prenext right'></div>";
//			$('.wrapper').append(btn);
//
//			$('.btn').eq(0).addClass('on');
    // 设置宽度
    $inner.css({'width':width,'height':height});
    $con.css('width',count*width);

    // 基础函数
    function carousel(index){
        var newleft = - index * width ;
        $('.container').stop(stop,false).animate({'left':newleft},300);
        $('.btn').stop(stop,false).eq(index).addClass('on').siblings().removeClass('on');
    }
    function show(obj){obj.css('opacity','1')}
    function hide(obj){obj.css('opacity','.2')}

    // 自动carousel
    $wrapper.hover(function(){
        clearInterval(Timer);
        show($('.prenext'));
    },function(){
        hide($('.prenext'));
        Timer = setInterval(function(){
            index++;
            if(index == count){ index = 0 }
            carousel(index);
        },3000)
    });

    // 控制器和前后键
    $('#icon').on('mouseover','.btn',function(){
        index = $('.btn').index(this);
        carousel(index);
    });
    $('.left').click(function(){
        index--;
        if(index == -1){ index = count -1 }
        carousel(index);
    });
    $('.right').click(function(){
        index++;
        if(index==count){ index=0 }
        carousel(index);
    })
})