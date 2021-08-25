class Game {
    constructor() {
      this.player = {};
      this.boss = {};
      this.bullets = [];
      this.satellites = [];
      this.aliens = [];
      this.score = 0;
      this.level = 1;
      this.satellitesFrequency = 0;
      this.aliensFrequency = 0;
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

