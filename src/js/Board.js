
function BuildBoard(){
    var BOARD = document.getElementById("board");
    var height = $(window).height();
    var width = $(window).width();

    var tmpBoard = '';
    for(var j = 0; j < (width/25);j++) tmpBoard+='<td></td>';
    for( var i = 0; i < (height/25);i++) $('#board').append( '<tr>'+tmpBoard+'</tr>' );
    
}