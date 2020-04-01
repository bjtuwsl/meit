(function() {
  //订单卡片模板
  let itemTmpl = '<div class="order-item">'+
                    '<div class="order-item-inner">'+
                      '<img class="item-img" src=$poi_pic />'+
                      '<div class="item-right">'+
                        '<div class="item-top">'+
                          '<p class="order-name one-line">$poi_name</p>'+
                          '<div class="arrow"></div>'+
                          '<div class="order-state">$status_description</div>'+
                        '</div>'+
                        '<div class="item-bottom">$getProduct</div>'+
                      '</div>'+
                    '</div>'+
                    '$getComment'+
                  '</div>'


  /**
   * 渲染评价按钮
   * @param {}
   */
  function getComment(data) {
    let evaluation = !data.is_comment
    if(evaluation) {
      return '<div class="evalution clearfix">'+
                '<div class="evalution-btn">评价</div>'+
              '</div>'
    }
    return ''
  }
  /**
   * 渲染总计菜品
   * @param {}
   */
  function getTotalPrice(data) {
    return str = '<div class="product-item">'+
                '<span>...</span>'+
                '<div class="p-total-count">'+
                  '总计'+data.product_count+'个菜，实付'+
                  '<span class="total-price">￥'+data.total+'</span>'+
                '</div>'+
              '</div>'
  }

  /**
   * 渲染具体商品
   * @param {}
   */
  function getProduct(data) {
    let list = data.product_list || []
    list.push({type:'more'})
    let str = ''
    list.forEach(function(item) {
      if(item.type === 'more') {
        str += getTotalPrice(data)
      } else {
        str += '<div class="product-item">'+
                  item.product_name+
                  '<div class="p-count">x'+item.product_count+'</div>'+
                '</div>'
      }
    })
    return str
  }

  /**
   * 渲染列表
   * @param []
   */
  function initContent(data) {
    data.forEach(item => {
      let str = itemTmpl.replace('$poi_pic', item.poi_pic)
                        .replace('$poi_name', item.poi_name)
                        .replace('$status_description', item.status_description)
                        .replace('$getProduct', getProduct(item))
                        .replace('$getComment', getComment(item))
      $('.order-list').append($(str))
    })
  }

  let page = 0
  let isLoading = false
  /**
   * 请求数据
   * @param
   */
  function getList() {
    page++
    isLoading = true
    setTimeout(function() {
      $.get('../json/orders.json', function(data) {
        // console.log(data)
        let list = data.data.digestlist || []
        initContent(list)
        isLoading = false
      })
    }, 500)
  }
  

  /**
   * 滚动加载事件
   */
  function addEvent() {
    window.addEventListener('scroll', function() {
      let clientHeight = document.documentElement.clientHeight
      let scrollHeight = document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      // 达到预期值就发送ajax
      let proDis = 30
      if((scrollTop + clientHeight) >= (scrollHeight - proDis)) {
        // 最多滚动加载三页
        if(page < 3) {
          // 发送ajax时候避免多次加载
          if(isLoading) return
          getList()
        } else if(page === 3) {
          if(!isLoading) {
            $(".loading").text('客官，没有更多了！')
          }
        }
      }
    })
  }


  function init() {
    getList()
    addEvent()
  }
  init()
})()