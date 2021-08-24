class Alien extends Obstacle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
      }

      draw() {
        const alien = new Image();
        alien.src = "./images/aliens.png";
        context.drawImage(alien, this.x, this.y, this.width, this.height);
        context.strokeStyle = "green";
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

     /*  aliens.crashWith = function(canvasBottom) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = canvasBottom.x;
        var otherright = canvasBottom.x + (canvasBottom.width);
        var othertop = canvasBottom.y;
        var otherbottom = canvasBottom.y + (canvasBottom.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      } */
    
    }