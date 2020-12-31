$(function () {
  getList()

  //点击退出注册点击事件
  $('#logout').on('click', function () {
    layui.layer.confirm('确认退出吗?', function (index) {
      //删除本地存储
      //跳转到登录页面
      localStorage.removeItem('token')
      location.href = '/login.html'

      layer.close(index)
    })
  })
})
//定义一个函数获取数据
function getList() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: function (res) {
      console.log(res)
      if (res.status != 0) {
        return '获取失败'
      }
      render(res.data)
    },
    /* complete: function (res) {
      if (res.responseJSON != 0 && res.message != '获取用户信息成功') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    } */
  })
}

//定义一个函数渲染数据
function render(data) {
  var name = data.username || data.nickname
  $('#welcome').html(`欢迎${name}`)
  //判断user_pic是否为空
  if (data.user_pic != null) {
    //渲染头像到页面
    $('#img').attr('src', data.user_pic).show().$('.text-avatar').hide()
  } else {
    $('#img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
