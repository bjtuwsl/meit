(function() {
  // 商家的模板字符串
  let itemTmpl = '<div class="r-item-content">'+
                    '<img class="item-img" src=$pic_url />'+
                    '$brand'+
                    '<div class="item-info-content">'+
                      '<p class="item-title">$name</p>'+
                      '<div class="item-desc clearfix">'+
                        '<div class="item-score">$wm_poi_score</div>'+
                        '<div class="item-count">月售$mountNum</div>'+
                        '<div class="item-distance">&nbsp;$distance</div>'+
                        '<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
                      '</div>'+
                      '<div class="item-price">'+
                        '<div class="item-pre-price">$min_price_tip</div>'+
                      '</div>'+
                      '<div class="item-others">'+
                          '$others'+
                      '</div>'+
                    '</div>'+
                  '</div>'

  let page = 0
  let isLoading = false
  /**
   * 获取商家列表数据
   */
  function getList() {
    page++
    isLoading = true
    $.get('../json/homelist.json', function(data) {
      let list = data.data.poilist || []
      // console.log(list)
      initContentList(list)
      isLoading = false
    })
  }

  /**
   * 渲染是否是新到热门品牌标签
   * param {} data
   */
  function getBrand(data) {
    if(data.brand_type) {
      return '<div class="brand brand-pin">品牌</div>'
    } else {
      return '<div class="brand brand-xin">新到</div>'
    }
  }

  /**
   * 渲染月售
   * param {} data
   */
  function getMonthNum(data) {
    let num = data.month_sale_num
    if(num > 999) {
      // 大于999采用999+
      return '999+'
    } else {
      return num
    }
  }
  /**
   * 渲染商家活动
   * param {} data
   */
  function getOthers(data) {
    let array = data.discounts2
    let str = ''
    //内部的活动商家模板字符串
    array.forEach(function(item, data) {
      var _str = '<div class="other-info">'+
                    '<img src="$icon_url" class="other-tag">'+
                    '<p class="other-content one-line">$info</p>'+
                  '</div>'
      //模板字符串替换
      _str = _str.replace('$icon_url', item.icon_url)
                 .replace('$info', item.info)
      str = str + _str
    })
    return str
  }


  /**
   * 渲染商家列表
   */
  function initContentList(list) {
    list.forEach(function(item, index) {
      let str = itemTmpl
                .replace('$pic_url', item.pic_url)
                .replace('$name', item.name)
                .replace('$distance', item.distance)
                .replace('$min_price_tip', item.min_price_tip)
                .replace('$mt_delivery_time', item.mt_delivery_time)
                .replace('$brand', getBrand(item))
                .replace('$mountNum', getMonthNum(item))
                .replace('$others', getOthers(item))
                .replace('$wm_poi_score', new StarScore(item.wm_poi_score).getStars())
      
      $(".list-wrap").append($(str))
      $('.r-item-content').eq(index).click(function() {
        window.location.href = '/menu/menu.html?id='+ item.id
      })
    })
  }

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
          $(".loading").text('客官，没有更多了！')
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