APP = APP || { }

APP.view = (function($){
  var $pic;

  var init = function(callbacks){
    $pic = $("#waldo-pic")
    $pic.on("mouseover", callbacks.pictureEnter)
    $pic.on("mouseout", callbacks.pictureExit)
  },

  var showTags = function(tags){
    
  }
})($)