
       var startmark =true;
// 工具函数四个
  // 图片分时间和按钮图片
  // 时间和按钮 全部设置为等待领取状态
         function clockimg(){
        	    for (var i=0;i<5;i++) {
					$('.button_img').eq(i).find('img').attr('src','img/day_button2.png');
        	    }
			    $('.clock_img').each(function(index){
					$(this).find('img').attr('src','img/1'+ index*2 +'_none.png')
				})
		}

   // 按钮下方文本有四种类型 ：未开始、倒计时、正在进行、已结束；
   // 倒计时，隐藏 （未开始、已结束、正在进行） 三种状态；
		 function restTime(){
		 		$finish.css('display','none');
		 		$nostart.css('display','none');
		 		$text.css('display','none');
		 		$rest.css('display','block');
		 }

  // 未开始 ，隐藏 （已结束、正在进行、倒计时） 三种状态；
		 function nostart(){
		 		$text.css('display','none');
		 		$rest.css('display','none');
		 		$finish.css('display','none');
		 		$nostart.css('display','block');
		 }

   // 已结束 ，隐藏 （未开始、正在进行、倒计时） 三种状态；
		 function finish(len) {
			 $text.css('display', 'none');
			 $rest.css('display', 'none');
			 $nostart.css('display', 'none');
			 $finish.css('display', 'block');
		 }
// 设置状态
		function init(){
				var mydate = new Date();
			    var myhour = mydate.getHours();
			    if(myhour >= 0 && myhour < 10){
			    	clockimg();
			    	nostart();
			    }
			    if(myhour >= 10 && myhour < 12){
			    	clockimg();
			    	clock.eq(0).find('img').attr('src','img/10_have.png');
			    	$button.eq(0).find('img').attr('src','img/day_button1.png');
			    	restTime();
			    	$text.eq(0).css('display','block');
		 		    $rest.eq(0).css('display','none');
			    }
			    if(myhour >=12 && myhour < 14){
			    	clockimg();
                    clock.eq(0).find('img').attr('src','img/10_none.png');
			    	$button.eq(0).find('img').attr('src','img/day_button2.png');
			    	clock.eq(1).find('img').attr('src','img/12_have.png');
			    	$button.eq(1).find('img').attr('src','img/day_button1.png');
			    	restTime();
                    $text.eq(0).css('display','none');
		 		    $finish.eq(0).css('display','block');
			    	$text.eq(1).css('display','block');
		 		    $rest.eq(1).css('display','none');
		 		    finish(1);
			    }
			    if(myhour>=14&&myhour<16){
			    	clockimg();
			    	clock.eq(2).find('img').attr('src','img/14_have.png');
			    	$button.eq(2).find('img').attr('src','img/day_button1.png');
			    	restTime();
			    	$text.eq(2).css('display','block');
		 		    $rest.eq(2).css('display','none');
		 		    finish(2);
			    }
			    if(myhour>=16&&myhour<18){
			    	clockimg();
			    	clock.eq(3).find('img').attr('src','img/16_have.png');
			    	$button.eq(3).find('img').attr('src','img/day_button1.png');
			    	restTime();
			    	$text.eq(3).css('display','block');
		 		    $rest.eq(3).css('display','none');
		 		    finish(3);
			    }
			    if(myhour>=18&&myhour<20){
			    	clockimg();
			    	clock.eq(4).find('img').attr('src','img/18_have.png');
			    	$button.eq(4).find('img').attr('src','img/day_button1.png');
			    	restTime();
			    	$text.eq(4).css('display','block');
		 		    $rest.eq(4).css('display','none');
		 		    finish(4);
			    }
			     if(myhour>20&&myhour<=24){
			    	clockimg();
			    	finish(5);
			    }
			}
		function lightHour2(){
				var mydate = new Date();
			    var myhour = mydate.getHours();
			    if (myhour=0) {
			    	if(startmark){
                        nostart();
                        startmark = false;
					}

			    }
			    if(myhour==10){
			    	clock.eq(0).find('img').attr('src','img/10_have.png');
			    	$button.eq(0).find('img').attr('src','img/day_button1.png');
			    	$text.eq(0).css('display','block');
		 		    $nostart.eq(0).css('display','none');
			    }
			    if(myhour==12){
                    clock.eq(0).find('img').attr('src','img/10_none.png');
			    	$button.eq(0).find('img').attr('src','img/day_button2.png');
			    	$text.eq(0).css('display','none');
			    	$finish.eq(0).css('display','block');

			    	clock.eq(1).find('img').attr('src','img/12_have.png');
			    	$button.eq(1).find('img').attr('src','img/day_button1.png');
			    	$rest.eq(1).css('display','none');
			    	$text.eq(1).css('display','block');
			    }
			    if(myhour==14){
			    	clock.eq(1).find('img').attr('src','img/12_none.png');
			    	$button.eq(1).find('img').attr('src','img/day_button2.png');
			    	$text.eq(1).css('display','none');
			    	$finish.eq(1).css('display','block');

			    	clock.eq(2).find('img').attr('src','img/14_have.png');
			    	$button.eq(2).find('img').attr('src','img/day_button1.png');
			    	$rest.eq(2).css('display','none');
			    	$text.eq(2).css('display','block');
			    }
			    if(myhour==16){
			    	clock.eq(2).find('img').attr('src','img/14_none.png');
			    	$button.eq(2).find('img').attr('src','img/day_button2.png');
			    	$text.eq(2).css('display','none');
			    	$finish.eq(2).css('display','block');

			    	clock.eq(3).find('img').attr('src','img/16_have.png');
			    	$button.eq(3).find('img').attr('src','img/day_button1.png');
			    	$text.eq(3).css('display','block');
		 		    $rest.eq(3).css('display','none');
			    }
			    if(myhour==18){
			        clock.eq(3).find('img').attr('src','img/16_none.png');
			    	$button.eq(3).find('img').attr('src','img/day_button2.png');
			    	$text.eq(3).css('display','none');
			    	$finish.eq(3).css('display','block');

			    	clock.eq(4).find('img').attr('src','img/18_have.png');
			    	$button.eq(4).find('img').attr('src','img/day_button1.png');
			    	$text.eq(4).css('display','block');
		 		    $rest.eq(4).css('display','none');
			    }
			     if(myhour==20){
			    	clock.eq(4).find('img').attr('src','img/18_none.png');
			    	$button.eq(4).find('img').attr('src','img/day_button2.png');
			    	$text.eq(4).css('display','none');
			    	$finish.eq(4).css('display','block');
			    }
			    var timmer = setTimeout(lightHour2,1000);
			}


// 以下两个函数设置时间显示格式
		function timenum(time,i){
		 	     if (time < 0) { finish(i) }
		 	        var h = Math.floor(time/3600);
                        h = (h>=10)?h:("0"+h);
                    var m = Math.floor((time-3600*h)/60);
                        m = (m>=10)?m:("0"+m);
                    var s = time-3600*h-60*m;
                        s = (s>=10)?s:("0"+s);
                    $('.hour').eq(i).text(h);
                    $('.minu').eq(i).text(m);
                    $('.second').eq(i).text(s);
		}
		function countDown(){
		    	    var t = new Date(),
		    	        time0 = t.setHours(10,0,0,0),
		    	        time1 = t.setHours(12,0,0,0),
		    	        time2 = t.setHours(14,0,0,0),
		    	        time3 = t.setHours(16,0,0,0),
		    	        time4 = t.setHours(18,0,0,0),
                        time = new Date().getTime(),
                        c0 = Math.floor((time0 - time)/1000),
                        c1 = Math.floor((time1 - time)/1000),
                        c2 = Math.floor((time2 - time)/1000),
                        c3 = Math.floor((time3 - time)/1000),
                        c4 = Math.floor((time4 - time)/1000);
 					timenum(c0,0);
 					timenum(c1,1);
 					timenum(c2,2);
 					timenum(c3,3);
 					timenum(c4,4);
                    var timer = setTimeout(countDown,1000);
		}

		$(document).ready(function(){
			 $button = $('.button_img');
			 clock = $('.clock_img');
			 $nostart = $('.nostart');
			 $finish = $('.finish');
			 $text = $('.text_time');
			 $rest = $('.rest_time');
			   init();
			   lightHour2();
			   countDown();
		})
