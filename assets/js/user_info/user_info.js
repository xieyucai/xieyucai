$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  getuserinfo()

  //点击重置按钮渲染数据
  $('#btnreset').on('click', function (e) {
    e.preventDefault()
    //重新渲染
    getuserinfo()
  })

  //点击提交效果修改用户信息，对表单做监听事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.msg('修改用户信息失败')
        } else {
          layer.msg('修改用户信息成功')
          window.parent.getuserinfo()
        }
      }
    })
  })
})

//定义一个函数获取用户信息
function getuserinfo() {
  var form = layui.form
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status != 0) {
        return layer.msg('获取用户信息失败')
      } else {
        //layul里面的form.val()方法来渲染到表单里面，根据里面对应的name来对应渲染
        form.val('formUserInfo', res.data)
      }
    }
  })
}
