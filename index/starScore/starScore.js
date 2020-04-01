(function() {
  //得分模板字符串
  let itemTmpl = '<div class="star-score">$starstr</div>'
  
  function _getStars() {
    let _score = this.score.toString()
    //4.4
    let scoreArray = _score.split('.')
    //满星
    let fullStar = parseInt(scoreArray[0])
    //半星
    let halfStar = parseInt(scoreArray[1]) >= 5 ? 1 : 0
    //0星
    let whiteStar = 5 - fullStar - halfStar

    let starstr = ''
    for(let i = 0; i < fullStar; i++) {
      starstr += '<div class="star fullStar"></div>'
    }
    if(halfStar === 1) {
      starstr += '<div class="star halfStar"></div>'
    }
    for(let i = 0; i < whiteStar; i++) {
      starstr += '<div class="star whiteStar"></div>'
    }

    return itemTmpl.replace('$starstr', starstr)
  }               

  window.StarScore = function(score) {
    this.score = score || ''
    this.getStars = _getStars
  }
})()