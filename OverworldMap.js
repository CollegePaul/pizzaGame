class OverworldMap {
    constructor(config){
        this.gameOjects = config.gameOjects;
        this.walls = config.walls  || []

        //map images
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }


    drawLowerImage(ctx, cameraPerson){
        
        ctx.drawImage(this.lowerImage,
             utils.withGrid(10.5) - cameraPerson.x,
             utils.withGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson){
        
        ctx.drawImage(this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y)
   }

   isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.values(this.gameOjects).forEach(o => {
            
            //determine if object should actually maount
            
            o.mount(this);
        })
    }


    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y){
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction){
        this.removeWall(wasX,wasY);
        const {x,y} = utils.nextPosition(wasX,wasY, direction);
        this.addWall(x,y)
    }

}




window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameOjects: {
           hero: new Person({
               isPlayerControlled: true,
               x: utils.withGrid(5),
               y: utils.withGrid(6)
           }),
           npc1: new Person({
               isPlayerControlled: false,
               x: utils.withGrid(7),
               y: utils.withGrid(8),
               src: "/images/characters/people/npc1.png"
            })
            },
        walls: {
            //"7,6" Dynamic Keys
            [utils.asGridCoord(3,4)] : true, //bookcase
            [utils.asGridCoord(4,4)] : true,  
            [utils.asGridCoord(7,6)] : true, //square block  
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
            }
    },
    Kitchen: {
        lowerSrc:  "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameOjects: {
           hero: new Person({
               isPlayerControlled: true,
               x: 3,
               y: 5
           }),
           npcA: new GameObject({
               x: 9,
               y: 6,
               src: "/images/characters/people/npc2.png"
           }),
           npcB: new GameObject({
            x: 10,
            y: 8,
            src: "/images/characters/people/npc3.png"
        })
        }
    },
}