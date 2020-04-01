(function() {
  let itemTmpl = '<a class="$key btn-item" href="../$key/$key.html">'+
                    '<div class="tab-icon"></div>'+
                    '<div class="btn-name">$test</div>'+
                  '</a>'

  function init() {
    let items = [{
      key: 'index',
      text: '首页'
    },{
      key: 'order',
      text: '订单'
    },{
      key: 'my',
      text: '我的'
    }]

    let str = ''
    items.forEach(function(item) {
      str += itemTmpl.replace(/\$key/g, item.key)
                      .replace('$test', item.text)
    })

    $('.bottom-bar').append($(str))
    // 设置激活状态
    let arr = window.location.pathname.split('/')
    let page = arr[1]
    $('a.'+page).addClass('active')
    // 通过点击设置激活状态
    // $(".bottom-bar a.index").addClass('active')
     
    // $('.bottom-bar a').click(function(e) {
    //   e.preventDefault()
    //   $(this).addClass('active').siblings().removeClass('active')
    // })
  }

  init()
})()