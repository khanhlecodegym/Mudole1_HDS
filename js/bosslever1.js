let imgBossLever1 = new Image(25, 50);
imgBossLever1.src = "image/ball.png";

class Ball {
    constructor(width, height, speed, heartBall) {
        this.context = myGame.context;
        this.x = Math.random() * 350;
        this.y = -100;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.heartBall = heartBall;
    }

    drawBall() {
        this.context.drawImage(imgBossLever1, this.x, this.y, this.width, this.height);
    }

    ballMove() {
        this.y += this.speed;
        if (this.y > 600) {
            this.y = -10;
            this.x = Math.random() * 800;
        }
    }
}