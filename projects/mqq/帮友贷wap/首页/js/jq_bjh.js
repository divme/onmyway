$(document).ready(function(){
	/*投资列表页头部滑块滑动*/
	$('#header>div').each(function(index){
		var hkwidth=$('#header>div').width();
		var currindex=$(this).index();
		 var move=currindex*hkwidth;
		 $(this).click(function(){
		 	if(currindex==0){
		 		$('.hk').css('background-color','#FF4343')
		 	}
		 	if(currindex==1){
		 		$('.hk').css('background-color','#23A7F1')
		 	}
		 	if(currindex==2){
		 		$('.hk').css('background-color','#FF4343')
		 	}
		 	if(currindex==3){
		 		$('.hk').css('background-color','#00B899')
		 	}
		 	$('.hk').animate({'left':move},100)
		 })
	})
	var fWidth=$('.icon1').width();
	$('.icon1').css('height',fWidth)
	
	var	setWidth=$('.set_list').width()
		setHeight=setWidth*0.140652
		$('.set_list').css('height',setHeight)
	$('#header div').each(function(index){
		$(this).click(function(){
			
			var currsec=$('section').eq(index)
			$('section').hide();
			currsec.fadeIn('slow');
		})
	})
	
	
})		
