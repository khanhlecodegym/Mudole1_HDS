const KEYLEFT = 37;
const KEYRIGHT = 39;
// bullet
let arrBullet = [];
let numberBullet = 1;
//ball
let arrBall = [];
let widthBall = 25;
let heightBall = 50;
let speedBall = 2;
let heartBall = 1;
let numberBall = 3;
// gift
let arrCartridge = [];
let arrFuel = [];
let arrHeart = [];
// đếm số hoạt ảnh
let countTime = 0;
//audio
let soundShootTrue = new Audio("audio/soundshoottrue.mp3");
let soundgameOver = new Audio("audio/soundgameover.mp3");
let soundLever1 = new Audio("audio/lever1.mp3");
let soundPlaneDeath = new Audio("audio/soundplanedeath.mp3");
let soundCartridge = new Audio("audio/cartridge.mp3");
let sonudClickMouse = new Audio("audio/mouseclick.wav");
let sonudStart = new Audio("audio/start.wav");
let soundSelectPlane = new Audio("audio/selectPlane.wav");
let soundClickStart = new Audio("audio/clickstart.wav");

// let intervalDrawmyGame;
let score = 0;
let arrLife = [];
// thời gian máy bay chết
let timePlaneDeath = 0;
// New Life
for (let i = 0; i < 5; i++) {
    arrLife[i] = new Life(375 - i * 25, 5);
}

// Imafe start
let imgStart = new Image(50, 50);
imgStart.src = 'image/start.png';
let imgButtonLeft = new Image(50, 50);
imgButtonLeft.src = 'image/button_left.png';
let imgButtonRight = new Image(50, 50);
imgButtonRight.src = 'image/button_right.png';

// new start
class Button {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
    }
    draw() {
        myGame.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
let startBtn = new Button(100, 150, 200, 170, imgStart);
let buttonLeft = new Button(70, 420, 40, 40, imgButtonLeft);
let buttonRight = new Button(280, 420, 40, 40, imgButtonRight);
let srcPlane = ['image/plane0.png', 'image/plane1.png', 'image/plane2.png', 'image/plane3.png', 'image/plane4.png', 'image/plane5.png'];
let indexPlane = 1;


function firstMyGame() {
    startBtn.draw();
    buttonLeft.draw();
    buttonRight.draw();
    myGame.planeCopy.drawPlane();
    myGame.context.font = "15px Arial";
    myGame.context.fillStyle = "White";
    myGame.context.fillText("Copyright by @2019 Hồ Đăng San", 85, 550);
    myGame.context.fillText("15thxd.hodangsan@gmail.com", 95, 580);
    myGame.canvas.addEventListener('mousemove', function(e) {
        myGame.plane.x = e.clientX - myGame.canvas.offsetLeft - myGame.plane.width / 2;
        myGame.plane.y = e.clientY - myGame.canvas.offsetTop - myGame.plane.height / 2;
    }, true);
}

let countClickInGame = true;
let cursorX;
let cursorY;

function cursorClick(e) {
    if (countClickInGame) {
        sonudClickMouse.load();
        sonudClickMouse.play();
    }

    let cursorX = e.clientX - myGame.canvas.offsetLeft;
    let cursorY = e.clientY - myGame.canvas.offsetTop;
    // Click Vào Play
    let isCursorClickPlay = cursorX >= startBtn.x && cursorX <= startBtn.x + startBtn.width &&
        cursorY >= startBtn.y && cursorY <= startBtn.y + startBtn.height;
    if (isCursorClickPlay) {
        countClickInGame = false;
        myGame.canvas.style.cursor = "none";
        soundClickStart.load();
        soundClickStart.play();
        sonudStart.load();
        sonudStart.play();
        myGame.plane.width = 50;
        myGame.plane.height = 50;
        clearInterval(myGame.intervalFirstStartGame);
        myGame.intervalDrawMyGame = setInterval(updatemyGame, 50);
    }
    // Click Vào nút chuyển sang trái
    let isCursorClickLeft = cursorX >= buttonLeft.x && cursorX <= buttonLeft.x + buttonLeft.width &&
        cursorY >= buttonLeft.y && cursorY <= buttonLeft.y + buttonLeft.height;
    if (isCursorClickLeft) {
        if (myGame.planeCopy.id > 0) {
            myGame.context.clearRect(PLANECOPYX, PLANECOPYY, myGame.planeCopy.width, myGame.planeCopy.height);
            imgPlane.src = srcPlane[--myGame.planeCopy.id];
            soundSelectPlane.load();
            soundSelectPlane.play();
        }
    }
    // Click vào nút chuyển bên phải
    let isCursorClickRight = cursorX >= buttonRight.x && cursorX <= buttonRight.x + buttonRight.width &&
        cursorY >= buttonRight.y && cursorY <= buttonRight.y + buttonRight.height
    if (isCursorClickRight) {
        if (myGame.planeCopy.id < 5) {
            myGame.context.clearRect(PLANECOPYX, PLANECOPYY, myGame.planeCopy.width, myGame.planeCopy.height);
            imgPlane.src = srcPlane[++myGame.planeCopy.id];
            soundSelectPlane.load();
            soundSelectPlane.play();
        }
    }
}

function updatemyGame() {
    myGame.clear();
    countTime++;
    stuffAvailable();
    updateLever1();
    lastGame();
}

function stuffAvailable() {
    // vẽ máy bay
    if (myGame.plane.status)
        myGame.plane.drawPlane();
    else {
        if (countTime % 5 === 0) {
            myGame.plane.drawPlane();
            timePlaneDeath++;
        }
        if (timePlaneDeath > 6) {
            myGame.plane.status = true;
            timePlaneDeath = 0;
        }
    }

    // Xử lý đạn
    if (countTime % 4 === 0) {
        if (numberBullet === 1) arrBullet.push(new Bullet(myGame.plane.x + 24, myGame.plane.y));
        else if (numberBullet === 2) {
            arrBullet.push(new Bullet(myGame.plane.x + 14, myGame.plane.y));
            arrBullet.push(new Bullet(myGame.plane.x + 34, myGame.plane.y));
        } else if (numberBullet === 3) {
            arrBullet.push(new Bullet(myGame.plane.x + 14, myGame.plane.y));
            arrBullet.push(new Bullet(myGame.plane.x + 24, myGame.plane.y));
            arrBullet.push(new Bullet(myGame.plane.x + 34, myGame.plane.y));
        }
    }
    // đạn di chuyển và vẽ ra
    for (let i = 0; i < arrBullet.length; i++) {
        arrBullet[i].bulletMove();
        arrBullet[i].drawBullet();
        if (arrBullet[i].y < 0) {
            arrBullet[i] = arrBullet[arrBullet.length - 1];
            arrBullet.pop();
        }
    }
    // Sinh ra vũ khí
    if (countTime % 400 === 0) {
        arrCartridge.push(new Cartridge());
    }
    for (let i = 0; i < arrCartridge.length; i++) {
        arrCartridge[i].cartridgeMove();
        arrCartridge[i].drawCartridge();
        if (arrCartridge[i].y > (myGame.canvas.height + arrCartridge[i].height)) {
            arrCartridge[i] = arrCartridge[arrCartridge.length - 1];
            arrCartridge.pop();
        } else {
            let isCartridgeTouchPlane = (myGame.plane.x + myGame.plane.width) >= arrCartridge[i].x && myGame.plane.x <= (arrCartridge[i].x + arrCartridge[i].width) &&
                (myGame.plane.y + myGame.plane.height) >= arrCartridge[i].y && myGame.plane.y <= (arrCartridge[i].y + arrCartridge[i].height);
            if (isCartridgeTouchPlane) {
                if (numberBullet < 3) numberBullet++;
                arrCartridge[i] = arrCartridge[arrCartridge.length - 1];
                arrCartridge.pop();
                soundCartridge.volume = .9;
                soundCartridge.play();
            }
        }

    }
    //  Sinh ra nhiên liệu mỗi 15s
    if (countTime % 300 === 0) {
        arrFuel.push(new Fuel());
    }
    for (let i = 0; i < arrFuel.length; i++) {
        arrFuel[i].fuelMove();
        arrFuel[i].drawFuel();
        if (arrFuel[i].y > (myGame.canvas.height + arrFuel[i].height)) {
            arrFuel[i] = arrFuel[arrFuel.length - 1];
            arrFuel.pop();
        } else {
            let isFuelTouchPlane = (myGame.plane.x + myGame.plane.width) >= arrFuel[i].x && myGame.plane.x <= (arrFuel[i].x + arrFuel[i].width) &&
                (myGame.plane.y + myGame.plane.height) >= arrFuel[i].y && myGame.plane.y <= (arrFuel[i].y + arrFuel[i].height);
            if (isFuelTouchPlane) {
                myGame.text.fuel += arrFuel[i].value;
                myGame.text.fuel = (myGame.text.fuel > 100) ? 100 : myGame.text.fuel;
                arrFuel[i] = arrFuel[arrFuel.length - 1];
                arrFuel.pop();
            }
        }
    }
    // Sinh heart mỗi 60s
    if (countTime % 1200 === 0) {
        arrHeart.push(new Heart());
    }
    for (let i = 0; i < arrHeart.length; i++) {
        arrHeart[i].heartMove();
        arrHeart[i].drawHeart();
        let isHeartTouchPlane = (myGame.plane.x + myGame.plane.width) >= arrHeart[i].x && myGame.plane.x <= (arrHeart[i].x + arrHeart[i].width) &&
            (myGame.plane.y + myGame.plane.height) >= arrHeart[i].y && myGame.plane.y <= (arrHeart[i].y + arrHeart[i].height);
        if (isHeartTouchPlane) {
            if (arrLife.length < 5) arrLife[arrLife.length] = new Life(375 - arrLife.length * 25, 5);
            arrHeart[i] = arrHeart[arrHeart.length - 1];
            arrHeart.pop();
        } else
        if (arrHeart[i].y > (myGame.canvas.height + arrHeart[i].height)) {
            arrHeart[i] = arrHeart[arrHeart.length - 1];
            arrHeart.pop();
        }
    }
}


function updateLever1() {
    // Audio lever 1
    soundLever1.volume = .1;
    soundLever1.play();

    //Xử lý Bóng
    // bóng di chuyển và vẽ bóng
    for (let i = 0; i < arrBall.length; i++) {
        arrBall[i].ballMove();
        arrBall[i].drawBall();
    }
    // cứ sau 1s sẽ tạo ra lượt bóng
    if (countTime % 20 === 0) {
        arrBall.push(new Ball(widthBall, heightBall, speedBall, heartBall));
    }
    // sau 30s bóng sẽ to hơn nhiều hơn
    if (countTime === 600) {
        widthBall *= 1.5;
        heightBall *= 1.5;
        heartBall += 1;
        numberBall += 3;
    }
    // sau 3 phút nhiều bóng hơn nữa
    if (countTime === 3600) {
        numberBall += 2;
    }
    // sau 5p là max nhiều luôn
    if (countTime === 3600) {
        numberBall += 2;
    }
    // sau 20s bóng sẽ di chuyển nhanh hơn
    if (countTime % 400 === 0)
        speedBall += 1;
    // bóng nổ xóa phần tử bóng, xóa đạn và  máy bay chạm bóng sẽ mất một life
    for (let j = 0; j < arrBall.length; j++) {
        if (myGame.plane.status) {
            let isBallTouchPlane = (myGame.plane.x + myGame.plane.width) >= arrBall[j].x && myGame.plane.x <= (arrBall[j].x + arrBall[j].width) &&
                (myGame.plane.y + myGame.plane.height) >= arrBall[j].y && myGame.plane.y <= (arrBall[j].y + arrBall[j].height);
            if (isBallTouchPlane) {
                arrLife.pop();
                if (numberBullet > 1)
                    numberBullet--;
                soundPlaneDeath.volume = .5;
                soundPlaneDeath.play();
                myGame.plane.status = false;

            }
        }
        for (let i = 0; i < arrBullet.length; i++) {
            let isBulletTouchPlane = (arrBullet[i].x + arrBullet[i].width) >= arrBall[j].x && arrBullet[i].x <= (arrBall[j].x + arrBall[j].width) &&
                (arrBullet[i].y + arrBullet[i].height) >= arrBall[j].y && arrBullet[i].y <= (arrBall[j].y + arrBall[j].height);
            if (isBulletTouchPlane) {
                arrBullet[i] = arrBullet[arrBullet.length - 1];
                arrBullet.pop();
                arrBall[j].heartBall--;
                if (arrBall[j].heartBall === 0) {
                    arrBall[j] = arrBall[arrBall.length - 1];
                    arrBall.pop();
                    soundShootTrue.volume = .9;
                    soundShootTrue.load();
                    soundShootTrue.play();
                    score++;
                }
            }
        }
    }
}

function lastGame() {
    // sau 0,5s mất một nhiên liệu
    if (countTime % 10 === 0) {
        myGame.text.fuel--;
    }
    // Hết mạng gameOver
    if (arrLife.length === 0)
        myGame.stop();
    // Hết nhiên liệu GameOver
    if (myGame.text.fuel === 0) {
        myGame.stop();
    }
    myGame.text.drawFuel();
    // Xử lý text
    myGame.text.drawTime();
    // Tính thời gian chơi
    if (countTime % 20 === 0) {
        myGame.text.seconds++;
    }
    // Tính Score
    myGame.text.drawScore(score);
    // Xử lý Life
    for (let i = 0; i < arrLife.length; i++) {
        arrLife[i].drawLife();
    }
}

function gameOver() {
    myGame.context.font = "40px Comic Sans MS";
    myGame.context.fillStyle = "red";
    myGame.context.textAlign = "center";
    myGame.context.fillText("Game Over", myGame.canvas.width / 2, myGame.canvas.height / 2);

    myGame.context.font = "30px Comic Sans MS";
    myGame.context.fillStyle = "blue";
    myGame.context.fillText("Score: " + score, myGame.canvas.width / 2, myGame.canvas.height / 2 + 40);
    soundgameOver.volume = .9;
    soundgameOver.load();
    soundgameOver.play();
    soundLever1.pause();
}