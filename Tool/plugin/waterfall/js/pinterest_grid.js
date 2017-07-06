;(function ($) {
    var defaults = {
            columns: 3,
            distancex: 10,
            distancey: 10,
            margin_bottom: 50,
            breakpoint: 700
        },
        columns,
        $child,
        $cwidth;
    // 定义构造函数
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this.init();
    }

    // init 初始化函数：确定位置，window 窗口改变时重新定位
    Plugin.prototype.init = function () {
        var self = this,
            Timer;
        self.mode(self);
        $(window).resize(function() {
            clearTimeout(Timer);
            Timer = setTimeout( function () {
                self.mode(self);
            }, 11);
        });
        setTimeout(function() {
            $(window).resize();
        }, 500)
    };

    Plugin.prototype.mode = function (obj) {
        if($(window).width() < obj.options.breakpoint) {
            obj.calculate(true);
        } else {
            obj.calculate(false);
        }
    };

    Plugin.prototype.calculate = function (mode) {
        var self = this,
            $container = $(this.element);
        columns = self.options.columns;
        $child = $(this.element).children();

        if(mode === true) {
            $cwidth = $container.width() - self.options.distancex;
        } else {
            $cwidth = ($container.width() - self.options.distancex * (columns-1))/ columns;
        }

        $child.each(function() {
            $(this).css('width', $cwidth);
        });

        // 确定每个子元素的位置
        $child.each(function(index) {
            var current_column,
                left = 0,
                top = 0,
                $this = $(this),
                prevAll = $this.prevAll();

            if(mode === true){
                current_column = 0;
                left = 0;
            } else {
                current_column = (index % columns);
                left = (index % columns) * ($cwidth + self.options.distancex);
            }
            for(var t = 0; t < columns; t++) {
                $this.removeClass('c'+t);
            }
            $this.addClass('c' + current_column);
            prevAll.each(function() {
                if($(this).hasClass('c' + current_column)) {
                    top += $(this).outerHeight() + self.options.distancey;
                }
            });
            $this.css({
                'left': left,
                'top' : top
            });
        });

        this.tallest($container);
        // $(window).resize();
    };

    // 计算并赋值父元素高度
    Plugin.prototype.tallest = function (container) {
        var column_heights = [],
            largest = 0;

        for(var z = 0; z < columns; z++) {
            var temp_height = 0;
            container.find('.c'+z).each(function() {
                temp_height += $(this).outerHeight();
            });
            column_heights[z] = temp_height;
        }

        largest = Math.max.apply(Math, column_heights);
        container.css('height', largest + (this.options.distancey + this.options.margin_bottom));
    };

    $.Plugin = function (element, options) {
        new Plugin(element,options)
    };
    // $.fn[pluginName] = function (options) {
    //     return this.each(function () {
    //         if (!$.data(this, 'plugin_' + pluginName)) {
    //             $.data(this, 'plugin_' + pluginName,
    //             new Plugin(this, options));
    //         }
    //     });
    // }

})(jQuery);