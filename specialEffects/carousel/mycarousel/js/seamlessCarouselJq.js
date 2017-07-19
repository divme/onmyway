/**
 * Created by mszq on 2017/7/17.
 */
$(function(){
    var width = window.innerWidth,
        height = window.innerHeight,
        $wrapper = $('.wrapper'),
        $con  = $('.container'),
//				这两个要变的
        $inner = $(".inner-container"),
        count1 = $inner.length,

        index = 0,
        Timer;


//          添加控制器和左右按钮
    var btn = "<div class='btns' id='icon'>";
    for(var i = 0 ; i < count1 ; i++){
        btn += "<span class='btn'></span>"
    }
    btn += "</div>";
    btn += "</div><div class='prenext left'></div><div class='prenext right'></div>";
    $wrapper.append(btn);

    $('.btn').eq(0).addClass('on');


//          设置宽度，前后各插入一张图片
    $inner.css({'width':width,'height':height});
    $con.prepend($inner.last().clone());
    $con.append($inner.first().clone());

    $inner = $(".inner-container");
    count2 = $inner.length;
    $con.css({'width':count2*width,'left': (-1)*width+'px'});

    // 基础函数
    function carousel(){
        var newleft;
        if(index >= count2-1){
            newleft = (-1)*(count2-1)*width;
            $con.stop(stop,false).animate({'left':newleft+'px'},300,function(){
                $con.css({'left': (-1)*width})
            });
            index = 1;
            $('.btn').stop(stop,false).eq(index-1).addClass('on').siblings().removeClass('on');
            return ;
        }
        newleft = - index * width ;
        $('.container').stop(stop,false).animate({'left':newleft},300);
        $('.btn').stop(stop,false).eq(index-1).addClass('on').siblings().removeClass('on');
//				Timer = setTimeout(carousel, 3000);
    }

    // 自动carousel
    $wrapper.hover(function(){
        if(Timer){
            clearInterval(Timer);
        }
    },function(){
        Timer = setInterval(function(){
            index++;
            carousel();
        },3000)
    });

    // 控制器和前后键
    $('#icon').on('mouseover','.btn',function(){
        var bindex  = $('.btn').index(this);
        index = bindex + 1;
        carousel();
    });
    $('.left').click(function(){
        index--;
        var newleft;
        if(index <= 0){
            newleft = 0;

            $con.stop(stop,false).animate({'left':newleft},300,function(){
                $con.css({'left': (-1)*(count2-2)*width})
            });
            index = count2-2;
            $('.btn').stop(stop,false).eq(index-1).addClass('on').siblings().removeClass('on');
            return;
        }
        carousel();
    });
    $('.right').click(function(){
        var newleft;
        index++;
        carousel();
    })
})



// 单纯无缝代码
// $(function(){
//     var width = window.innerWidth,
//         height = window.innerHeight,
//         $inner = $(".inner-container"),
//         $con  = $('.container'),
//         $wrapper = $('.wrapper'),
//         count = $inner.length,
//         Timer;
//
//     // 设置宽度
//     $inner.css({'width': width});
//     $con.css('width',count*width);
//
//     // 基础函数
//     function carousel(){
//         var newleft = - width + 'px';
//         $con.stop(stop,false).css({'transform':newleft},300,function(){
//             $(".inner-container").first().insertAfter($(".inner-container").last());
//             $con.stop(stop,false).animate({'left':'0'},0);
//         });
//     }
//
//     // 自动carousel
//     $wrapper.hover(function(){
//         if(Timer){
//             clearInterval(Timer);
//         }
//     },function(){
//         Timer = setInterval(function(){
//             carousel();
//         },3000)
//     });
// })