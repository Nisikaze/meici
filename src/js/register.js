//注册
$(function() {

    var $username = $('#username');
    var $password = $('#password');
    var $password2 = $('#repassword');
    var $span = $('.warming').find('span');

    var check = /^(13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9})|[\w\.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,2}$/

    $('#signin').on('click',
    function() {
        var $pswcolor = $password.css('borderColor', '#8E0C3A');
        var $pswcolor2 = $password2.css('borderColor', '#8E0C3A');
        //判断输入的是否为手机或者合法邮箱并且首字符不为空格,标记提示语;
        if (!$username.val() || !check.test($username.val())) {
            $span.hide().eq(0).show();
            $username.css('borderColor', '#8E0C3A');
        }

        //判断密码是否为空
        else if (!$password.val()) {
            $span.hide().eq(1).show();
            $pswcolor;
            $pswcolor2;
        }
        //判断密码长度
        else if ($password.val().length < 6 || $password.val().length > 16) {
            $span.hide().eq(2).show();
            $pswcolor;
            $pswcolor2;
        }

        //确认密码
        else if (!$password2.val()) {
            $span.hide().eq(3).show();
            $pswcolor;
            $pswcolor2;
        }

        //密码错误
        else if ($password.val() != $password2.val()) {
            $span.hide().eq(4).show();
            $pswcolor;
            $pswcolor2;
        }
        //手机密码正确后传入PHP到数据库
        else {
            $.post("../php/register.php", {
                username: $username.val(),
                password: $password.val()
            },
            function(res) {
                var $obj = eval('(' + res + ')');
                console.log($obj);
                if ($obj.state) {
                    window.location.href = '../html/index.html';
                } else {
                    alert($obj.message);
                    $username.val('').focus();
                    $password.val('');
                    $password2.val('');
                    $('input').css('borderColor', '#999');
                }
            })

        }

    });

});