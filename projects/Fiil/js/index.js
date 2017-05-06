$(document).ready(function () {
    var win = $(window);
    var swiperOption = {};
    swiperOption = {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        autoplay: 5000,
        loop: true,
        calculateHeight: true,
        autoplayDisableOnInteraction:false,
    };
    swiperOption.onSwiperCreated = function() {
    }, swiperOption.onSlideChangeStart = function(e) {
    };
    var swiper = new Swiper('.swiper-container', swiperOption);
    $('[data-nav="index"]').addClass('active');
    var winWidth = window.screen.width;
    var winHeight = winWidth*830/1920;
    var getBottomHeight = function (){
        return winHeight > 750 ? 150 : 60;
    };
    var nav = $('.j-nav-bar').addClass('home-nav');
    var navBack = $('.j-nav-bar .nav-back');
    var yuyueWidth = 185;
    var yuyueHeight = 48;
    var ratio = winWidth/1920;
    var fontSizeYuyue = 25;
    var fontSizeXiangqing = 20;

    $(".init-height").height(winHeight);

    $(".banner1").css("background-size","auto "+winHeight+"px");
    $(".banner2").css("background-size","auto "+winHeight+"px");
    $(".banner3").css("background-size","auto "+winHeight+"px");
    $(".banner4").css("background-size","auto "+winHeight+"px");

    $(".diva-btn-yuyue").css("width",yuyueWidth*ratio);
    $(".diva-btn-yuyue").css("height",yuyueHeight*ratio);
    $(".diva-btn-yuyue").css("margin-top",winHeight*0.67);
    $(".diva-btn-xiangqing").css("margin-top",winHeight*0.7);
    $(".diva-btn-yuyue").css("font-size",fontSizeYuyue*ratio);
    $(".diva-btn-xiangqing").css("font-size",fontSizeXiangqing*ratio);
    $(".diva-btn-yuyue").css("line-height",yuyueHeight*ratio+"px");
    $(".diva-btn-yuyue").css("margin-left",-440*ratio);
    $(".diva-btn-xiangqing").css("margin-left",-180*ratio);

    var fadeInDivs = $('.story-grid.wrapper .fade-item');
    var fadeItems = [];
    var initFadeItems = function () {
        $.each(fadeInDivs, function (i, div) {
            var top = $(div).parent().offset().top;
            fadeItems[i] = {start: top - winHeight + 100, el: $(div)};
        });
    };
    console.log(initFadeItems());
    initFadeItems();

    var player = document.getElementById("fiil-player"),
        controller = $(".player-controller"),
        playBtn = $(".player-controller .play"),
        pauseBtn = $(".player-controller .pause");
    var toggleBtn = function () {
        if (controller.fadeIn().hasClass("active")) {
            playBtn.hide();
            pauseBtn.show();
        } else {
            playBtn.show();
            pauseBtn.hide();
        }
    };
    $(document).on("click", ".player-controller", function () {
        controller.toggleClass("active").hasClass("active") ? player.play() : player.pause();
        toggleBtn();
    }).on("mouseenter", ".video-wrap", function () {
        player.play();
        controller.addClass("active");
        toggleBtn();
    }).on("mouseleave", ".video-wrap", function () {
        controller.fadeOut();
    });

    win.scroll(function () {
        var top = win.scrollTop();
        $('.swiper-container').css("top", -top * 0.3);
        if(top > winHeight - getBottomHeight() - 80){
            nav.removeClass("home-nav");
        } else {
            nav.addClass("home-nav");
        }
        if (top > 10) {
            var opacity = top / 1000;
            opacity = opacity > 0.95 ? 0.95 : opacity < 0.3 ? 0.3 : opacity;
            navBack.css({opacity: opacity});
        } else {
            navBack.css({opacity: ""});
        }
        $.each(fadeItems, function (i, obj) {
            if (top > obj.start) {
                obj.el.fadeIn(800);
            } else {
                obj.el.fadeOut(800);
            }
        });
        top < $(player).offset().top - winHeight && player.pause();
    });

    win.resize(function () {
        //winHeight = win.height();
        initFadeItems();
    });
});