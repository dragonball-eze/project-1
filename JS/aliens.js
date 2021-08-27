class Alien extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this.width = 50;
        this.height = 50;
      }

      draw() {
        const alien = new Image();
        alien.src = "./images/aliens.png";
        context.drawImage(alien, this.x, this.y, this.width, this.height);
        //context.strokeStyle = "yellow"
        //context.strokeRect(this.x, this.y, this.width, this.height);
      }
    }

    
 