PATH_VISUALIZER = null;

class PathVisualizer{
    constructor(){
        this.RANDOM_WALKER = new RandomWalk(this);
    }

    Validate(){
        return BOARD.START != null && BOARD.END != null;
    }

    Visualize() {
        let SELECTED = $('#dropdown-selected').attr('class');
        if(this.Validate() == false || SELECTED == "") return;

        IsVisualizing = true;
        if(SELECTED == "#RandomWalk") this.RANDOM_WALKER.Start();
    }

    MoveTo( position ){
        BOARD.MarkPath(0,BOARD.START);
        BOARD.MoveTo("START", position);
        BOARD.MarkPath(1,position);
        BOARD.DetailUpdater();
    }

}