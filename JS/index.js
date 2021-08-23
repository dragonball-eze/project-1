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

  function startGame() {
    currentGame = new Game();
    currentGame.player = new Player();
    currentGame.player.drawPlayer();
    cancelAnimationFrame(currentGame.animationId);
    updateCanvas();
  }

  function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    currentGame.player.drawPlayer();
    if (currentGame.gameOver === false) {
      currentGame.animationId = requestAnimationFrame(updateCanvas);}
  }


  function onKeyDown(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        leftkey=true;
    }
    //right
    if(keycode==39){
        rightkey=true;
    }

      //space
      if(keycode==32){
        game.shipShootMissile();
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
}

window.onload=function(){
    startGame();
    updateCanvas();
}