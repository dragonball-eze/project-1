class Game {
    constructor() {
      this.player = {};
      this.invader = [];
      this.bullets = [];
      this.score = 0;
      this.obstaclesFrequency = 0;
      this.gameOver = false;
      this.animationId = null;
    }
  }

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        // this.speed = speed;
        this.img = './images/lasershot.png';
    }
    drawBullet (){
        const bulletImg = new Image ()
        bulletImg.src = this.img;
        context.drawImage(bulletImg,this.x, this.y, 10, 10);
    }
}
  