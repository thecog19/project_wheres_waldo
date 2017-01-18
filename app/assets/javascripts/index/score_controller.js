var APP = APP || { }

APP.Score = (function(_View){
    var score = 10000

    var updateScore = function(){
      score -= 10
    }

    var saveScore = function(){
      $.ajax({
        url: '/scores.json',
        method: 'POST',
        complete: function(){_View.scoreDisplay(score)},
        data: JSON.stringify({score: score}),
        contentType: "application/json"
      })
    }

    return {
      saveScore: saveScore
    }
})(APP.View)