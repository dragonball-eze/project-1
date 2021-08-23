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

