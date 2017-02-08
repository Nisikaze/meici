$(function() {

    //读取json数据生成列表
    $.get('babygoods.json', function(data) {

        $.each(data, function(idx, item) {

            $('<li data-guld="' + item.id + '"><div class="' + 'margin"' + '><img src="' + item.imgurl + '"><p><a href="' + '#"' + '>' + item.title + '</a></p><span class="' + 'discountprice"' + '>' + item.discountprice + '</span>&nbsp;<span class="' + 'normalprice"' + '><del>' + item.normalprice + '</del></span><div class="' + 'add"' + '><input type="' + 'text"' + ' value="' + '1"' + '><div class="' + 'number"' + '><span class="' + 'plus"' + '>+</span><br><span class="' + 'minus"' + '>-</span></div><input type="' + 'button"' + ' value="' + '加入购物车"' + ' class="' + 'buy"' + '><input type="' + 'button"' + ' value="' + '收藏" ' + 'class="' + 'collect"' + '></div></div></li>').appendTo($('ul'));

        });
        //分页,12个一页

        // var pageleng = 12;
        // var page = Math.ceil(data.idx / pageleng);
        // console.log(page);
        // for (var i = 0; i < page; i++) {
        //     $('span').html(i + 1).appendTo($('.page'));
        // }

        //点击添加减少按钮改变商品数量
        //加
        $('.plus').click(function() {
            var number = $(this).closest('li').find('input').eq(0);
            number.val(parseInt(number.val()) + 1);
            number.html(number.val());
        });
        //减
        $('.minus').click(function() {
            var _number = $(this).closest('li').find('input').eq(0);
            _number.val(parseInt(_number.val()) - 1);
            if (_number.val() <= 0) { //不能有负数
                _number.val(0);
            }
            _number.html(_number.val());
        });

        //点击记录商品数量并加入购物车
        //cookies
        var $carlist = [];
        //先获取当前cookies并保存购物车信息;
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var arr = cookies[i].split('=');
            if (arr[0] === 'carlist') {
                $carlist = JSON.parse(arr[1]);
            }
        }

        $('.buy').click(function(e) {
            var goodsname = $(this).closest('li').find('a').eq(0).html();
            var goodsqty = $(this).closest('li').find('input').eq(0).val();
            var goodsid = $(this).closest('li').attr('data-guld')
            // console.log(goodsqty, goodsname, goodsid);
            var goodsObj = {};
            goodsObj.id = goodsid;
            goodsObj.name = goodsname;
            goodsObj.qty = goodsqty;
            //cookies为空,直接添加;
            if ($carlist.length === 0) {
                //添加到carlist;
                $carlist.push(goodsObj);
            } else {
                for (var i = 0; i < $carlist.length; i++)
                //判断是否有相同ID的商品
                    if ($carlist[i].id === goodsid) {
                        $carlist[i].qty = parseInt($carlist[i].qty) + parseInt(goodsqty);
                        // console.log($carlist[i].qty);
                        break;
                    } // 如果原cookie中没有当前商品
                if (i === $carlist.length) {
                    // 添加到carList
                    $carlist.push(goodsObj);
                    // console.log($carlist[i].qty);
                }
            }
            //保存七天
            var now = new Date();
            now.setDate(now.getDate() + 7);
            //存入到cookies
            // 把对象/数组转换诚json字符串：JSON.stringify();
            document.cookie = 'carlist=' + JSON.stringify($carlist) + ';expires=' + now;
            var total = 0;
            //购物车显示数量
            for (var i = 0; i < $carlist.length; i++) {
                // console.log($carlist[i].qty);
                total += $carlist[i].qty + goodsqty;
            }
            $('.car span').html(total);
        })


    });



});
