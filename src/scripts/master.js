(function() {


  var NULL = null;
  var LEFT = 'left';
  var RIGHT = 'right';
  var TIMEOUT = 500;

  var conversations = [
    []
  ];

  var input = document.getElementById('j-input');
  var chat = document.getElementById('j-chat');
  var clear = document.getElementById('j-btn-clear-chat');
  var destroyBrain = document.getElementById('j-btn-destroy-brain');

  /* EVENT LISTENERS */
  clear.addEventListener('click', function(event) {
  	deleteRows();
  });
  destroyBrain.addEventListener('click', function(event) {
    deleteRows();
  });
  input.addEventListener('keypress', function(event) {
    	if (event.keyCode == 13 && input.value !== '') {
          processConversation(input.value);
          input.value = '';
      }
  });

  var bot = false;

  /* LOGIC */
  function processConversation(value) {
    if (bot === false){
      print(value,NULL);
      bot = true;
    } else{
      print(NULL,value);
      bot = false;
    }
    conversations[0].push(value);
    console.log(conversations[0]);
  }


  function deleteRows() {
  	while(chat.rows.length > 0) {
    	chat.deleteRow(0);
  	}
  }


  function objectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
  }

  function print(left, right) {
    newRow(left, NULL);
    newRow(NULL, right);
  }

  function newRow(textLeft, textRight) {
    var row = chat.insertRow(-1);
    newCell(row, LEFT, textLeft);
    setTimeout(function(){
      newCell(row, RIGHT, textRight);
    }, TIMEOUT);
  }
  function newCell(row, position, text) {
    var index = (position === LEFT ) ? 0 : 1;
    var clazz = (position === LEFT ) ? 'me' : 'bot';
    var writeThis = (text === NULL) ? "" : text;
    row.insertCell(index).innerHTML = '<div class="text '+clazz+'">'+writeThis+'</div>';
  }
  function randomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  var arrayContains = function(needle) {
      // Per spec, the way to identify NaN is that it is not equal to itself
      var findNaN = needle !== needle;
      var indexOf;

      if(!findNaN && typeof Array.prototype.indexOf === 'function') {
          indexOf = Array.prototype.indexOf;
      } else {
          indexOf = function(needle) {
              var i = -1, index = -1;

              for(i = 0; i < this.length; i++) {
                  var item = this[i];

                  if((findNaN && item !== item) || item === needle) {
                      index = i;
                      break;
                  }
              }
              return index;
          };
      }
      return indexOf.call(this, needle) > -1;
  };

})();
