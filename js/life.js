let imgLife = new Image(20, 20)
imgLife.src = "image/tim.png";
class Life {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
    }

    drawLife() {
        myGame.context.drawImage(imgLife, this.x, this.y, this.width, this.height);
    }
}