$(function() {

    //读取PHP数据库数据
    $.post('../php/goodslist.php', {
        page: 1
    },
    function(response) {
        $.each(JSON.parse(response),
        function(idx, item) {
            //普通价商品
            if (item.meiciprice) {
                $('<li data-guld="' + item.indexid + '"><a href="#">' + '<img src="' + item.imgurl + '"></a><a href="#"><p>' + item.title + '</p></a><del>' + item.normalprice + '</del><span class="meiciprice">' + item.meiciprice + '</span></p></li>').appendTo($('.goodslist ul'));
            }
            //活动价商品
            if (item.discountprice) {
                $('<li data-guld="' + item.indexid + '"><a href="#">' + '<img src="' + item.imgurl + '"></a><a href="#"><p>' + item.title + '</p></a><del>' + item.normalprice + '</del></p><span class="discountprice">' + item.discountprice + '</span></li>').appendTo($('.goodslist ul'));
            }

        })
    })

    //分页和高亮效果
    $('.pageRight span').click(function() {
        $('.goodslist ul').empty();
        $self = $(this);
        $.post('../php/goodslist.php', {
            page: $self.html()
        },
        function(res) {
            $.each(JSON.parse(res),
            function(idx, item) {
                if (item.meiciprice) {
                    $('<li><a href="#">' + '<img src="' + item.imgurl + '"></a><a href="#"><p>' + item.title + '</p></a><del>' + item.normalprice + '</del><span class="meiciprice">' + item.meiciprice + '</span></p></li>').appendTo($('.goodslist ul'));
                }
                //活动价商品
                if (item.discountprice) {
                    $('<li><a href="#">' + '<img src="' + item.imgurl + '"></a><a href="#"><p>' + item.title + '</p></a><del>' + item.normalprice + '</del></p><span class="discountprice">' + item.discountprice + '</span></li>').appendTo($('.goodslist ul'));
                }

            })
        })
    })

});

//页面效果
$(function() {
    $('.title').parent().find('ul').hide();
    //点击收起菜单
    $('.title').on('click',
    function() {
        if ($(this).parent().find('ul').is(":visible")) {
            $(this).parent().find('ul').hide();
        } else {
            $(this).parent().find('ul').show();
        }
    })

});