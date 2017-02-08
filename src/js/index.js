// 轮播图效果
; (function($) {
    $.fn.showPic = function(options) {
        var defaults = {
            imglist: [],
            //必要参数
            autoPlay: true,
            duration: 3000,
            index: 0,
            type: 'horizontal'
        }

        // 扩展默认值
        var opt = $.extend({},
        defaults, options);

        return this.each(function() {
            var $self = $(this);

            // 初始化
            init();

            function init() {
                // 添加专有样式
                // 生成大图
                var imghtml = opt.imglist.map(function(url, idx) {
                    return '<li><a href="#"' + '><img src="' + url + '"/></a></li>';
                }).join('\n');
                var $bigPic = $('<div/>').addClass('bigPic');
                var $scrollpic = $('<ul/>').html(imghtml).addClass('scrollpic');
                $bigPic.append($scrollpic).appendTo($self);
                $('.scrollpic li').eq(0).clone().appendTo($('.scrollpic'));
                var len = $('.scrollpic li').length;
                // 轮播（水平）
                if (opt.autoPlay) {
                    // 鼠标移入移出
                    $self.on('mouseenter',
                    function() {
                        clearInterval($self.timer)
                    }).on('mouseleave',
                    function() {
                        $self.timer = setInterval(function() {
                            opt.index++;
                            showPic();
                        },
                        opt.duration);
                    }).trigger('mouseleave');
                }

                // 刷新页面，高亮当前小图
                showPic();
                // 设置样式
                $scrollpic.css('width', $scrollpic.children().outerWidth() * len);

                //点击事件
                $('.prebtn').on('click',
                function() {
                    opt.index--;
                    if (opt.index < 0) {
                        opt.index = len - 2;
                    }
                    showPic();
                });

                $('.nextbtn').on('click',
                function() {
                    opt.index++;
                    showPic();
                });
                // 无缝轮播显示图片
                function showPic() {
                    if (opt.index >= len) {
                        $scrollpic.css('left', 0);
                        opt.index = 0;
                    } else if (opt.index < 0) {
                        opt.index = len - 2;
                    }
                    // 大图动画
                    $scrollpic.animate({
                        left: -$scrollpic.children().outerWidth() * opt.index,
                    });
                }
            }
        });

    }
})(jQuery);

$(function() {
    $('.top_welcome').hide();
    //显示登录状态
    $.post('../php/confirm.php',
    function(res) {
        var $obj = eval('(' + res + ')');
        if ($obj.state) {
            $('.top_left').hide();
            $('.top_welcome').show();
            $('.top_welcome span').html($obj.clientName)
        } else {
            $('.top_left').show();
            $('.top_welcome').hide();
        }
    })
    //退出登录
    $('#logout').click(function() {
        $.post('../php/logout.php',
        function() {
            location.reload;
            $('.top_left').show();
            $('.top_welcome').hide();
        })
    })
    //吸顶效果
    var $topsearch = $('.topsearch');
    $(window).on('scroll',
    function() {
        if ($('body').scrollTop() >= $('.top').outerHeight() + $('.logo').outerHeight() + $('.productlist').outerHeight()) {
            $topsearch.fadeIn('slow');
        } else {

            $topsearch.fadeOut('slow');
        }
    });
    //轮播列表
    var $hot = $('.hot');
    var width = $hot.children().outerWidth();
    var len = $hot.children().length;
    var index = 1;
    $hot.css('width', len * width).on('mouseenter',
    function() {
        clearInterval(this.timer);
    }).on('mouseleave',
    function() {
        this.timer = setInterval(function() {
            index++;
            showlist();
        },
        3000);

    }).trigger('mouseleave');

    function showlist() {
        if (index >= len) {
            index = 1;
        } else if (index < 0) {
            index = len - 1;
        }
        $hot.animate({
            left: -width * index,
        });
    };

});