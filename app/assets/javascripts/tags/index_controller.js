var APP = APP || { }

APP.Controller = (function() {
  var _View;

  var _TagConstuctor = function(x,y,name){
    this.x = x;
    this.y = y;
    this.name = name || null;
  };

  var _tags = [ new _TagConstuctor(.8,.05),
                new _TagConstuctor(0,0),
                new _TagConstuctor(.01, .06),
                new _TagConstuctor(.5, .5)];

  var _tempTag = undefined;
  var _inside = false;
 
  var init = function(View){
    _View = View;

    _View.init({
      pictureEnter: pictureEnter,
      pictureLeave: pictureLeave,
      pictureClick: pictureClick,
      resetDimensions: resetDimensions
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

  var pictureClick = function(e) {
    View.computeX(e.offset)

    var tempTag = new _TagConstuctor();
    _View.addDropdown(tempTag);
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
