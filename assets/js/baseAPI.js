//调用这个对象 ajaxPrefilter
// 拿到ajax配置的对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
  options.url = 'http://ajax.frontend.itheima.net' + options.url

})