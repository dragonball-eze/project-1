class Game {
    constructor() {
      this.player = {};
      this.bullets = [];
      this.satellites = [];
      this.aliens = [];
      this.score = 0;
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

/*const gameState = {
  enemies: [],
  lastTime: Date.now()
}

const enemiesPerRow = 10;
const enemyPaddingH = 80;
const enemyPaddingV = 70;
const enemySpacingV = 80;


const enemySpacing =
    (width - enemyPaddingH * 2) / (enemiesPerRow - 1);
    for (let j = 0; j < 3; j++) {
      const y = enemyPaddingV + j * enemySpacingV;
      for (let i = 0; i < enemiesPerRow; i++) {
        const x = i * enemySpacing + enemyPaddingH;
      }}

function update(e) {
    const currentTime = Date.now();
    const dt = (currentTime - gameState.lastTime) / 1000.0;


/*class Invaders {
  constructor(){

    function updateEnemies(dt, $container) {
      const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
      const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;    
  
      const enemies = .enemies;
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const x = enemy.x + dx;
        const y = enemy.y + dy;
        setPosition(enemy.$element, x, y);
  }}} */