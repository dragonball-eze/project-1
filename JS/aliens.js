class Alien extends Obstacle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
      }

      draw() {
        const alien = new Image();
        alien.src = "./images/aliens.png";
        context.drawImage(alien, this.x, this.y, this.width, this.height);
      }
    
    }