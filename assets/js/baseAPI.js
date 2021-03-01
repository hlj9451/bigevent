//调用这个对象 ajaxPrefilter
// 拿到ajax配置的对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
  options.url = 'http://ajax.frontend.itheima.net' + options.url

// 为有权限的接口设置请求头
   // if判断
   if (options.url.indexOf('/my/')!== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 统一的挂在complete
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1.强制两空
      localStorage.removeItem('token')
      // 2.强制调到登陆页面
      location.href='/login.html'
  }
  }
})

