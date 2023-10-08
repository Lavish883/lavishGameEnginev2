var player;
var floor1;
var ball;
var rectangle1;
var playerImage;

function preload() {
    playerImage = loadImage("/imgs/player (1).png");
}

function setup() {
    //rectMode(CENTER);
    createCanvas(400, 400);
    console.log("lavishGE v0.1.0");
    //console.log(playerImage);
    lavishGE.amountOfLayers = 3;
    player = new lavishGE.Sprite(0, 100, 50, 50);
    player.scale = 3;
    player.colliderHeight = 32;
    player.colliderWidth = 32;
    player.bouncieness = 0;
    player.debug = true;
    player.img = playerImage;
    player.jumped = false;
    player.img = "/imgs/player (1).png";
    player.addAnis({
        "idle": {
            "frameCount": 11,
            "widthInImage": 50,
            "heightInImage": 50,
            "startX": 0,
            "startY": 0,
            "frameDelay": 6,
            "onChangeFrame": function () {
                if (this.currentFrame > 4){
                    //this.colliderWidth = 30;
                } else {
                    //this.width = 50;
                }
                //console.log(this.currentFrame);
            }
        }
    }, "/imgs/attack.png", "idle")
    floor1 = new lavishGE.Sprite(0, 350, 400, 20, "rectangle", "static");
    floor1.debug = true;
    //ball = new lavishGE.Sprite(100, 20, 50, 50, "circle", "dynamic");
    //ball.bouncieness = 0.9;
    //ball.scale = 2;
    //ball.debug = true;
    noSmooth();
    rectangle1 = new lavishGE.Sprite(200, 200, 50, 50, "rectangle", "dynamic");
}

function draw() {
    background(220);
    lavishGE.draw();
    rect(1, 1, 100, 50);

    if (lavishGE.Keyboard.isKeyDown("D")) {
        console.log("D is down");
        player.flipX = false;
        player.velocityX = 2;
    } else if (lavishGE.Keyboard.isKeyDown("A")) {
        console.log("A is down");
        player.flipX = true;
        player.velocityX = -2;
    } else {
        player.velocityX = 0;
    }

    if (lavishGE.Keyboard.isKeyDown("W") && player.jumped == false) {
        console.log("W is down");
        player.jumped = true;
        player.velocityY = -5;
    }

    if (player.velocityY >= 0 && player.velocityY < 0.0001) {
        player.jumped = false;
    }
}