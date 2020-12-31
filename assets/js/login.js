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
  //表单校验
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (vaule) {
      var pwd = $('.reg-box[name=password]').val()
      if (pwd !== vaule) {
        return '两次密码不一致'
      }
    }
  })

  var layer = layui.layer
  //注册功能，监听提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status != 0) {
        return layer.msg('注册失败')
      } else {
        layer.msg('注册成功，请登录！')
        $('#link_login').click()
      }
    })
  })

  //登录功能，监听提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/login', $(this).serialize(), function (res) {
      if (res.status != 0) {
        return layer.msg('登录失败')
      } else {
        layer.msg('登录成功！')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})
