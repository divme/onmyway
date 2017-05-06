

// 设置状态
function state(obj,i){
    $('.text_time').css('display','none');
    $('.rest_time').css('display','none');
    $('.finish').css('display','none');
    $('.nostart').css('display','none');
    $('.button_img').find('img').attr('src','img/day_button2.png');
    $('.clock_img').each(function(index){
        $(this).find('img').attr('src','img/1'+ index*2 +'_none.png');
    });
    if(obj ){
      i < 0 ? obj.css('display','block'): obj.eq(i).css('display','block');
    }
}
// 时间格式处理
function formattime(time){
    var h = Math.floor(time/3600);
    h = (h>=10)?h:("0"+h);
    var m = Math.floor((time-3600*h)/60);
    m = (m>=10)?m:("0"+m);
    var s = time-3600*h-60*m;
    s = (s>=10)?s:("0"+s);
    return h+':'+m+':'+s ;
}
function gettime(index){
    var date  = new Date(),
        time  = date.getTime();
    var t = date.setHours(10 + index*2,0,0,0);
    var c = Math.floor((t - time)/1000);
    return formattime(c);
}
// 图片处理
function clockimg(){
    for (var i=0;i<5;i++) {
        $('.button_img').eq(i).find('img').attr('src','img/day_button2.png');
    }
    $('.clock_img').each(function(index){
        $(this).find('img').attr('src','img/1'+ index*2 +'_none.png')
    })
}


// 初始化
!function init(){
	var mydate = new Date();
	var myhour = mydate.getHours();
	if(myhour < 10){
        state($('.nostart') , -1);
    }
    if(myhour > 20){
	    state($('.finish'), -1);
    }else{
        for(var i = 0 ; i < 5 ; i++){
            state();
            var m = 10 + i * 2;
            var n = 12 + i * 2;
            if (myhour >= m && myhour < n){
                state($('.text_time') , i);
                $('.button_img').eq(i).find('img').attr('src','img/day_button1.png');
                $('.clock_img').eq(i).find('img').attr('src','img/'+ (10+i*2) +'_have.png');
                // 之前的设置为 finish
                for(var j = 0; j < i;j++){
                    $('.finish').eq(j).css('display','block');
                }
                // 之后的设置为 倒计时
                for(var p = 5; p > i;p--){
                    var text = gettime(p);
                    $('.rest_time').eq(p).css('display','block').text('倒计时 '+text);
                }
                break;
            }
        }
    }

    // setTimeout(init,1000)
}()

