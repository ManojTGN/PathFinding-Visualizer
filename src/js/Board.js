var IsVisualizing = false;
BOARD = null;

class Board{
    constructor(){
        this.BOX_SIZE = 45;
        this.START = null;
        this.END = null;
        this.CHECKPOINTS = [];
        this.OPTION_SELECTED = null;
        
        this.TOTAL_X_BOX = ($(window).width()/this.BOX_SIZE);
        this.TOTAL_Y_BOX = ($(window).height()/this.BOX_SIZE);
        this.BuildBoard();
    }

    BuildBoard(){
        var tmpBoard = '';
        for(var i = 0; i < this.TOTAL_Y_BOX; i++){
            for( var j = 0; j < this.TOTAL_X_BOX; j++){
                tmpBoard+='<td><button class="btn btn-light" id="'+i+'_'+j+'" onclick="BOARD.ClickHandler('+i+','+j+')"> </button></td>';
            } 
            $('#board').append( '<tr>'+tmpBoard+'</tr>' );
            tmpBoard = "";
        } 
    }

    DetailUpdater(){
        if(this.START != null){ document.getElementById("display_start").innerHTML = "Placed ("+this.START[0]+","+this.START[1]+")";} 
        else { document.getElementById("display_start").innerHTML = "Not Placed";}
        
        if(this.END != null){ document.getElementById("display_end").innerHTML = "Placed ("+this.END[0]+","+this.END[1]+")";} 
        else { document.getElementById("display_end").innerHTML = "Not Placed";}
        
        if(this.CHECKPOINTS.length == 0){ document.getElementById("display_checkpoint").innerHTML = "Add Checkpoint";} 
        else { document.getElementById("display_checkpoint").innerHTML = "Checkpoints ("+this.CHECKPOINTS.length+")";}
    }

    isCellAvailable(row,column,isForFinding=false){
        if( (row < 0 || column < 0) || ( column >= this.TOTAL_X_BOX || row >= this.TOTAL_Y_BOX)) return false;
        if( this.START != null && this.START[0] == row && this.START[1] == column) return false;
        if(!isForFinding){if( this.END != null && this.END[0] == row && this.END[1] == column) return false;}
        for(var i = 0; i < this.CHECKPOINTS.length; i++){
            if( this.CHECKPOINTS[i][0] == row && this.CHECKPOINTS[i][1] == column ) return false;
        }
    
        return true;
    }

    ClearBoardItems(toClear="ALL"){
        if(IsVisualizing) return;
    
        if(toClear == "ALL"){
            if(this.START != null) document.getElementById(this.START[0]+'_'+this.START[1]).innerHTML = '';
            if(this.END != null) document.getElementById(this.END[0]+'_'+this.END[1]).innerHTML = '';
            for(var i = 0; i < this.CHECKPOINTS.length; i++){
                document.getElementById(this.CHECKPOINTS[i][0]+'_'+this.CHECKPOINTS[i][1]).innerHTML = '';
            }
    
            this.START = null;this.END = null;this.CHECKPOINTS = [];this.OPTION_SELECTED = null;
            this.DetailUpdater();
            return;
        }else if(toClear == "CHECKPOINT"){
            for(var i = 0; i < this.CHECKPOINTS.length; i++){
                document.getElementById(this.CHECKPOINTS[i][0]+'_'+this.CHECKPOINTS[i][1]).innerHTML = '';
            }
            this.CHECKPOINTS = [];this.OPTION_SELECTED = null;
            this.DetailUpdater();
            return;
        }
    }

    MarkPath(darkness,position){
        if(darkness == 0) document.getElementById(position[0]+"_"+position[1]).style.backgroundColor = "#8fa7ff";
        else if(darkness == 1) document.getElementById(position[0]+"_"+position[1]).style.backgroundColor = "#2e5bff";
    }

    MoveTo(who,position){
        if(who == "START"){
            document.getElementById(this.START[0]+"_"+this.START[1]).innerHTML = '';
            document.getElementById(position[0]+"_"+position[1]).innerHTML = '<i class="bi bi-car-front"></i>';
            this.START = position;
        }
    }

    ClickHandler(row,column){ 
        if(IsVisualizing) return;
    
        if(this.OPTION_SELECTED == "START"){
            if(this.START != null && this.START[0] == row && this.START[1] == column){
                document.getElementById(row+'_'+column).innerHTML = ''; this.START = null;
                this.OPTION_SELECTED = null;this.DetailUpdater();
                return;
            }
            
            if(!this.isCellAvailable(row,column)){ this.OPTION_SELECTED = null;return;}
            if(this.START != null ) document.getElementById(this.START[0]+'_'+this.START[1]).innerHTML = '';
            document.getElementById(row+"_"+column).innerHTML = '<i class="bi bi-car-front"></i>';
            this.START = [row,column];this.DetailUpdater();   
    
        }else if(this.OPTION_SELECTED == "END"){
            if(this.END != null  && this.END[0] == row && this.END[1] == column){
                document.getElementById(row+'_'+column).innerHTML = ''; this.END = null;
                this.OPTION_SELECTED = null;this.DetailUpdater();
                return;
            }
            
            if(!this.isCellAvailable(row,column)){ this.OPTION_SELECTED = null;return;}
            if(this.END != null ) document.getElementById(this.END[0]+'_'+this.END[1]).innerHTML = '';
            document.getElementById(row+"_"+column).innerHTML = '<i class="bi bi-flag"></i>';
            this.END = [row,column];this.DetailUpdater();  
    
        }else if(this.OPTION_SELECTED == "CHECKPOINT"){
            for(var i = 0 ; i < this.CHECKPOINTS.length; i++){
                if(this.CHECKPOINTS[i][0] == row && this.CHECKPOINTS[i][1] == column){
                    document.getElementById(this.CHECKPOINTS[i][0]+'_'+this.CHECKPOINTS[i][1]).innerHTML = '';
                    this.CHECKPOINTS.splice(i, 1);this.DetailUpdater();
                    this.OPTION_SELECTED = null;
                    return;
                }
            }
            
            if(!this.isCellAvailable(row,column)){ this.OPTION_SELECTED = null;return;}
            document.getElementById(row+'_'+column).innerHTML = '<i class="bi bi-pin"></i>';
            this.CHECKPOINTS.push([row,column]);this.DetailUpdater();
    
        }else{
            if(!this.isCellAvailable(row,column)){ this.OPTION_SELECTED = null;return;}
    
            document.getElementById("toastHeader").innerHTML = 'Select The Option To Place At ('+row+','+column+')';
            document.getElementById("toastStart").setAttribute('onclick','BOARD.OptionHandler("START");BOARD.ClickHandler('+row+','+column+');');
            document.getElementById("toastEnd").setAttribute('onclick','BOARD.OptionHandler("END");BOARD.ClickHandler('+row+','+column+');');
            document.getElementById("toastCheckpoint").setAttribute('onclick','BOARD.OptionHandler("CHECKPOINT");BOARD.ClickHandler('+row+','+column+');');
    
            var toast = new bootstrap.Toast(document.getElementById('liveToast'))
            toast.show();
        }
    
        this.OPTION_SELECTED = null;
    }

    OptionHandler(option){
        this.OPTION_SELECTED = option;
    }

}