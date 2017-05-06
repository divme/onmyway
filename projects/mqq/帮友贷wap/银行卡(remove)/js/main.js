$(document).ready(function(){
	
	$('.set').click(function(e){
		
		$('input[type="checkbox"]').toggle('fast',function(){
			
			$('footer').fadeToggle()
			
		})
		
		
	})
	
	$(".xiadan").click(function(){
		$('.zhedangceng').fadeIn('slow')
		$('.tanchukuang').fadeIn(500)
	})
	$('.tanchukuang>a:nth-of-type(2)').click(function(){
		$('.zhedangceng').fadeOut('fast')
		$('.tanchukuang').fadeOut(200)
		
	})
})

