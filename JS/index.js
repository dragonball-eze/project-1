const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.getElementById("space-board").style.display="none";//to make the game invisible at first


  document.getElementById('start-button').onclick = () => {
    document.getElementById("space-board").style.display="block";// to make the board appear
    startGame();
  };

  let currentGame;

  function startGame() {
    currentGame = new Game();
    currentGame.player = new Player();
    currentGame.player.drawPlayer();
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
    drawSatellite();
    drawAlien();
    if (currentGame.gameOver === false) {
      currentGame.animationId = requestAnimationFrame(updateCanvas);
    }
  }

  document.addEventListener("keydown", (e) => {
    currentGame.player.movePlayer(e.key);
  })

