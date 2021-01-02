$(function () {
  var layer = layui.layer
  var indexAdd = null
  getarticle()
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  indexAdd = $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.msg('新增分类失败')
        } else {
          getarticle()
          layer.msg('新增分类成功')
          layer.close(indexAdd)
        }
      }
    })
  })
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
