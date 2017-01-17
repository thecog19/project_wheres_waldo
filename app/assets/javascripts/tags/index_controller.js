APP = APP || { }

APP.controller = (function(view) {
  
  var _tagConstuctor = function(x,y,name){
    this.x = x;
    this.y = y;
    this.name = name || null;
  };

  var _tags = [];
  var _tempTag = undefined;

  var init = function(){
    APP.view.init({ 
      pictureEnter: pictureEnter,
      pictureLeave: pictureLeave
    })
  };

  var pictureEnter = function(){
    View.createTags(_tags);
  }

  var pictureLeave = function(){
    View.deleteTags(_tags);
  }

  return { init: init }

})(APP.view)

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