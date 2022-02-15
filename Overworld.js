class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }

 startGameLoop(){
  const step = () => {
    

    //clear the canvas
    this.ctx.clearRect(0,0, this.canvas.width,this.canvas.height)
    
    //establish camera object - can be any npc also
    const cameraPerson = this.map.gameOjects.hero;

    //update all objects
    Object.values(this.map.gameOjects).forEach(object => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.map,
      })
    })


    //maps
    this.map.drawLowerImage(this.ctx, cameraPerson)
    

    //draw all objects
    Object.values(this.map.gameOjects).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
    })

    //draw map upper Layer
    this.map.drawUpperImage(this.ctx, cameraPerson)

      requestAnimationFrame(() => {
      step();
    })
  }
  step()
 }

 init() {
  this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
  //console.log(this.map.walls);
  this.directionInput = new directionInput();
  this.directionInput.init();
  this.startGameLoop();

  
 }

}

