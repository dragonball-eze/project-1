const vel = 6;

class Player {
  constructor() {
     this.x = 225;
     this.y = 550;
     this.width = 60;
     this.height = 60;
     this.speedX = 0;
     this.speedY = 0;
     this.friction = 0.975;
  }

  drawPlayer(){
      const player = new Image();
      player.src = "./images/car.png";
      context.drawImage(player, this.x, this.y, this.width, this.height);
      //context.strokeStyle = "yellow";
      //context.strokeRect(this.x, this.y, this.width -5, this.height);
  }

 movePlayer(arrowKeys) {
      context.clearRect(this.x, this.y, this.width, this.height);
      
      switch (arrowKeys) {
        case "ArrowLeft":
          if (this.speedX > -vel) {
          this.speedX --
          }
          
          if (this.x > this.width) {
            this.x -= 5;
          }
          break;

        case "ArrowRight":

          if (this.speedX < vel ) {
          
            this.speedX++
          }  
          
          if (this.x < canvas.clientWidth - this.width) {
            this.x += 5;
          }
          break;

        case "ArrowDown":
          if (this.speedY < vel ) {
          
            this.speedY++
          }  
          if (this.y < canvas.clientHeight - this.height) {
            this.y += 10;
            if(this.y > 550){
              this.y === 550;
            }
          } 
          break;

        case "ArrowUp":
          if (this.speedY > -vel ) {
          
            this.speedY--
            
          } 
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



 
