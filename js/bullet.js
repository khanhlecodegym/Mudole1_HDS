let imgBullet = new Image(10, 10);
imgBullet.src = "image/bullet.png";

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 7;
        this.context = myGame.context;
    }

    drawBullet() {
        this.context.drawImage(imgBullet, this.x, this.y, this.width, this.height);
    }

    bulletMove() {
        this.y -= 20;
    }
}