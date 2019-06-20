let fuelImg = new Image(50, 50);
fuelImg.src = "image/fuel.png";
class Cartridge {
    constructor() {
        this.x = Math.random() * 350;
        this.y = -100;
        this.width = 10;
        this.height = 30;
        this.speedX = 3;
        this.speedY = 3;
        this.context = myGame.context;
    }

    drawCartridge() {
        this.context.drawImage(imgBullet, this.x, this.y, this.width, this.height);
    }

    cartridgeMove() {
        if (this.x < -10 || (this.x + this.width) > 411) this.speedX = -this.speedX;
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

class Fuel {
    constructor() {
        this.x = Math.random() * 350;
        this.y = -100;
        this.width = 20;
        this.height = 30;
        this.speedX = -2;
        this.speedY = 6;
        this.context = myGame.context;
        this.value = 50;
    }
    drawFuel() {
        this.context.drawImage(fuelImg, this.x, this.y, this.width, this.height);
    }
    fuelMove() {
        if (this.x < -10 || (this.x + this.width) > 421) this.speedX = -this.speedX;
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

class Heart {
    constructor() {
        this.x = Math.random() * 350;
        this.y = -100;
        this.width = 30;
        this.height = 30;
        this.speedX = -2;
        this.speedY = 5;
        this.context = myGame.context;
    }
    drawHeart() {
        this.context.drawImage(imgLife, this.x, this.y, this.width, this.height);
    }
    heartMove() {
        if (this.x < -20 || (this.x + this.width) > 421) this.speedX = -this.speedX;
        this.x += this.speedX;
        this.y += this.speedY;
    }
}