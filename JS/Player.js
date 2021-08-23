class Player {
  constructor() {
     this.x = 225;
     this.y = 550;
     this.width = 50;
     this.height = 50;
     this.speedX = 0;
     this.speedY = 0;
  }

  drawPlayer(){
      const player = new Image();
      player.src = "./images/astronaut.png";
      context.drawImage(player, this.x, this.y, this.width, this.height);
  }

    movePlayer(arrowKeys) {
      context.clearRect(this.x, this.y, this.width, this.height);
      switch (arrowKeys) {
        case "ArrowLeft":
          if (this.x > this.width) {
            this.x -= 10;
          }
          break;

        case "ArrowRight":
          if (this.x < canvas.clientWidth - this.width) {
            this.x += 10;
          }
          break;

        case "ArrowDown":
          if (this.y < canvas.clientHeight - this.height) {
            this.y += 10;
          } 
          break;

        case "ArrowUp":
          if (this.y > 0) {
            this.y -= 10;

          }
          
          break;
      }
    }

    moveLeft() {
      return this.x;
    }

    moveRight() {
      return this.x + this.width;
   }

    moveTop() {
      return this.y;
   }

    moveDown() {
      return this.y + this.height;
    }
  }



 
