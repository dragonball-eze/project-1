class Obstacle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = 75;
      this.height = 100;
    }
  
    draw() {
      const satellite = new Image();
      satellite.src = "./images/satellites.png";
      context.drawImage(satellite, this.x, this.y, this.width, this.height);
      // context.strokeStyle = "yellow";
      // context.strokeRect(this.x, this.y, this.width, this.height);
    }
  
    top() {
      return this.y;
    }
  
    bottom() {
      return this.y + this.height;
    }
  
    left() {
      return this.x;
    }
  
    right() {
      return this.x + this.width;
    }
  }