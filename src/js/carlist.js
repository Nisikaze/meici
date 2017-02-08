//读取cookies
window.onload = function() {
    var carList;
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var arr = cookies[i].split('=');
        if (arr[0] = 'carlist') {
            carList = JSON.parse(arr[1]);
        }
    };

    $(function() {
        if (carList.length > 0) {
            $('.nothing').hide();
            $('.getProduct').show();
            //设置总价
            var subPrice = 0;
            //cookies写入页
            $.each(carList,
            function(idx, item) {
                for (i = 0; i < item.qty; i++) {
                    $('<li data-guid="' + item.id + '"' + '><span><img src="' + item.pic + '" alt=""></span><span>' + item.name + '</span><span>1' + '</span><span class="' + 'price"' + '>¥' + item.price + '</span><div><a href="' + '#"' + 'class="' + 'collect"' + '>移到收藏</a><br><a href="' + '#"' + 'class="' + 'delete"' + '>删除商品</a></div></li>').appendTo($('.infoBody ul'));
                    //计算总价
                }
                subPrice += parseInt(item.qty * item.price);
            });

            $('.infoBottom span').html('¥' + subPrice.toFixed(2));

            //点击移到收藏夹
            //cookies
            // var collectlist = [];
            // $('.collect').click(function() {
            //     // //添加到购物车
            //     var collectObj = {};
            //     collectObj.name = $(this).parent().parent().find('span').eq(1).collectName;
            //     collectObj.price = $(this).parent().parent().find('span').eq(3).collectPrice;
            //     collectObj.src = $(this).parent().parent().find('img').collectPic;
            //     //添加到carlist;
            //     collectlist.push(collectObj);
            //     console.log(collectlist);
            //     //保存七天
            //     var now = new Date();
            //     now.setDate(now.getDate() + 7);
            //     //存入到cookies
            //     // 把对象/数组转换诚json字符串：JSON.stringify();
            //     document.cookie = 'collectlist=' + JSON.stringify(collectObj) + ';expires=' + now;
            //     $(this).parent().parent().remove();
            // });

        } else {
            $('.nothing').show();
            $('.getProduct').hide();
        }

        //点击删除,重新计算总价
        $('.delete').click(function(e) {
            var $id = $(this).parent().parent().attr('data-guid');
            for (var i = 0; i < carList.length; i++) {
                if (carList[i].id = $id) {
                    carList[i].qty = carList[i].qty - 1;
                    if (carList[i].qty <= 0) {
                        carList.splice(i, 1);
                        break;
                    }
                }
                subPrice -= parseInt($('.price').html().substring(1));
                $('.infoBottom span').html('¥' + subPrice.toFixed(2));
            }

            //更新cookies并删除对应项
            document.cookie = 'carlist=' + JSON.stringify(carList);
            $(this).parent().parent().remove();
            if ($('.infoBody li').length == 0) {
                $('.nothing').show();
                $('.getProduct').hide();
            }
        });

    })

}