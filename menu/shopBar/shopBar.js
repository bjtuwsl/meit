(function() {
  //购物车模板字符串
  let itemTopTmpl = '<div class="choose-content hide">'+
                      '<div class="content-top">'+
                        '<div class="clear-car">清空购物车</div>'+
                      '</div>'+
                    '</div>'
  let itemBottomTmpl = '<div class="bottom-content">'+
                          '<div class="shop-icon">'+
                            '<div class="dot-num hide">0</div>'+
                          '</div>'+
                          '<div class="price-content">'+
                            '<p class="total-price">￥<span class="total-price-span">0</span></p>'+
                            '<p class="other-price">另需配送&nbsp;￥<span class="shopping-fee">0</span></p>'+
                          '</div>'+
                          '<div class="submit-btn">去结算</div>'+
                        '</div>'

  let $strTop = $(itemTopTmpl)
  let $strBottom = $(itemBottomTmpl)

  function changeShoppingPrice(str) {
    $strBottom.find('.shopping-fee').text(str)
  }
  function changeTotalPrice(str) {
    $strBottom.find('.total-price-span').text(str)
  }


  /**
   * 改变小红点
   */
  function changeDot(count) {
    if(count) {
      $('.dot-num').text(count).show()
    } else {
      $('.dot-num').text(count).hide()
    }
  }
  /**
   * 双向数据绑定，底部改变上面
   */
  function addClick() {
    $('.shop-bar').on('click', '.shop-icon', function() {
      $('.mask').toggle()
      $strTop.toggle()
    })
    $strTop.on('click', '.plus', function(e) {
      let $count = $(this).parent().find('.count')
      $count.text(parseInt($count.text() || '0') + 1)
      
      let $item = $(e.currentTarget).parents('.choose-item').first()
      let itemData = $item.data('itemData')
      itemData.chooseCount = itemData.chooseCount + 1
      renderItems()
      //找到当前的右侧详情的数据，进行联动
      $('.left-item.active').click()
    })
    $strTop.on('click', '.minus', function(e) {
      let $count = $(this).parent().find('.count')
      if(parseInt($count.text() === 0)) return
      $count.text(parseInt($count.text() || '0') - 1)
      
      let $item = $(e.currentTarget).parents('.choose-item').first()
      let itemData = $item.data('itemData')
      itemData.chooseCount = itemData.chooseCount - 1
      renderItems()
      //找到当前的右侧详情的数据，进行联动
      $('.left-item.active').click()
    })

    // 清空购物车
    $strTop.on('click', '.clear-car', function() {
      // console.log('清空')
      let list = window.food_spu_tags || []
      list.forEach(function(item) {
        item.spus.forEach(function(_item) {
          if(_item.chooseCount > 0) {
            _item.chooseCount = 0
          }
        })
      })
      renderItems()
      $('.left-item.active').click()
    })
  }

  function renderItems() {
    $strTop.find('.choose-item').remove()
    let list = window.food_spu_tags || []
    let tmpl = '<div class="choose-item">'+
                  '<div class="item-name">$name</div>'+
                  '<div class="price">￥<span class="total">$price</span></div>'+
                  '<div class="select-content">'+
                    '<div class="minus"></div>'+
                    '<div class="count">$chooseCount</div>'+
                    '<div class="plus"></div>'+
                  '</div>'+
                '</div>'
    let totalPrice = 0
    let count = 0
    list.forEach(function(item) {
      item.spus.forEach(function(_item){
        //如果有菜品数量大于0就开始渲染这条数据
        if(_item.chooseCount > 0) {
          //计算每个菜品的总价，单价*数量
          let price = _item.min_price * _item.chooseCount
          //累加总订单数目
          count += _item.chooseCount
          let row = tmpl.replace('$name', _item.name)
                        .replace('$price', price)
                        .replace('$chooseCount', _item.chooseCount)
          // 计算整个总价
          totalPrice += price
          let $row = $(row)
          $row.data('itemData', _item)
          $strTop.append($row)
        }
      })
    })
    changeTotalPrice(totalPrice)
    changeDot(count)
  }

  function init() {
    $('.shop-bar').append($strTop).append($strBottom)
    addClick()
  }
  init()

  window.shopBar = {
    renderItems: renderItems,
    changeShoppingPrice: changeShoppingPrice
  }
})()