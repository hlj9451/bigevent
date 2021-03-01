$(function () {
    //点击登录
    $('#denglu').on('click', function () {
        $('.login').hide();
        $('.register').show();
    })
    //点击注册
    $('#zhuce').on('click', function () {
        $('.login').show();
        $('.register').hide();
    })
    //用layui中获取form对象
    var form = layui.form
    var layer=layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.register [name=password]').val()
            if (pwd !== value) {
                return '两次出现的代码不一致'
            }
        }
    })
    //监听注册表单的提交按钮
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser',data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功');
            //点击行为
            $('#link_login').click()
        })
    })
    //监听登录表单的提交按钮
    $('#form_login').on('submit',function (e) {
        // console.log('aa');
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                // console.log(res);
                location.href='./index.html'
            }
            
        })
    })
    

})


