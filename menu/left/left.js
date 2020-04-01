(function() {
  //左侧类目item模板字符串
  let itemTmpl = '<div class="left-item">'+
                    '<div class="item-text">$getItemContent</div>'+
                  '</div>'

  /**
   * 获取json数据
   * param
   */
  function getList() {
    $.get('../json/food.json', function(data) {
      window.food_spu_tags = data.data.food_spu_tags || []
      // console.log(data)
      initContentList(window.food_spu_tags)
      window.shopBar.changeShoppingPrice(data.data.poi_info.shipping_fee || 0)
    })
  }

  /**
   * 渲染item内容
   * param data
   */
  function getItemContent(data) {
    if(data.icon) {
      return '<img class="item-icon" src=' + data.icon +'>'+ data.name
    } else {
      return data.name
    }
  }

  /**
   * 渲染列表
   * param array
   */
  function initContentList(list) {
    list.forEach((item, index) => {
      let str = itemTmpl.replace('$getItemContent', getItemContent(item))

      // 将item数据挂载到left-item上面
      let $target = $(str)
      $target.data('itemData', item)
      $('.left-bar-inner').append($target)
    })
    $('.left-item').first().click()
  }

  /**
   * 添加tab点击事件，传递参数
   */
  function addClick() {
    $('.menu-inner').on('click', '.left-item', function(e) {
      let $target = $(e.currentTarget)

      $target.addClass('active').siblings().removeClass('active')
      // 将数据传递给右侧详情列表进行渲染
      window.Right.refresh($target.data('itemData'))
    })
  }

  function init() {
    getList()
    addClick()
  }
  init()
})()