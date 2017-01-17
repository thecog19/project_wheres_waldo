var APP = APP || { }

APP.View = (function($){
  var $pic;

  var _addEventListeners = function _addEventListeners(cbs) {
    $pic.on("mouseover", cbs.pictureEnter)
    $pic.on("mouseout", cbs.pictureLeave)
    $pic.on("click", cbs.pictureClick)
  }

  var init = function(callbacks){
    $pic = $("#waldo-pic");
    _addEventListeners(callbacks);
  };

  var createTags = function(tags){
    deleteTags();

    tags.forEach(function(tag){
      tagSquare = document.createElement('DIV');
      tagSquare.classList.add('tag');

      tagSquare.style.top = tag.y + "px";
      tagSquare.style.left = tag.x+ "px";
      tagSquare.style.zIndex = '0';

      $pic[0].appendChild(tagSquare);
    })
  };

  var deleteTags = function(){
    $pic[0].innerHTML = "";
  };

  var addDropdown = function addDropdown(tag) {
    createTags([tag]);
  }

  return {
          init: init,
          createTags: createTags,
          deleteTags: deleteTags,
          addDropdown: addDropdown,
          }
})($)
