var APP = APP || { }

APP.Controller = (function() {
  var _View;

  var _TagConstuctor = function(x,y,name_id,name){
    this.x = x;
    this.y = y;
    this.name_id = name_id || null;
    this.name = name || null
  };

  var _tags = [];

  var _tempTag = undefined;
  var _inside = false;

  var init = function(View){
    getNames()
    _View = View;

    _View.init({
      pictureEnter: pictureEnter,
      pictureLeave: pictureLeave,
      pictureClick: pictureClick,
      resetDimensions: resetDimensions,
      tagNameSelect: tagNameSelect
    })
  };

  var resetDimensions = function(){
    _View.resetDimensions()
    _View.createTags(_tags)
  }

  var pictureEnter = function(e){
    if(_View.insidePicture(e)){
      if(!_inside){
        _View.createTags(_tags);
        _inside = true
      }
      }else{
        _inside = false
        pictureLeave()
      }
  }

  var pictureLeave = function(){
    _View.deleteTags(_tags);
  }

  var getNames = function(){
    $.ajax({
      url: '/tags.json',
      method: 'GET',
      complete: (function(r){ _View.generateDropdown(r.responseJSON) })
    })
  }

  var pictureClick = function(e) {
    if (e.target.tagName === 'SELECT') return false;

    var coords = _View.computeCoords(e);

    if(_tempTag){
      _tempTag = undefined;
      _View.createTags(_tags);
    } else {
      _tempTag = new _TagConstuctor(coords[0], coords[1]);
      _View.addDropdown(_tempTag);
    }
  }

  var tagNameSelect = function tagNameSelect(e) {
    console.log("tagNameSelect", e.target);

    _tempTag.name_id = e.target.value;
    _tags.push(_tempTag);
    $.ajax({
      url: '/tags.json',
      method: 'POST',
      data: JSON.stringify({tag: _tempTag}),
      contentType: 'application/json',
      complete: (function(r){ console.log("ajax complete", r) })
    })
    _tempTag = undefined;
    _View.createTags(_tags);
  }

  return { init: init }

})();

$(document).ready( function(){
  APP.Controller.init(APP.View);
});

// Pseudocode. Like code, but better.

//hovering displays tags
//tags have to be stored
  //array of objects
  //tag object has name, x coord, y coord
  //set width and height
//view handles on hover
//tags can be added
//click listener
  //adds dropdown, stores coords in temporary (non persisted) tag object
  //if unpersisted tag exists, click listener deletes it on click and removes dropdown
//submit listener
  //on dropdown submit saves temp tag
  //removes temp tag
  //removes drop down
