$(function () {
    getInfo()
    var layer=layui.layer
    // 注册与退出的点击是事件
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('是否要退出', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清楚本地储存的token
            localStorage.removeItem('token')
            // 2.重新跳转到登陆页面
            location.href='/login.html'
            layer.close(index);
          });
    })
})
// 获取用户信息
function getInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
               return layui.layer.msg('获取信息失败')
            }
            // 渲染用户的信息
            renderAvatar(res.data)
        },
        // 调用complete
        complete: function (res) {
        // console.log('回调函数');
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.强制两空
                localStorage.removeItem('token')
                // 2.强制调到登陆页面
                location.href='/login.html'
            }
    }
    })
}
// 渲染头像
function renderAvatar(user) {
    // 1.获取用户名字
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎 ' + name)
    // 3.渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片的头像
        $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本的头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
   
}