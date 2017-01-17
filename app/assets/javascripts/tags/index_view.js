APP = APP || { }

APP.view = (function($){
  var $pic;

  var init = function(callbacks){
    $pic = $("#waldo-pic")
    $pic.on("mouseover", callbacks.pictureEnter)
    $pic.on("mouseout", callbacks.pictureExit)
  };

  var createTags = function(tags){
    tags.forEach(function(tag){
      $()

    })
  };
})($)

var renderBoard = function renderBoard(board) {
  var size = CELL_SIDE,
  square;

  gameWrapper.innerHTML = "";

  for(coord in board) {
  square = document.createElement('DIV');
  square.classList.add('square');
   square.id = coord;

  if (board[coord].value) {
  square.classList.add(board[coord].value)
  }

  square.style.height = size;
  square.style.width = size;
  square.style.top = board[coord].y*size + "px";
  square.style.left = board[coord].x*size + "px";
  square.style.zIndex = '0';

  gameWrapper.appendChild(square);
  }
  }
