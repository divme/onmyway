$(document).ready(function(){
	outslider()
	$('.menu').each(function(index){
		var curr=$(this).index();
		$(this).click(function(){
			$('.menu').removeClass('btn-style')
			$(this).addClass('btn-style')
			$('.img').removeClass('item')
			$('.img').eq(curr).addClass('item')
			$('.img').css({opacity:0}).stop().animate({opacity:1},2000)
			return false;
		})
	})
	
	var timer;
	function outslider(){
		timer=setInterval(function(){
			var len=$('.menu').length;
			var currbtn=$('.menu.btn-style')
			    currbtnindex=currbtn.index();
			    nextbtnindex=currbtnindex+1;
			    if(nextbtnindex>len-1){
			    	nextbtnindex=0
			    }
			    $('.menu').eq(nextbtnindex).trigger('click')
		},2000)
		
	}
})
