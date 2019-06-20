let imgPlane = new Image(50, 50);
imgPlane.src = "image/plane0.png"


class Plane {
    constructor(x, y, img, context) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.context = context;
        this.status = true;
        this.img = img;
        this.id = 0;
    }

    drawPlane() {
        this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}