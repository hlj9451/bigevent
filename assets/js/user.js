$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间的字符'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
      
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log("++++++++++++");
                if (res.status !== 0) {
                    return layer.msg('获取用户失败！')
                }
                // console.log("---------------");
                // console.log(res);
                // 调用form.val()为表单赋值
                // key ---> username
                // 反推 key ---> key
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单的信息
    $('#btnReset').on('click', function (e) {
        e.perventDefault()
        initUserInfo()

        
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
          method: 'POST',
          url: '/my/userinfo',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getInfo()
          }
        })
      })







    // $('.layui-form').on('submit', function (e) {
    //     // 阻止表单的默认行为
    //     // e.perventDefault()
    //     e.perventDefault()
    //     // 发送ajax请求
    //     $.ajax({
    //         method: 'POST',
    //         url: ' /my/userinfo',
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('更新用户信息失败！')
    //             }
    //         layer.msg('更新用户信息成功！');
    //             // 调用父页面中方法 ，冲核心渲染用户的头像和用户名的基本信息
    //             window.parent.getInfo()

    //         }
    //     })
    // })
})