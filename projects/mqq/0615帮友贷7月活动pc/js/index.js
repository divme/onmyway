$(document).ready(function(){
    function timeChange(){
        var date = new Date();
        var today = new Date();
        var hours = date.getHours();
        var index= Math.floor((hours-10)/2);
        $(".time_show li").removeClass("time_current");
        $(".time_show li").eq(index).addClass("time_current");
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        function countDown(num){
            today.setHours(10+2*num);
            var dateTime = date.getTime();
            var todayTime = today.getTime();
            var differTime = todayTime - dateTime;
            return differTime;
            console.log(differTime);
        }
        function tenHours(){
            number = 5;
            for(var i=0;i<$(".time_show li").length;i++){
                $(".receive").eq(i).removeClass("receive_btn receive_btn_curr")
                var dTime = countDown(i);
                if(dTime<0){
                    if(dTime<-1000*60*60*2){
                        $(".receive_down").eq(i).html("当日活动已结束");
                        $(".receive").eq(i).addClass("receive_btn")
                    }else{
                        $(".receive_down").eq(i).html("还剩<span>"+number+"</span>个未领取");
                        $(".receive").eq(i).addClass("receive_btn_curr")
                    }
                }else{
                    var timeH = Math.floor(dTime/1000/60/60);
                    timeH = (timeH>=10)?timeH:("0"+timeH);
                    var timeM = Math.floor(dTime%(1000*60*60)/1000/60);
                    timeM = (timeM>=10)?timeM:("0"+timeM);
                    var timeS = Math.floor(dTime%(1000*60)/1000);
                    timeS = (timeS>=10)?timeS:("0"+timeS);
                    var html = timeH+":"+timeM+":"+timeS;
                    $(".receive_down").eq(i).html("倒计时<span>"+html+"</span>");
                    $(".receive").eq(i).addClass("receive_btn")
                }
            }
        }
        tenHours();
    }
    timeChange();
    setInterval(timeChange,1000);
})