var APP = APP || { }

APP.View = (function($){
  var $pic, height, width

  var _addEventListeners = function _addEventListeners(cbs) {
    $pic.on("mousemove", cbs.pictureEnter)
    window.addEventListener('resize', cbs.resetDimensions)
    $pic.on("click", cbs.pictureClick)
  }

  var resetDimensions = function(){
    height = window.innerHeight * 0.9 
    width = window.innerWidth * 0.8
  }

  var init = function(callbacks){
    resetDimensions()
    $pic = $("#waldo-pic");
    _addEventListeners(callbacks);
  };

  var createTags = function(tags){
    deleteTags();

    tags.forEach(function(tag){
      tagSquare = document.createElement('DIV');
      tagSquare.classList.add('tag');

      tagSquare.style.top = tag.y * height + "px";
      tagSquare.style.left = tag.x * width + "px";
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

  var insidePicture = function(e){
    return e.clientX > 0 && e.clientX < width && e.clientY > 0 && e.clientY < height
  }

  return {
          init: init,
          createTags: createTags,
          deleteTags: deleteTags,
          addDropdown: addDropdown,
          insidePicture: insidePicture,
          resetDimensions: resetDimensions
          }
})($)
