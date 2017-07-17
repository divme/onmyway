/**
 * Created by mszq on 2017/7/17.
 */
$(function(){
    var that = $('.container'),
        count = that.find('.pic').length;
    var	index = 0,
        Timer;
//			基础函数
    function carousel(num){
        if( num < 0 ){ index = count-1 }
        if( num == count ){ index = 0 }
        $('.pic').css('display','none').eq(num).css('display','block');
        $('.one').css('background','white').eq(num).css('background','seagreen');
        index = num;
    }
    carousel(index);

//			自动轮播
    that.hover(function(){
        if(Timer){clearInterval(Timer)}
    },function() {
        Timer = setInterval(function(){
            carousel(index);
            index++;
            if(index == count){ index = 0 }
        },3000);
    });

//			控制器和前进后退
    $('#icon').on('mouseover','.one',function(){
        index = $('.one').index(this);
        carousel(index);
    });
    $('.left').click(function(){
        index--;
        if(index == -1){ index = count-1 }
        carousel(index);
    });
    $('.right').click(function(){
        index++;
        if(index == count){ index = 0 }
        carousel(index);
    })
})