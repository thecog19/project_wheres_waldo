var APP = APP || { }

APP.Controller = (function() {
  var _View, _names;
  var _tags = [];

  var _tempTag = undefined;
  var _inside = false;

  var _TagConstructor = function(options){
    this.x = options.x;
    this.y = options.y;
    this.name_id = options.name_id || null;
    this.name = options.name || null
    this.id = options.id
  };

  var init = function(View){
    _View = View;

    getData();


    _View.init({
      pictureEnter: pictureEnter,
      pictureLeave: pictureLeave,
      pictureClick: pictureClick,
      resetDimensions: resetDimensions,
      tagNameSelect: tagNameSelect,
      deleteTag: deleteTag
    })
  };

  var deleteTag = function(e){
    var uri = '/tags/' + e.target.getAttribute("data-id") +".json"

    $.ajax({
      url: uri,
      method: 'DELETE',
      complete: successfulTagDelete
    })
  }

  var successfulTagDelete = function(e){
    _findandDeleteTag(e.responseJSON.tag.id);
    _names.push(e.responseJSON.name)
    _View.generateDropdown(_names)
    _View.createTags(_tags);
  }

  var _findandDeleteTag = function(id) {
    for( var i = 0; i < _tags.length; i++){
      if (_tags[i].id === id) {
        _tags.splice(i,1);
      }
    }
  }

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

  var _findName = function(id){
    for( var i = 0; i < _names.length; i++){
      if (_names[i].id === id) {
        return _names[i].name;
      }
    }
  }

  var _findNameIndex = function(id){ 
    for( var i = 0; i < _names.length; i++){
      if (_names[i].id === id) {
        return i
      }
    }
  }

  var _constructTags = function(modelTags){
    var viewTags = [], vTag;

    modelTags.forEach( function(mTag) {
      mTag.name = _findName(mTag.name_id);
      vTag = new _TagConstructor(mTag);
      viewTags.push(vTag);
    })

    return viewTags;
  }

  var _successfulPageLoad = function(r){
    _names = r.responseJSON.names;
    _tags = _constructTags(r.responseJSON.tags);
    _View.generateDropdown(_names);
    _View.createTags(_tags);
  }

  var getData = function(){
    $.ajax({
      url: '/tags.json',
      method: 'GET',
      complete: _successfulPageLoad
    })
  }

  var pictureClick = function(e) {
    if (e.target.tagName === 'SELECT') return false;

    var coords = _View.computeCoords(e);

    if(_tempTag){
      _tempTag = undefined;
      _View.createTags(_tags);
    } else {
      _tempTag = new _TagConstructor(coords);
      _View.addDropdown(_tempTag);
    }
  }

  var _removeName = function(id){
    var index = _findNameIndex(id)
    _names.splice(index, 1)
    _View.generateDropdown(_names)
  }

  var _successfulTagCreate = function(r){
    _removeName(r.tag.name_id)
    _tempTag.name = r.name;
    _tempTag.id = r.tag.id;

    _tags.push(_tempTag);
    _tempTag = undefined;
    _View.createTags(_tags);
  }

  var _errorTagCreate = function(r){
    _tempTag = undefined;
    _View.createTags(_tags);
  }

  var tagNameSelect = function tagNameSelect(e) {
    _tempTag.name_id = e.target.value;


    $.ajax({
      url: '/tags.json',
      method: 'POST',
      data: JSON.stringify({tag: _tempTag}),
      contentType: 'application/json',
      success: _successfulTagCreate,
      error: _errorTagCreate
    })
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
