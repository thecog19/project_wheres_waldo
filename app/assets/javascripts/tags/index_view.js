var APP = APP || { }

APP.View = (function($){
  var $pic, height, width, $dropDown

  var _addEventListeners = function _addEventListeners(cbs) {
    $pic.on("mousemove", cbs.pictureEnter)
    window.addEventListener('resize', cbs.resetDimensions)
    $pic.on("click", cbs.pictureClick)
    $pic.on("change", "select", cbs.tagNameSelect)
  }

  var _createTag = function _createTag(tag) {
    tagSquare = document.createElement('DIV');
    tagSquare.classList.add('tag');

    tagSquare.style.top = tag.y * height + "px";
    tagSquare.style.left = tag.x * width + "px";
    tagSquare.style.zIndex = '0';
    if(tag.name){
      var name = $("<div>").addClass("name").text(tag.name)
      tagSquare.append(name[0])
    }

    $pic[0].appendChild(tagSquare);

    return tagSquare;
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
      _createTag(tag);
    })
  };

  var deleteTags = function(){
    $pic[0].innerHTML = "";
  };

  var generateDropdown = function(options){
    $dropDown =  $('<select>')
    var option
    options.names.forEach(function(name){
      option = $("<option>").val(name.id)
      option.text(name.name)
      $dropDown.append(option) 
    })   
    
  }

  var addDropdown = function addDropdown(tag) {
    var tagSquare = _createTag(tag);
    tagSquare.append($dropDown[0])
  }

  var insidePicture = function(e){
    return e.clientX > 0 && e.clientX < width && e.clientY > 0 && e.clientY < height
  }

  var computeCoords = function computeCoords(e) {
    return [(e.offsetX - 33)/width, (e.offsetY - 33)/height]
  }

  return {
          init: init,
          createTags: createTags,
          deleteTags: deleteTags,
          addDropdown: addDropdown,
          insidePicture: insidePicture,
          resetDimensions: resetDimensions,
          computeCoords: computeCoords,
          generateDropdown: generateDropdown
          }
})($)
