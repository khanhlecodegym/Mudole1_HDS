let timeImg = new Image(50, 50);
timeImg.src = 'image/time.png';
let scoreImg = new Image(50, 50);
scoreImg.src = 'image/score.png'

class Text {
    constructor(context) {
        this.context = context;
        this.minute = 0;
        this.seconds = 0;
        this.fuel = 100;
    }

    drawTime() {
        if (this.seconds > 59) {
            this.minute++;
            this.seconds = 0;
        }
        // time
        this.context.drawImage(timeImg, 5, 5, 20, 20);
        this.context.font = "15px Arial";
        this.context.fillStyle = "White";
        this.context.fillText(this.minute + " : " + this.seconds, 35, 20);
    }

    drawFuel() {
        this.context.drawImage(fuelImg, 110, 5, 20, 20);
        this.context.fillText(this.fuel, 140, 20);
    }

    drawScore(score) {
        // score
        this.context.drawImage(scoreImg, 200, 5, 20, 20);
        this.context.fillText(score, 230, 22);
    }
}