const PLANEX = 545;
const PLANEY = 370;
const PLANECOPYX = 148;
const PLANECOPYY = 375;

class MyGame {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.plane = new Plane(PLANEX, PLANEY, imgPlane, this.context);
        this.planeCopy = new Plane(PLANECOPYX, PLANECOPYY, imgPlane, this.context);
        this.text = new Text(this.context);
        this.key;
        this.intervalDrawMyGame;
        this.intervalFirstStartGame;
    }

    init() {
        this.intervalFirstStartGame = setInterval(firstMyGame, 50);
        window.addEventListener('keydown', function(e) {
            this.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e) {
            this.key = false;
        })
        this.canvas.addEventListener('click', cursorClick, true);
        document.getElementById("again").onclick = function() {
            location.reload();
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        clearInterval(this.intervalDrawMyGame);
        this.clear();
        setTimeout(gameOver, 100);
    }
}