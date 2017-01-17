var APP = APP || { }

APP.Controller = (function() {
  var _View;

  var _TagConstuctor = function(x,y,name){
    this.x = x;
    this.y = y;
    this.name = name || null;
  };

  var _tags = [ new _TagConstuctor(40,50),
                new _TagConstuctor(0,0),
                new _TagConstuctor(150, 100),
                new _TagConstuctor(300, 400)];

  var _tempTag = undefined;

  var init = function(View){
    _View = View;

    _View.init({
      pictureEnter: pictureEnter,
      pictureLeave: pictureLeave,
      pictureClick: pictureClick
    })
  };

  var pictureEnter = function(){
    _View.createTags(_tags);
  }

  var pictureLeave = function(){
    _View.deleteTags(_tags);
  }

  var pictureClick = function(e) {
    console.log(e);

    var tempTag = new _TagConstuctor(e.pageX, e.pageY);
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
