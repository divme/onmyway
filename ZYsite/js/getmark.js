 $(document).ready(function() {
   	var result = 1;
   	$('.getmark').click(function() {
   		var indexp = $(".getmark").index(this);
// 		console.log(indexp);
   		$(this).css({
   			'background': '#e3e3e3',
   			'color': '#000000'
   		});
   		$(this).attr('value', '60秒后重新获取');
   		$('.mark').css('width', '80px');
   		if (result == 0) {
   			alert('发送失败');
   		} else {
   			$('.getmark').eq(indexp).attr('disabled', 'disabled');

   			var time = 60;
   			var timer = setInterval(function() {
   				if (time != 0) {
   					time--;
// 					console.log(time);
   					$('.getmark').eq(indexp).attr('value', time + '秒后重新获取');
   				} else {
   					$('.getmark').eq(indexp).css({
   						'background': '#23A7F1',
   						'color': '#ffffff'
   					});
   					$('.getmark').eq(indexp).attr('value', '获取验证码');
   					$('.getmark').eq(indexp).removeAttr('disabled');
   					$('.mark').css('width', '100px');
   					clearTimeout(timer);
   				}
   			}, 1000);
   		}
   	});
   })