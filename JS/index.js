const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width =canvas.width;const height=canvas.height;
let leftkey=rightkey=false;
document.getElementById("space-board").style.display="none";//to make the game invisible at first


  document.getElementById('start-button').onclick = () => {
  document.getElementById("space-board").style.display="block";// to make the board appear
    startGame();
  };

  let currentGame;

  //Sounds
  const shootSound = new Audio ()
  shootSound.src = "../sounds_Shoot.mp3";


  function startGame() {
    currentGame = new Game();
    currentGame.player = new Player();
    currentGame.player.drawPlayer();
    const bullet = new Bullet();
    bullet.drawBullet();
    cancelAnimationFrame(currentGame.animationId);
    updateCanvas();
  }

  function drawObstacles() {
    currentGame.obstaclesFrequency++;
    if (currentGame.obstaclesFrequency % 100 === 1) {
      const randomObstacleX = Math.floor(Math.random() * 450);
      const randomObstacleY = 0;
      const randomObstacleWidth = Math.floor(Math.random() * (50 - 20 + 1) + 20);
      const randomObstacleHeight = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  
      const newObstacle = new Obstacle(
        randomObstacleX,
        randomObstacleY,
        randomObstacleWidth,
        randomObstacleHeight
      );
  
      currentGame.obstacles.push(newObstacle);
    }
  }

  

  function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    currentGame.player.drawPlayer();
    //drawObstacles();
    currentGame.bullets.forEach(bullet => {
      bullet.y -= 3;
      bullet.drawBullet();
      });

    if (currentGame.gameOver === false) {
      currentGame.animationId = requestAnimationFrame(updateCanvas);}
  }



/*function onKeyDown(e){
     //space
      if(keycode==32){
        game.shooting()
    }
}

function onKeyUp(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        leftkey=false;
    }
    //right
    if(keycode==39){
        rightkey=false;
    }
}*/


function shooting () {
  currentGame.bullets.push(new Bullet(currentGame.player.x , currentGame.player.y));
    shootSound.play();
}
  


document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32){
    shooting()
  }
    currentGame.player.movePlayer(e.key);
  }
)


