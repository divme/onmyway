function blurFun() {
    var time = 100;
    var sDom = "textarea,[type='text'],[type='number']"
    //判断是否为苹果
    var isIPHONE = navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
    if (isIPHONE) {
        //  console.log("iphone")
        var obj = document.querySelectorAll(sDom);
        for (var i = 0; i < obj.length; i++) {
            objBlur(obj[i], time);
        }
    }
}

// 输入框元素失去焦点隐藏iphone的软键盘（根本原因为ios点击空白document不能获取焦点）
function objBlur(sdom, time) {
    if (sdom) {
        sdom.addEventListener("focus", function () {
            document.addEventListener("touchend", docTouchend, false);
        }, false);

    } else {
        throw new Error("objBlur()没有找到元素");
    }

    var docTouchend = function (event) {
        if (event.target != sdom) {
            setTimeout(function () {
                sdom.blur();

                currentPosition=document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
                currentPosition= currentPosition?currentPosition: 0;
                window.scrollTo(0,currentPosition);

                currentPosition -=1;
                window.scrollTo(0,currentPosition);
                currentPosition +=1;
                window.scrollTo(0,currentPosition);

                document.removeEventListener('touchend', docTouchend, false);
            }, time);
        }
    };

}