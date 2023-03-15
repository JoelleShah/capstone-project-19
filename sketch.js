var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic, sonic_running, sonic_angry;
var ground, invisibleGround, groundImage;

var background

var motoBug

var score;
var gameOverImg, restartImg

function preload() {
    sonic_running = loadAnimation("0000.png", "0001.png", "0002.png", "0003.png", "0004.png", "0005.png", "0006.png", "0007.png", "0008.png", "0009.png", "0010.png", "0011.png", "0012.png", "0013.png", "0014.png", "0015.png");

    groundImage = loadImage("sonicground1.jpg");

    sonic_angry = loadAnimation("sonicAngry.png");

    background = loadImage("sonicground.jpg")

    motoBug = loadImage("MotoBug.webp");

    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")

}

function setup() {
    createCanvas(600, 200);

    background=createSprite(width/2,200);
    background.addImage(sonicground.jpg);
    background.velocityX = 4;

    var message = "This is a message";
    console.log(message)

    sonic = createSprite(50, 160, 20, 50);
    sonic.addAnimation("running", sonic_running);
    sonic.scale = 0.5;

    ground = createSprite(200, 180, 400, 20);
    ground.addImage("ground", sonicground1.jpg);
    ground.x = ground.width / 2;

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImg);



    gameOver.scale = 0.5;
    restart.scale = 0.5;

    invisibleGround = createSprite(200, 190, 400, 10);
    invisibleGround.visible = false;

}

function draw() {

    background(180);
    
    text("Score: " + score, 500, 50);


    if (gameState === PLAY) {

        gameOver.visible = false;
        restart.visible = false;

        sonic.changeAnimation("running")

        ground.velocityX = -(4 + 3 * score / 100)

        score = score + Math.round(getFrameRate() / 60);

        if (score > 0 && score % 100 === 0) {
            checkPointSound.play()
        }

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }


        if (keyDown("space") && sonic.y >= 100) {
            sonic.velocityY = -12;
            jumpSound.play();
        }

        sonic.velocityY = sonic.velocityY + 0.8

        spawnMotoBug();

    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
    
        
        sonic.changeAnimation("collided", sonic_angry);
    
    
    
        ground.velocityX = 0;
        sonic.velocityY = 0
    
    
    
        motoBugGroup.setLifetimeEach(-1);
    
        motoBugGroup.setVelocityXEach(0);
        if (mousePressedOver(restart)) {
            reset();
        }
    }
}
   



sonic.collide(invisibleGround);




drawSprites();


function reset() {
    score = 0
    gameState = PLAY
    motoBugGroup.destroyEach()
}


function spawnMotoBug() {
    if (frameCount % 60 === 0) {
        var motoBug = createSprite(600, 165, 10, 40);
        motoBug.velocityX = -(6 + score / 100);

        motoBug.scale = 0.5;
        motoBug.lifetime = 300;

        motoBugGroup.add(motoBug);
    }
}



