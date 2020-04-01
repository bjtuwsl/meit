(function() {
  //右侧类目item模板字符串
  let itemTmpl = '<div class="menu-item">'+
                    '<img class="img" src=$picture />'+
                    '<div class="menu-item-right">'+
                      '<p class="item-title">$name</p>'+
                      '<p class="item-desc">$description</p>'+
                      '<p class="item-zan">$praise_content</p>'+
                      '<p class="item-price">￥$min_price<span class="unit">/$unit</span></p>'+
                    '</div>'+
                    '<div class="select-content">'+
                      '<div class="minus"></div>'+
                      '<div class="count">$chooseCount</div>'+
                      '<div class="plus"></div>'+
                    '</div>'+
                  '</div>'


  /**
   * 渲染列表
   * param array
   */
  function initRightList(list) {
    $('.right-list-inner').html('')
    list.forEach((item, index) => {
      if(!item.chooseCount) {
        item.chooseCount = 0
      }
      let str = itemTmpl.replace('$picture', item.picture)
                        .replace('$name', item.name)
                        .replace('$description', item.description)
                        .replace('$praise_content', item.praise_content)
                        .replace('$min_price', item.min_price)
                        .replace('$unit', item.unit)
                        .replace('$chooseCount', item.chooseCount)

      let $target = $(str)
      $target.data('itemData', item)
      $('.right-list-inner').append($target)
    })
  }

  /**
   * 渲染右侧title
   * param string
   */
  function initRightTitle(str) {
    $('.right-title').text(str)
  }

  /**
   * 添加点击事件
   */
  function addClick() {
    //增加按钮
    $('.menu-item').on('click', '.plus', function(e) {
      let $count = $(this).parent().find('.count')
      $count.text(parseInt($count.text() || '0') + 1)
      //同步改变对象获取的对象中的数据
      let item = $(this).parents('.menu-item').first()
      let itemData = item.data('itemData')
      itemData.chooseCount = itemData.chooseCount + 1
      //重新渲染底部菜单
      window.shopBar.renderItems()
    })
    //减少按钮
    $('.menu-item').on('click', '.minus', function(e) {
      let $count = $(this).parent().find('.count')
      if(parseInt($count.text()) === 0) {
        return
      }
      $count.text(parseInt($count.text()) - 1)
      let item = $(this).parents('.menu-item').first()
      let itemData = item.data('itemData')
      itemData.chooseCount = itemData.chooseCount - 1
      window.shopBar.renderItems()
    })
  }

  function init(data) {
    initRightList(data.spus || [])
    initRightTitle(data.name)
    addClick()
  }
  window.Right = {
    refresh: init
  }
})()