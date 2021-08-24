const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width =canvas.width;const height=canvas.height;
let leftkey=rightkey=false;
document.getElementById("space-board").style.display="none";//to make the game invisible at first
document.querySelector(".game-start").style.display = "none";
document.getElementById('bye-message').style.display = 'none';
document.getElementById('score-div').style.display = "none";





document.getElementById('start-button').onclick = () => {
  document.getElementById("space-board").style.display="block";// to make the board appear
  document.querySelector(".game-intro").style.display = "none";
  document.querySelector(".game-start").style.display = "block";
  document.getElementById('score-div').style.display = "block";
  canvas.focus();
    startGame();
  };

  document.getElementById("restart-button").onclick = () => {
    restartGame();   
}


let currentGame;

  //Sounds
  const shootSound = new Audio ()
  shootSound.src = "../Sounds/sounds_Shoot.mp3";

  const gameIntroSound = new Audio ()
  gameIntroSound.src = "../Sounds/sounds_intro.mp3";

  const gameOverSound = new Audio;
  gameOverSound.src = "../Sounds/sounds_gameover.mp3"

   //Bullet impact
   function bulletHit(alien, bullet) {
    if (bullet && alien){
      return !(bullet.x > alien.x + alien.width ||
        bullet.x < alien.x ||
        bullet.y > alien.y + alien.height ||
        bullet.y + bullet.height < alien.y)
    }
    
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
    console.log("works")
  }


  function restartGame() {
  console.log('restarting the game');
   this.player = {};
   this.bullets = [];
   this.satellites = [];
   this.aliens = [];
   document.getElementById("score").innerHTML = 0;
   context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
   currentGame = new Game();
   currentGame.player = new Player();
   currentGame.player.drawPlayer();
   const bullet = new Bullet();
  }

   
   


function gameOver() {
    gameOverSound.play();
    document.getElementById('game-over-score').innerHTML = `FINAL SCORE: ${currentGame.score}`;
    document.querySelector(".game-start").style.display = "none";
    document.getElementById('score-div').style.display = "none";
    document.getElementById('bye-message').style.display = 'block';
  } 


  // Satellites
  function drawSatellite() {
    currentGame.satellitesFrequency++;
    if (currentGame.satellitesFrequency % 400 === 1) {
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

      //Satellite collision
      function detectCollision(satellite) {
        return !(
          currentGame.player.moveLeft() > satellite.right() ||
          currentGame.player.moveRight() < satellite.left() ||
          currentGame.player.moveTop() > satellite.bottom()
        );
      }

      if (detectCollision(satellite)) {
        console.log(currentGame.player);
        console.log(satellite);
        currentGame.gameOver = true;
        currentGame.satellitesFrequency = 0;
        currentGame.score = 0;
        currentGame.satellites = [];
        //document.getElementById("score").innerText = 0;
        document.getElementById("space-board").style.display = "none";
        cancelAnimationFrame(currentGame.animationId);
        alert("Ouch! You crashed on a satellite!");
        gameOver();
      }

      if (satellite.y > canvas.clientHeight) {
        currentGame.satellites.splice(index, 1);
      }
    });

  }
  // Aliens
  function drawAlien() {
    currentGame.aliensFrequency++;
    if (currentGame.aliensFrequency % 200 === 1) {
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
      function detectCollision(alien) {
        return !(
          currentGame.player.moveLeft() > alien.right() ||
          currentGame.player.moveRight() < alien.left() ||
          currentGame.player.moveTop() > alien.bottom()
        );
      }

      if (detectCollision(alien)) {
        console.log(alien);
        console.log(currentGame.player);
        currentGame.gameOver = true;
        currentGame.aliensFrequency = 0;
        //currentGame.score = 0;
        currentGame.aliens = [];
        //document.getElementById("score").innerText = 0;
        document.getElementById("space-board").style.display = "none";
        cancelAnimationFrame(currentGame.animationId);
        alert("Damn! They got you first!");
        gameOver()
      }


      if (alien.y > canvas.clientHeight) {
        currentGame.aliens.splice(index, 1);
      }

      //Alien invading Earth (passing the player)
      
      
      /* function invasionAlien(alien) {
        if (alien[j].bottom = canvas.clientHeight) {
          cancelAnimationFrame(currentGame.animationId);
          alert("Aliens managed to invade us!");
        }
      }

      invasionAlien(); */

      
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



    for (let j = 0; j < currentGame.aliens.length; j++){
      for (let k = 0; k < currentGame.bullets.length; k++) {
        
          if (bulletHit(currentGame.aliens[j],currentGame.bullets[k])){
              currentGame.aliens.splice(j,1);
              currentGame.bullets.splice(k,1);
              currentGame.score++;
              document.getElementById('score').innerHTML = currentGame.score;
              //explosionSound.play();
          }
        }    
      }

    for (let j = 0; j < currentGame.satellites.length; j++){
      for (let k = 0; k < currentGame.bullets.length; k++) {
        
          if (bulletHit(currentGame.satellites[j],currentGame.bullets[k])){
              currentGame.satellites.splice(j,1);
              currentGame.bullets.splice(k,1);
              
          }
        }    
      }
   




    if (currentGame.gameOver === false) {
      currentGame.animationId = requestAnimationFrame(updateCanvas);
    }


  }






function shooting () {
  currentGame.bullets.push(new Bullet(currentGame.player.x , currentGame.player.y));
    shootSound.play();
    
}



const incrementTimer = setInterval(shooting, 1000);

 setInterval(() => {
  clearInterval(incrementTimer);
}, 1000)
  


document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32){
    shooting()
  }
    currentGame.player.movePlayer(e.key);
  }
)


