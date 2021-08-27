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
      this.bossShots = [];
      this.bossStage = false;
    }
  }

class Bullet {
    constructor(x, y) {
        this.x = x + 20;
        this.y = y;
        this.width = 10;
        this.height = 10;
       
        this.img = './images/lasershot.png';
    }
    drawBullet (){
        const bulletImg = new Image ()
        bulletImg.src = this.img;
        context.drawImage(bulletImg,this.x, this.y, this.width, this.height);
        //context.strokeStyle = "yellow"
        //context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

