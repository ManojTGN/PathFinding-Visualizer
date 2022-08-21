
var IsVisualizing = false;
var BOX_SIZE = 45;

var START = null;
var END = null;
var CHECKPOINTS = [];
var OPTION_SELECTED = null;

function OptionHandler(option){

    OPTION_SELECTED = option;

}

function ClearBoardItems(toClear="ALL"){
    if(IsVisualizing) return;

    if(toClear == "ALL"){
        if(START != null) document.getElementById(START[0]+'_'+START[1]).innerHTML = '';
        if(END != null) document.getElementById(END[0]+'_'+END[1]).innerHTML = '';
        for(var i = 0; i < CHECKPOINTS.length; i++){
            document.getElementById(CHECKPOINTS[i][0]+'_'+CHECKPOINTS[i][1]).innerHTML = '';
        }

        START = null;END = null;CHECKPOINTS = [];OPTION_SELECTED = null;
        DetailUpdater();
        return;
    }else if(toClear == "CHECKPOINT"){
        for(var i = 0; i < CHECKPOINTS.length; i++){
            document.getElementById(CHECKPOINTS[i][0]+'_'+CHECKPOINTS[i][1]).innerHTML = '';
        }
        CHECKPOINTS = [];OPTION_SELECTED = null;
        DetailUpdater();
        return;
    }
}

function DetailUpdater(){

    if(START != null){ document.getElementById("display_start").innerHTML = "Placed ("+START[0]+","+START[1]+")";} 
    else { document.getElementById("display_start").innerHTML = "Not Placed";}
    
    if(END != null){ document.getElementById("display_end").innerHTML = "Placed ("+END[0]+","+END[1]+")"} 
    else { document.getElementById("display_end").innerHTML = "Not Placed"}
    
    if(CHECKPOINTS.length == 0){ document.getElementById("display_checkpoint").innerHTML = "Add Checkpoint"} 
    else { document.getElementById("display_checkpoint").innerHTML = "Checkpoints ("+CHECKPOINTS.length+")"}
}

function isCellAvailable(row,column){

    if( START != null && START[0] == row && START[1] == column) return false;
    if( END != null && END[0] == row && END[1] == column) return false;
    for(var i = 0; i < CHECKPOINTS.length; i++){
        if( CHECKPOINTS[i][0] == row && CHECKPOINTS[i][1] == column ) return false;
    }

    return true;
}

function BuildBoard(){

    var width = ($(window).width()/BOX_SIZE);
    var height = ($(window).height()/BOX_SIZE);

    var tmpBoard = '';
    for(var i = 0; i < height; i++){
        for( var j = 0; j < width; j++){
            tmpBoard+='<td><button class="btn btn-light" id="'+i+'_'+j+'" onclick="ClickHandler('+i+','+j+')"> </button></td>';
        } 
        $('#board').append( '<tr>'+tmpBoard+'</tr>' );
        tmpBoard = "";
    } 
}

function ClickHandler(row,column){ 
    if(IsVisualizing) return;

    if(OPTION_SELECTED == "START"){
        if(START != null && START[0] == row && START[1] == column){
            document.getElementById(row+'_'+column).innerHTML = ''; START = null;
            OPTION_SELECTED = null;DetailUpdater();
            return;
        }
        
        if(!isCellAvailable(row,column)){ OPTION_SELECTED = null;return;}
        if(START != null ) document.getElementById(START[0]+'_'+START[1]).innerHTML = '';
        document.getElementById(row+"_"+column).innerHTML = '<i class="bi bi-car-front"></i>';
        START = [row,column];DetailUpdater();   

    }else if(OPTION_SELECTED == "END"){
        if(END != null  && END[0] == row && END[1] == column){
            document.getElementById(row+'_'+column).innerHTML = ''; END = null;
            OPTION_SELECTED = null;DetailUpdater();
            return;
        }
        
        if(!isCellAvailable(row,column)){ OPTION_SELECTED = null;return;}
        if(END != null ) document.getElementById(END[0]+'_'+END[1]).innerHTML = '';
        document.getElementById(row+"_"+column).innerHTML = '<i class="bi bi-flag"></i>';
        END = [row,column];DetailUpdater();  

    }else if(OPTION_SELECTED == "CHECKPOINT"){
        for(var i = 0 ; i < CHECKPOINTS.length; i++){
            if(CHECKPOINTS[i][0] == row && CHECKPOINTS[i][1] == column){
                document.getElementById(CHECKPOINTS[i][0]+'_'+CHECKPOINTS[i][1]).innerHTML = '';
                CHECKPOINTS.splice(i, 1);DetailUpdater();
                OPTION_SELECTED = null;
                return;
            }
        }
        
        if(!isCellAvailable(row,column)){ OPTION_SELECTED = null;return;}
        document.getElementById(row+'_'+column).innerHTML = '<i class="bi bi-pin"></i>';
        CHECKPOINTS.push([row,column]);
        DetailUpdater();

    }else{
        if(!isCellAvailable(row,column)){ OPTION_SELECTED = null;return;}

        document.getElementById("toastHeader").innerHTML = 'Select The Option To Place At ('+row+','+column+')';
        document.getElementById("toastStart").setAttribute('onclick','OptionHandler("START");ClickHandler('+row+','+column+');');
        document.getElementById("toastEnd").setAttribute('onclick','OptionHandler("END");ClickHandler('+row+','+column+');');
        document.getElementById("toastCheckpoint").setAttribute('onclick','OptionHandler("CHECKPOINT");ClickHandler('+row+','+column+');');

        var toast = new bootstrap.Toast(document.getElementById('liveToast'))
        toast.show();
    }

    OPTION_SELECTED = null;

};  


$(window).resize(function() {
    //console.log("Page Resized")
    //BuildBoard();
});