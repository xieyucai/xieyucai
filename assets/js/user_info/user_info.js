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
})

//定义一个函数获取用户信息
function getuserinfo() {
  var form = layui.form
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status != 0) {
        return '获取用户信息失败'
      } else {
        form.val('formUserInfo', res.data)
      }
    }
  })
}
