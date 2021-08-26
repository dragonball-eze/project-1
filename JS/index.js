const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let frequencyMod;
let highScoreValue = 0;
let changeLevel = false;
let right;
let highScore = document.querySelector("#high-score");
highScore.innerText = highScoreValue;

document.getElementById("space-board").style.display = "none"; //to make the game invisible at first
document.querySelector(".game-start").style.display = "none";
document.getElementById("bye-message").style.display = "none";
document.getElementById("score-div").style.display = "none";
document.getElementById("messages").style.display = "none";

document.getElementById("start-button").onclick = () => {
  document.getElementById("space-board").style.display = "block"; // to make the board appear
  document.querySelector(".game-intro").style.display = "none";
  document.querySelector(".game-start").style.display = "block";
  document.getElementById("score-div").style.display = "block";
  canvas.focus();
  startGame();
};

document.getElementById("restart-button-game-over").onclick = () => {
  document.getElementById("bye-message").style.display = "none";
  document.getElementById("space-board").style.display = "block";
  document.querySelector(".game-start").style.display = "block";
  document.getElementById("score-div").style.display = "block";
  startGame();
};
document.getElementById("restart-button").onclick = () => {
  restartTheGame();
};

let currentGame;

//Sounds
const shootSound = new Audio();
shootSound.src = "../Sounds/sounds_Shoot.mp3";

const gameIntroSound = new Audio();
gameIntroSound.src = "../Sounds/sounds_intro.mp3";

const gameOverSound = new Audio();
gameOverSound.src = "../Sounds/sounds_gameover.mp3";

const levelUpSound = new Audio();
levelUpSound.src = "../sounds/sounds_levelUp.mp3";

const explosionSound = new Audio();
explosionSound.src = "../sounds/sounds_siclone_explosion.wav";

//Bullet impact
function bulletHit(alien, bullet) {
  if (bullet && alien) {
    return !(
      bullet.x > alien.x + alien.width ||
      bullet.x < alien.x ||
      bullet.y > alien.y + alien.height ||
      bullet.y + bullet.height < alien.y
    );
  }
}

function startGame() {
  gameIntroSound.play();
  currentGame = new Game();
  currentGame.boss = new Boss();
  currentGame.player = new Player();
  currentGame.player.drawPlayer();
  const bullet = new Bullet();
  bullet.drawBullet();
  cancelAnimationFrame(currentGame.animationId);
  updateCanvas();
  document.getElementById("score").innerHTML = currentGame.score;
  console.log("works");
}

function restartTheGame() {
  this.player = {};
  this.bullets = [];
  this.satellites = [];
  this.aliens = [];
  this.shots = [];
  this.score = 0;
  document.getElementById("score").innerHTML = 0;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  currentGame = new Game();
  currentGame.player = new Player();
  currentGame.player.drawPlayer();
  const bullet = new Bullet();
}

function gameOver() {
  gameOverSound.play();
  document.getElementById(
    "game-over-score"
  ).innerHTML = `FINAL SCORE: ${currentGame.score}`;
  document.querySelector(".game-start").style.display = "none";
  document.getElementById("score-div").style.display = "none";
  document.getElementById("bye-message").style.display = "block";
  cancelAnimationFrame(currentGame.animationId);
  checkHighScore();
}

// Satellites
function drawSatellite() {
  currentGame.satellitesFrequency++;
  if (currentGame.satellitesFrequency % frequencyMod === 1) {
    const randomSatelliteX = Math.floor(Math.random() * 450);
    const randomSatelliteY = 0;

    const newSatellite = new Obstacle(randomSatelliteX, randomSatelliteY);

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
        currentGame.player.moveTop() > satellite.bottom() ||
        currentGame.player.moveDown() < satellite.top()
      );
    }

    if (detectCollision(satellite)) {
      gameOver();
      currentGame.gameOver = true;
      currentGame.satellitesFrequency = 0;
      currentGame.satellites = [];
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
  if (currentGame.aliensFrequency % (frequencyMod - 200) === 1) {
    const randomAlienX = Math.floor(Math.random() * 450);
    const randomAlienY = 0;

    const newAlien = new Alien(randomAlienX, randomAlienY);

    currentGame.aliens.push(newAlien);
  }

  currentGame.aliens.forEach((alien, index) => {
    if (!currentGame.gameOver) {
      alien.y += 1;
    } else {
      alien.y += 0;
    }
    alien.draw();

    //Alien collision
    function detectCollision(alien) {
      return !(
        currentGame.player.moveLeft() > alien.right() ||
        currentGame.player.moveRight() < alien.left() ||
        currentGame.player.moveTop() > alien.bottom() ||
        currentGame.player.moveDown() < alien.top()
      );
    }

    if (alien.y > canvas.clientHeight && currentGame.gameOver === false) {
      currentGame.aliens.splice(index, 1);
      currentGame.gameOver = true;
      currentGame.aliensFrequency = 0;
      currentGame.aliens = [];
      document.getElementById("space-board").style.display = "none";
      cancelAnimationFrame(currentGame.animationId);
      alert("Mission failed: an alien is invading Earth... So long!");
      gameOver();
    }

    if (detectCollision(alien)) {
      currentGame.gameOver = true;
      currentGame.aliensFrequency = 0;
      currentGame.aliens = [];
      document.getElementById("space-board").style.display = "none";
      cancelAnimationFrame(currentGame.animationId);
      alert("Damn! They got you first!");
      gameOver();
    }
  });
}

function brah() {
  for (let j = 0; j < currentGame.aliens.length; j++) {
    for (let k = 0; k < currentGame.bullets.length; k++) {
      if (bulletHit(currentGame.aliens[j], currentGame.bullets[k])) {
        currentGame.aliens.splice(j, 1);
        currentGame.bullets.splice(k, 1);
        currentGame.score++;
        document.getElementById("score").innerHTML = currentGame.score;
      }
    }
  }

  for (let j = 0; j < currentGame.satellites.length; j++) {
    for (let k = 0; k < currentGame.bullets.length; k++) {
      if (bulletHit(currentGame.satellites[j], currentGame.bullets[k])) {
        currentGame.satellites.splice(j, 1);
        currentGame.bullets.splice(k, 1);
        explosionSound.play();
      }
    }
  }

  for (let k = 0; k < currentGame.bullets.length; k++) {
    if (bulletHit(currentGame.boss, currentGame.bullets[k])) {
      /* currentGame.score += 5; */
      currentGame.boss.health -= 1;
      currentGame.bullets.splice(k, 1);
    }
  }
}

function updateCanvas() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  currentGame.player.drawPlayer();
  changeLevels();
  //currentGame.boss.draw();
  //drawBullets();
  currentGame.bullets.forEach((bullet) => {
    bullet.y -= 3;
    bullet.drawBullet();
  });

  drawSatellite();
  drawAlien();
  brah();
  bossShots();

  if (currentGame.gameOver === false) {
    currentGame.animationId = requestAnimationFrame(updateCanvas);
  }
}

function shooting() {
  currentGame.bullets.push(
    new Bullet(currentGame.player.x, currentGame.player.y)
  );
  shootSound.play();
}

//intervalforshotsattempt

const incrementTimer = setInterval(shooting, 1000);

setInterval(() => {
  clearInterval(incrementTimer);
}, 1000);

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    shooting();
  }
  currentGame.player.movePlayer(e.key);
});

// function clearMessages () {
//   document.getElementById('messages').style.display = 'none';
// }

function changeLevels() {
  /* console.log(currentGame.bossStage); */
  document.getElementById("messages").style.display = "none";

  if (
    (currentGame.score >= 5 && currentGame.score < 6) ||
    (currentGame.score >= 10 && currentGame.score < 11)
  ) {
    document.getElementById("messages").style.display = "block";
    levelUpSound.play();
  }

  if (currentGame.score < 1) {
    frequencyMod = 380;
    currentGame.level = 1;
  } else if (currentGame.score >= 1 && currentGame.score < 2) {
    frequencyMod = 320;
    currentGame.level = 2;
  } else if (currentGame.score >= 2 && currentGame.score < 3) {
    frequencyMod = 300;
    currentGame.level = 3;
  } else {
    //document.getElementById('messages').style.display = 'block';
    //setTimeout(clearMessages, 5000);
    //levelUpSound.play()
    currentGame.bossStage = true;
    currentGame.boss.move();
    currentGame.boss.draw();
    frequencyMod = Infinity;
  }
}

function bossShots() {
  if (currentGame.bossStage === true) {
    if (currentGame.aliensFrequency % 75 === 1) {
      const newBossShot = new BossShot(
        currentGame.boss.x + 45,
        currentGame.boss.y + currentGame.boss.height,
        10,
        8
      );
      currentGame.bossShots.push(newBossShot);
    }

    currentGame.bossShots.forEach((shot, index) => {
      shot.y += 1;
      shot.draw();
      // COLLISION COINS -- ASTRONAUTS

      function detectCollision(shot) {
        return !(
          currentGame.player.moveLeft() > shot.right() - 25 ||
          currentGame.player.moveRight() < shot.left() ||
          currentGame.player.moveTop() > shot.bottom() - 25 ||
          currentGame.player.moveDown() < shot.top()
        );
      }

      if (shot.y > canvas.clientHeight) {
        console.log("splicing");
        currentGame.bossShots.splice(index, 1);
      }

      if (detectCollision(shot)) {
        currentGame.gameOver = true;

        document.getElementById("space-board").style.display = "none";
        cancelAnimationFrame(currentGame.animationId);
        alert("Mission Failed: the Boss gotcha!");
        gameOver();
      }
      //////////////////////////////////
    });
  }
}

/* //Boss shot impact
function bossShotHit(player, shot) {
  if (shot && player) {
    return !(
      shot.x > player.x + player.width ||
      shot.x < player.x ||
      shot.y > player.y + player.height ||
      shot.y + shot.height < player.y
    );
  }
}

//boss shot collision
function detectCollision(shot) {
  return !(
    currentGame.player.moveLeft() > shot.right() ||
    currentGame.player.moveRight() < shot.left() ||
    currentGame.player.moveTop() > shot.bottom() ||
    currentGame.player.moveDown() < shot.top()
  );
} */

function checkHighScore() {
  if (currentGame.score > highScoreValue) {
    highcoreValue = currentGame.score;
    highScore.innerText = highScoreValue;
  }
}

/* if (detectCollision(shot)) {
  gameOver();
  currentGame.gameOver = true;
  currentGame.shotsFrequency = 0;
  currentGame.shots = [];
  document.getElementById("space-board").style.display = "none";
  cancelAnimationFrame(currentGame.animationId);
  alert("Mission Failed: the Boss gotcha!");

  if (shot.y > player.y) {
    currentGame.shots.splice(index, 1);

    for (let k = 0; k < currentGame.shots.length; k++) {
      if (bossShotHit(currentGame.shots[k])) {
        currentGame.shots.splice(k, 1);
      }
    }
  }
}
 */
