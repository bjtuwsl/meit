(function() {
  let itemTmpl = '<a class="$key tab-item" href="../$key/$key.html">'+
                    '<div class="tab-icon"></div>'+
                    '<div class="btn-name">$test</div>'+
                  '</a>'

  function init() {
    let items = [{
      key: 'menu',
      text: '点菜'
    },{
      key: 'comment',
      text: '评价'
    },{
      key: 'restaurant',
      text: '商家'
    }]

    let str = ''
    items.forEach(function(item) {
      str += itemTmpl.replace(/\$key/g, item.key)
                      .replace('$test', item.text)
    })

    $('.tab-bar').append($(str))
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