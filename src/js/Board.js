
var BOX_SIZE = 25;

function BuildBoard(){
    var BOARD = document.getElementById("board");
    var width = ($(window).width()/BOX_SIZE) - 1;
    var height = ($(window).height()/BOX_SIZE) - 5;

    var tmpBoard = '';
    for(var i = 0; i < width; i++) tmpBoard+='<td></td>';
    for( var i = 0; i < height; i++) $('#board').append( '<tr>'+tmpBoard+'</tr>' );
    
}

$(window).resize(function() {
    //BuildBoard();
});