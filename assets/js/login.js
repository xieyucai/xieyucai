$(function () {
  //点击去注册的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (vaule) {
      var pwd = $('.reg-box[name=password]').val()
      if (pwd != vaule) {
        return '两次密码不一致'
      }
    }
  })
})
