//放大镜效果
$(function() {

    var $smallPic = $('.smallPic ul li');
    var $largePic = $('.largePic img');
    $largePic.first().css('zIndex', 9);
    var $large = $('.largePic');
    var $lens = $('.lens');
    var $zoom = $('.zoom');

    //放大镜内大图样式
    $largePic.each(function(idx, item) {
        var zoomPic = $('<img src="' + $(item).attr('src') + '"/>').appendTo($zoom);
    });
    var $zoomPic = $('.zoom img');
    var zWidth = $zoomPic.outerWidth();
    var zHeight = $zoomPic.outerHeight();
    //鼠标移动到对应小图展示对应大图
    $smallPic.on('mouseenter',
        function(e) {
            var idx = $(this).index();
            var $tagPic = $($largePic.get(idx));
            $tagPic.show().siblings('img').hide();
            $($zoomPic.get(idx)).show().siblings('img').hide();
        });
    var ratio = $largePic.outerWidth() / $lens.outerWidth();
    //鼠标移入大图时显示放大镜
    $large.hover(function() {
            $lens.show();
            $zoom.show();

            //放大镜效果
        },
        function() {
            $lens.hide();
            $zoom.hide();
        }).mousemove(function(e) {
        var top = $large.offset().top;
        var left = $large.offset().left;
        var _left = e.clientX - $lens.outerWidth() / 2 - left;
        var _top = e.clientY - $lens.outerHeight() / 2 - top;
        // 防止移出边界
        if (_left <= 0) {
            _left = 0;
        } else if (_left >= $large.outerWidth() - $lens.outerWidth()) {
            _left = $large.outerWidth() - $lens.outerWidth();
        }
        if (_top <= 0) {
            _top = 0;
        } else if (_top > $large.outerHeight() - $lens.outerHeight()) {
            _top = $large.outerHeight() - $lens.outerHeight();

        }
        $lens.css({
            top: _top,
            left: _left
        });
        $zoomPic.css({
            top: -_top * ratio,
            left: -_left * ratio,
            width: zWidth * ratio,
            height: zHeight * ratio
        })
    });

});

$(function() {
    //文字介绍吸顶效果及切换
    var $li = $('.infoFix ul').eq(0).children();
    var $ul = $('.infoFix ul').eq(1);
    $ul.hide();
    var top = $('.infoFix').offset().top;
    $li.on('click',
        function(e) {
            //吸顶效果
            $('body').animate({
                    scrollTop: top
                },
                1000);
            $ul.show().css('position', 'fixed');
            var idx = $(this).index();
            var showDiv = $('.infoPic div').get(idx);
            var $showDiv = $(showDiv);
            $showDiv.show().siblings('div').hide();
            $(this).css({
                backgroundColor: '#6C6C6C',
                color: '#fff'
            }).siblings('li').css({
                backgroundColor: '#e6e6e6',
                color: '#7c7c7c'
            })
        });

    $(window).on('scroll',
        function() {
            if ($(window).scrollTop() >= top) {
                $li.parent().parent().css({
                    position: 'fixed',
                    top: 0,
                    zIndex: 1000
                });
                $ul.show();

            } else {
                $li.parent().parent().css({
                    position: 'static'

                });
                $ul.hide();

            }

        })

    //cookies
    var $carlist = [];
    // 用于保存购物车商品信息
    // 先获取当前cookie
    var cookies = document.cookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
        var arr = cookies[i].split('=');
        if (arr[0] === 'carlist') {
            $carlist = JSON.parse(arr[1]);
        }
    }

    var $collectBtn = $('.collect');
    $collectBtn.click(function(e) {
        var $productPic = $('.smallPic img').first();
        var $productName = $('.infoRight h3').html() + $('.infoRight em').html();
        var $productPrice = $('#price').html();
        var $id = $('.infoRight h3').attr('data-guld');
        //添加到购物车
        var $productObj = {};
        $productObj.name = $productName;
        $productObj.price = $productPrice;
        $productObj.pic = $productPic.attr('src');
        $productObj.id = $id;
        $productObj.qty = 1;

        //cookies为空,直接添加;
        if ($carlist.length === 0) {
            //添加到carlist;
            $carlist.push($productObj);
        } else {
            for (var i = 0; i < $carlist.length; i++)
            //判断是否有相同ID的商品
                if ($carlist[i].id === $id) {
                    $carlist[i].qty++;
                    break;
                } // 如果原cookie中没有当前商品
            if (i === $carlist.length) {
                // 添加到carList
                $carlist.push($productObj);
            }
        }
        //保存七天
        var now = new Date();
        now.setDate(now.getDate() + 7);
        //存入到cookies
        // 把对象/数组转换诚json字符串：JSON.stringify();
        document.cookie = 'carlist=' + JSON.stringify($carlist) + ';expires=' + now;

    })

});
