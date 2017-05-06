        function clockimg(){
		 		$('.clock_img').eq(0).find('img').attr('src','img/10_none.png');
		 		$('.clock_img').eq(1).find('img').attr('src','img/12_none.png');
		 		$('.clock_img').eq(2).find('img').attr('src','img/14_none.png');
		 		$('.clock_img').eq(3).find('img').attr('src','img/16_none.png');
		 		$('.clock_img').eq(4).find('img').attr('src','img/18_none.png');
		 		$('.button_img').eq(0).find('img').attr('src','img/day_button2.png');
		 		$('.button_img').eq(1).find('img').attr('src','img/day_button2.png');
		 		$('.button_img').eq(2).find('img').attr('src','img/day_button2.png');
		 		$('.button_img').eq(3).find('img').attr('src','img/day_button2.png');
		 		$('.button_img').eq(4).find('img').attr('src','img/day_button2.png');
		}  
		 function textTime(){
		 	for (var i = 0; i < 5; i++) {
		 		$('.finish').eq(i).css('display','none');
		 		$('.nostart').eq(i).css('display','none');
		 		$('.text_time').eq(i).css('display','none');
		 		$('.rest_time').eq(i).css('display','block');
		 	}	
		 }
		 function nostart(){
		 	for (var i = 0; i < 5; i++) {
		 		$('.text_time').eq(i).css('display','none');
		 		$('.rest_time').eq(i).css('display','none');
		 		$('.finish').eq(i).css('display','none');
		 		$('.nostart').eq(i).css('display','block');
		 	}	
		 }
		 function finish(len){
		 	for (var i = 0; i < len; i++) {
		 		$('.text_time').eq(i).css('display','none');
		 		$('.rest_time').eq(i).css('display','none');
		 		$('.nostart').eq(i).css('display','none');
		 		$('.finish').eq(i).css('display','block');
		 	}
		 }
		function lightHour(){
				var mydate = new Date();
			    var myhour = mydate.getHours();
			    if(myhour>=0&&myhour<10){
			    	clockimg();
			    	nostart();
			    }
			    if(myhour>=10&&myhour<12){
			    	clockimg();
			    	$('.clock_img').eq(0).find('img').attr('src','img/10_have.png');
			    	$('.button_img').eq(0).find('img').attr('src','img/day_button1.png');
			    	textTime();
			    	$('.text_time').eq(0).css('display','block');
		 		    $('.rest_time').eq(0).css('display','none');	
			    }
			    if(myhour>=12&&myhour<14){
			    	clockimg();
			    	$('.clock_img').eq(1).find('img').attr('src','img/12_have.png');
			    	$('.button_img').eq(1).find('img').attr('src','img/day_button1.png');
			    	textTime();
			    	$('.text_time').eq(1).css('display','block');
		 		    $('.rest_time').eq(1).css('display','none');		 		     
		 		    finish(1);
			    }
			    if(myhour>=14&&myhour<16){
			    	clockimg();
			    	$('.clock_img').eq(2).find('img').attr('src','img/14_have.png');
			    	$('.button_img').eq(2).find('img').attr('src','img/day_button1.png');
			    	textTime();
			    	$('.text_time').eq(2).css('display','block');
		 		    $('.rest_time').eq(2).css('display','none');
		 		    finish(2);
			    }
			    if(myhour>=16&&myhour<18){
			    	clockimg();
			    	$('.clock_img').eq(3).find('img').attr('src','img/16_have.png');
			    	$('.button_img').eq(3).find('img').attr('src','img/day_button1.png');
			    	textTime();
			    	$('.text_time').eq(3).css('display','block');
		 		    $('.rest_time').eq(3).css('display','none');
		 		    finish(3);
			    }
			    if(myhour>=18&&myhour<20){
			    	clockimg();
			    	$('.clock_img').eq(4).find('img').attr('src','img/18_have.png');
			    	$('.button_img').eq(4).find('img').attr('src','img/day_button1.png');
			    	textTime();
			    	$('.text_time').eq(4).css('display','block');
		 		    $('.rest_time').eq(4).css('display','none');
		 		    finish(4);
			    }
			     if(myhour>=20&&myhour<24){
			    	clockimg();
			    	finish(5);
			    }
			    var timmer = setTimeout(lightHour,1000);
			}
// 给一位数的小时，分钟，秒前面加0
		    function doublen(num){
		    	if (num<0) {
		    		num = 00;
		    		return num;
		    	}else if (num>=0&&num<10) {
		    		num ="0" + num;
		    		return num;
		    	}else{
		    		return num;
		    	}
		    }
//把时间秒数化为小时,分钟,秒
		 function timenum(num,j){
		 	     if (num<0) {
		 	     	finish(j);
		 	     }
		 	        var h = Math.floor(num/3600);
                        h = doublen(h);
                    var m = Math.floor((num-3600*h)/60);
                        m = doublen(m);
                    var s = num-3600*h-60*m;
                        s = doublen(s);
                    $('.hour').eq(j).text(h);
                    $('.minu').eq(j).text(m);
                    $('.second').eq(j).text(s);
		 }
		    
		    function countDown(){
		    	    var t = new Date(),
//		    	        time0 = t.setHours(10,0,0,0), 
		    	        time1 = t.setHours(12,0,0,0),
		    	        time2 = t.setHours(14,0,0,0),
		    	        time3 = t.setHours(16,0,0,0),
		    	        time4 = t.setHours(18,0,0,0),
                        time = new Date().getTime(),
//                      c0 = Math.floor((time0 - time)/1000),
                        c1 = Math.floor((time1 - time)/1000),
                        c2 = Math.floor((time2 - time)/1000),                        
                        c3 = Math.floor((time3 - time)/1000),
                        c4 = Math.floor((time4 - time)/1000);
// 					timenum(c0,0); 
 					timenum(c1,1);
 					timenum(c2,2);
 					timenum(c3,3);
 					timenum(c4,4);
                    var timer=setTimeout(countDown,1000);
		    }
		     function count(){
				   	var date1 = new Date();
					var date2 = new Date();date2.setMonth(7,1);
					var start = date1.getTime();
					var end = date2.setHours(0,0,0,0);
                    var differ = Math.floor((end - start)/1000);
                    var day =Math.floor(differ/(60*60*24));
                        day = (day>=10)?day:("0"+day);
                    var hour =Math.floor((differ-day*3600*24)/3600);
                        hour =(hour>=10)?hour:("0"+hour);
                    var minu =Math.floor((differ-day*3600*24-3600*hour)/60);
                        minu = (minu>=10)?minu:("0"+minu);
                    var second =Math.floor(differ-day*3600*24-3600*hour-60*minu);
                        second = (second>=10)?second:("0"+second);
                        $('.count_day').text(day);
                        $('.count_hour').text(hour);
                        $('.count_minu').text(minu);
                        $('.count_second').text(second);
                        setTimeout(count,1000);
				   }
			$(document).ready(function(){
			   lightHour();
			   countDown(); 
			   count();
			})