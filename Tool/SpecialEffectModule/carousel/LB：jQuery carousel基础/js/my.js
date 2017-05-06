$(function(){
      var width = $('#focus').width() ;
      var count = $('#focus ul li').length ;
      var index  = 0 ;  
      var Timer ;
 
      var html = "<div class='icon'>" ;
      for (var i = 0;i<count;i++){
         html += "<span></span>"
      }  
      html += "</div><div class='prenext pre'></div><div class='prenext next'></div>"
      $('#focus').append(html);

      $('#focus ul').css('width',width*count);
      

      function show(index){
        var nowleft = - index *width;
        $('#focus ul').stop(true,false).animate({'left':nowleft},300);
        $('#focus .icon span').removeClass('on').eq(index).addClass('on');
        $('#focus .icon span').stop(true,false).animate({'opacity':'0.6'},300).eq(index).stop(true,false).animate({'opacity':'1'},300);
      }
      
      // 自动carousel
      $('#focus').hover(function(){
          clearInterval(Timer);
      },function(){
          Timer = setInterval(function(){
            show(index);
            index++;
            if(index == count){index = 0};
          },3000);
      })

      // 前一页后一页效果
      $('#focus .prenext').css('opacity','0.3').hover(function(){
          $(this).stop(true,false).animate({'opacity':'0.6'},300);
      },function(){
          $(this).stop(true.false).animate({'opacity':'0.6'},300);
      })

      $('#focus .pre').click(function(){
         index -= 1;
         if(index == -1){ index = count - 1 };
         show(index); 
      });
      $('#focus .next').click(function(){
         index += 1;
         if(index == count){ index = 0 };
         show(index); 
      });

      // 控制器效果
      $('#focus .icon span').css('opacity',0.6).mouseover(function(){
          index = $('#focus .icon span').index(this);
          show(index);
      });

}) 