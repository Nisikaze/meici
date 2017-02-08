//登录
$(function() {
    var $username = $('#username');
    var $password = $('#password');
    var $span = $('.warming').find('span');
    var check = /^(13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9})|[\w\.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,2}$/$('#loginbtn').on('click',
    function() {
        var $pswcolor = $password.css('borderColor', '#8E0C3A');
        if (!$username.val() || !check.test($username.val())) {
            $span.hide().eq(0).show();
            $username.css('borderColor', '#8E0C3A');
            $pswcolor;
        }

        //判断密码是否为空
        else if (!$password.val()) {
            $span.hide().eq(1).show();
            $pswcolor;

        }

        //判断密码长度
        else if ($password.val().length < 6 || $password.val().length > 16) {
            $span.hide().eq(2).show();
            $pswcolor;

        }

        //输入正确后传入PHP
        else {
            $.post("../php/login.php", {
                username: $username.val(),
                password: $password.val()
            },
            function(res) {
                var $obj = eval('(' + res + ')');
                if ($obj.state) {
                    //七天免登陆
                    if ($('#sevenday').checked) {
                        //添加到cookies
                        var customer = [];
                        var $customerObj = {};
                        $customerObj.username = $username.val();
                        $customerObj.password = $password.val();
                        //添加到carlist;
                        customer.push($customerObj);
                        //保存七天
                        var now = new Date();
                        now.setDate(now.getDate() + 7);
                        //存入到cookies
                        // 把对象/数组转换诚json字符串：JSON.stringify();
                        document.cookie = 'customer=' + JSON.stringify(customer) + ';expires=' + now;
                    }
                    window.location.href = '../html/index.html';
                } else {
                    alert($obj.message);
                }
            })

        }

    });

});