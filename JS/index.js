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

  function drawSatellite() {
    currentGame.satellitesFrequency++;
    if (currentGame.satellitesFrequency % 200 === 1) {
      const randomSatelliteX = Math.floor(Math.random() * 450);
      const randomSatelliteY = 0;
      
  
      const newSatellite = new Obstacle (
        randomSatelliteX,
        randomSatelliteY,
      );
  
      currentGame.satellites.push(newSatellite);
    }


    currentGame.satellites.forEach((satellite, index) => {
      satellite.y += 1;
      satellite.draw();
    });

  }

  function drawAlien() {
    currentGame.aliensFrequency++;
    if (currentGame.aliensFrequency % 100 === 1) {
      const randomAlienX = Math.floor(Math.random() * 450);
      const randomAlienY = 0;
  
      const newAlien = new Alien(
        randomAlienX,
        randomAlienY,
      );
  
      currentGame.aliens.push(newAlien);
    }

    currentGame.aliens.forEach((alien, index) => {
      alien.y += 1;
      alien.draw();
    });

  }

  

  function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    currentGame.player.drawPlayer();
    //drawObstacles();
    currentGame.bullets.forEach(bullet => {
      bullet.y -= 3;
      bullet.drawBullet();
      });

    drawSatellite();
    drawAlien();
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


