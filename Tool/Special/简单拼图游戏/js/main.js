
$(document).ready(function() {
    
    var zi = 1;
    var EmptySquare = 9;// The index of the empty square by default, the 9th square

    
 
    $.fn.extend({ 
        game:function(square_size) {
            var gameObjectElement = '#' + $(this).attr('id'); 
            var sqSize = square_size + 'px';
            var boardSize = (square_size * 3) + 'px';
           
            $(gameObjectElement).html('<div id="board"></div>'); 
            $('#board').css({ position:'absolute', width: boardSize, height: boardSize, border: '1px solid gray' });

            for (var i = 0; i < 9; i++) {
                $('#board').append("<div style='left: " + ((i % 3) * square_size) + "px; top: " + Math.floor(i / 3) * square_size + "px; width: " + square_size + "px; height: " + square_size + "px; background-position: " + (-(i % 3) * square_size) + "px " + -Math.floor(i / 3) * square_size + "px '></div>");
            }

            $('#board').children("div:nth-child(9)").css({backgroundImage: "", background: "#ffffff"});
            $('#board').children('div').click(function() {
                Move(this, square_size);
            });
        }    
    });

   
    function Move(clicked_square, square_size) {
        var movable = false;
        // var oldx = $('#board').children("div:nth-child(" + 9 + ")").css('left');
        // var oldy = $('#board').children("div:nth-child(" + 9 + ")").css('top');
        var oldx = parseInt($('#board>div').eq(8).css('left')) ;
        var oldy = parseInt($('#board>div').eq(8).css('top'));

        var newx = parseInt($(clicked_square).css('left'));
        var newy = parseInt($(clicked_square).css('top'));

    // 精简一点的写法
        if((Math.abs(oldx-newx)== square_size && Math.abs(oldy-newy)== 0)||(Math.abs(oldx-newx)== 0 && Math.abs(oldy-newy)== square_size)){
                movable = true;
        }

    // 最基本最传统最老实的写法
        // if (oldx == newx && newy == (parseInt(oldy) - square_size) + 'px')
        //     movable = true;

        // if (oldx == newx && newy == (parseInt(oldy) + square_size) + 'px')
        //     movable = true;
        
        // if ((parseInt(oldx) - square_size) + 'px' == newx && newy == oldy)
        //     movable = true;
 
        // if ((parseInt(oldx) + square_size) + 'px' == newx && newy == oldy)
        //     movable = true;
 
        if (movable) {
            $(clicked_square).css('z-index', zi++);

            $(clicked_square).animate({ left: oldx, top: oldy }, 200, function() {
                $('#board').children("div:nth-child(" + 9 + ")").css('left', newx);
                $('#board').children("div:nth-child(" + 9 + ")").css('top', newy);
            });
        }
    }

    $('#game_object').game(300);
});