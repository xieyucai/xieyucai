$(function () {
  var layer = layui.layer
  getarticle()
})

function getarticle() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      if (res.status != 0) {
        return layer.msg('获取文章列表失败')
      } else {
        var htmlstr = template('tpl-table', res)
        $('tbody').html(htmlstr)
      }
    }
  })
}
