class Person extends GameObject{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.dirctionUpdate = {
            "up": ["y" , -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0){
            this.updatePosition();
        }else{

            //more cases for stating to walk will be here.

            //case:  keyboard ready and have an arrow key pressed
            if (this.isPlayerControlled && state.arrow){
                this.startBehaviour(state,{
                     type: "walk",
                     dirction: state.arrow
                })
             }
             this.updateSprite(state);
        }
    }

    startBehaviour(state, behaviour){
        //Set character direction to whatever behavour has
        this.direction = behaviour.dirction;

        if (behaviour.type === "walk"){
           if (state.map.isSpaceTaken(this.x,this.y, this.direction)){
               return;  //don't move
           }

           //ready to walk.
           state.map.moveWall(this.x, this.y, this.direction);
           this.movingProgressRemaining = 16;
        }
       
    }


    updatePosition(){
            const [property, change] = this.dirctionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
    }

    updateSprite(){

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }

        this.sprite.setAnimation("idle-" + this.direction);
    }
}