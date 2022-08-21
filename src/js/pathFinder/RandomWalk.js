
class RandomWalk{
    constructor(PATH_VISUALIZER){
        this.PATH_VISUALIZER = PATH_VISUALIZER;
        this.DIRECTION = [[0,1],[0,-1],[1,0],[-1,0]];
        this.MOVES = [];

        this.InitStart = null;
        this.CurrentPos = null;
    }

    isFinishFound(){
        return (BOARD.START[0] == BOARD.END[0]) && (BOARD.START[1] == BOARD.END[1]);
    }

    async Start(){
        this.InitStart = BOARD.START.slice();
        this.CurrentPos = BOARD.START.slice();

        let tmpPos = null;
        while(!this.isFinishFound()){

            tmpPos = this.DIRECTION[Math.floor(Math.random()*this.DIRECTION.length)];
            this.CurrentPos[0] += tmpPos[0];
            this.CurrentPos[1] += tmpPos[1];

            if(!BOARD.isCellAvailable(this.CurrentPos[0],this.CurrentPos[1],true)){
                this.CurrentPos[0] -= tmpPos[0];
                this.CurrentPos[1] -= tmpPos[1];
                continue
            }

            this.MOVES.push( this.CurrentPos.slice() );
            this.PATH_VISUALIZER.MoveTo( this.CurrentPos.slice() );

            await new Promise(r => setTimeout(r, 20));
        }

        IsVisualizing = false;
    }

}