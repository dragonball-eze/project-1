const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width =canvas.width;const height=canvas.height;
let leftkey=rightkey=false;
document.getElementById("space-board").style.display="none";//to make the game invisible at first
document.getElementById('game-over').style.display = 'none';
document.getElementById('game-over-score').style.display = 'none';

document.getElementById('start-button').onclick = () => {
  document.getElementById("space-board").style.display="block";// to make the board appear
  canvas.focus();
    startGame();
  };

let currentGame;

  //Sounds
  const shootSound = new Audio ()
  shootSound.src = "../sounds_Shoot.mp3";

  const gameIntroSound = new Audio ()
  gameIntroSound.src = "../sounds_intro.mp3";

   //Bullet impact
   function bulletHit(alien, bullet) {

    return !(bullet.x > alien.x + alien.width ||
    bullet.x < alien.x ||
    bullet.y > alien.y + alien.height ||
    bullet.y + bullet.height < alien.y)
  }

  function startGame() {
    gameIntroSound.play();
    currentGame = new Game();
    currentGame.player = new Player();
    currentGame.player.drawPlayer();
    const bullet = new Bullet();
    bullet.drawBullet();
    cancelAnimationFrame(currentGame.animationId);
    updateCanvas();
    
  }

  // Satellites
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

      //Satellite collusion
      function detectCollision(satellite) {
        return !(
          currentGame.player.moveLeft() > satellite.right() ||
          currentGame.player.moveRight() < satellite.left() ||
          currentGame.player.moveTop() > satellite.bottom()
        );
      }

      if (detectCollision(satellite)) {
        currentGame.gameOver = true;
        currentGame.satellitesFrequency = 0;
        currentGame.score = 0;
        currentGame.satellites = [];
        //document.getElementById("score").innerText = 0;
        document.getElementById("space-board").style.display = "none";
        cancelAnimationFrame(currentGame.animationId);
        alert("Ouch! You crashed on a satellite!");
      }

      if (satellite.y > canvas.clientHeight) {
        currentGame.satellites.splice(index, 1);
      }
    });

  }
  // Aliens
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
      
      //Alien collision
      function detectCollision(alien) { // TO CHECK
        return !(
          currentGame.player.moveLeft() > alien.right() ||
          currentGame.player.moveRight() < alien.left() ||
          currentGame.player.moveTop() > alien.bottom()
        );
      }

      if (detectCollision(alien)) {
        currentGame.gameOver = true;
        currentGame.aliensFrequency = 0;
        //currentGame.score = 0;
        currentGame.aliens = [];
        //document.getElementById("score").innerText = 0;
        document.getElementById("space-board").style.display = "none";
        cancelAnimationFrame(currentGame.animationId);
        alert("Damn! They got you first!");
      }


      if (alien.y > canvas.clientHeight) {
        currentGame.aliens.splice(index, 1);
      }
    });

  }

 
  function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    currentGame.player.drawPlayer();
    //drawBullets();
    currentGame.bullets.forEach(bullet => {
      bullet.y -= 3;
      bullet.drawBullet();
      });

    drawSatellite();
    drawAlien();



    for(let j = 0; j < currentGame.aliens.length; j++){
      for (let k = 0; k < currentGame.bullets.length; k++) {
          if (bulletHit(currentGame.aliens[j],currentGame.bullets[k])){
            console.log('collision');
              currentGame.aliens.splice(j,1);
              currentGame.bullets.splice(k,1);
              currentGame.score++;
              document.getElementById('score').innerHTML = currentGame.score;
              //explosionSound.play();
          }
      }
    }



    if (currentGame.gameOver === false) {
      currentGame.animationId = requestAnimationFrame(updateCanvas);
    }


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


