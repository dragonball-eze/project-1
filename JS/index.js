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
    if (currentGame.gameOver === false) {
      currentGame.animationId = requestAnimationFrame(updateCanvas);
    }
  }

  document.addEventListener("keydown", (e) => {
    currentGame.player.movePlayer(e.key);
  })

