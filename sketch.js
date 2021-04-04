var highScore ;
var rocket;
var rocketImg,spaceImg,lazer1,lazer2;
var bg;
var rockimg1 , rockimg2, rockimg3;
var rockgroup, bulletgroup;
var score;
var gameState = "play";

var gunsound;

var gameover, reset,gameimg,resetimg;
var bullet1group;

function preload() {
  rocketImg = loadImage("images/rocket.png");
  spaceImg = loadImage("images/space.jpg");
  spaceImg2 = loadImage("images/space1.jpg");
  lazer1 = loadImage("images/lazer1.png");
  lazer2 = loadImage("images/lazer2.png");
  rockimg1 = loadImage("images/rock1.png")
  rockimg2 = loadImage("images/rock2.png")
  rockimg3 = loadImage("images/rock3.png")
  gameimg = loadImage("images/gameover.png")
  resetimg = loadImage("images/reset.png")
  ship1 = loadImage("images/alienship1.png");
  gunsound = loadSound("gun.mp3");
}

function setup() {
  createCanvas(1500,700);

  bg = createSprite(750,350)
  bg.addImage(spaceImg2);
  bg.scale = 1.7
  bg.velocityY = 2;
  bg.y = height/2 
  
  rocket = createSprite(750, 600, 50, 50);
  rocket.shapeColor = "blue";
  rocket.addImage(rocketImg)
  rocket.scale = 0.05

  rockgroup = new Group();
  bulletgroup = new Group();
  aliengroup = new Group();
  bullet1group = new Group();

  score = 0;
  highScore = 0;

  gameover = createSprite(750,250,50,50);
  gameover.addImage(gameimg);
  reset = createSprite(750,460,30,30);
  reset.addImage(resetimg);
  reset.scale = 0.5 
}

function draw() {
  background("lightgrey");  
  // fill("white")
  // textSize(30);
  // text('Highscore' + highScore,1300,50);
  if (score>highScore) {
    highScore = score;
  }

  if (gameState === "play") {
    
 
  if (bg.y > 500) {
    bg.y = height/2
  }

  if (keyDown("left")) {
    rocket.x -= 8
  }
  if (keyDown("right")) {
    rocket.x += 8
  }
  if (keyDown("space")) {
    gunsound.play();
    Shoot();
  }
  
  Rock();
  enemy();

  if (bulletgroup.isTouching(rockgroup)) {
    for (var i=0; i < rockgroup.length; i++ ) {
      var rockelement = rockgroup.get(i);
      if (rockelement.isTouching(bulletgroup)) {
        rockelement.destroy();
        bulletgroup.destroyEach();
        score += 10 ;
      }
    }
  }

  if (bulletgroup.isTouching(aliengroup)) {
    for (var i=0; i < aliengroup.length; i++ ) {
      var alienelment = aliengroup.get(i);
      if (alienelment.isTouching(bulletgroup)){
        alienelment.destroy();
        bulletgroup.destroyEach();
        score += 50;
      }
    }
  }

  


  if (rocket.isTouching(rockgroup) || rocket.isTouching(aliengroup) || bullet1group.isTouching(rocket)) {
    gameState = "end"; 
  }

  gameover.visible = false;
  reset.visible = false;
 
} else {
    gameEnd();
    if (mousePressedOver(reset)) {
      gameState = "play";
      score = 0;
      rocket.visible = true;
    }
}
  drawSprites();
  fill("white")
  textSize(30);
  text("Points: "+ score ,1300,100)

  fill("white")
  textSize(30);
  text('Highscore: ' + highScore,1300,50);

}

function Shoot() {
  var bullet = createSprite(750,600,20,20);
  var rand = Math.round(random(10,60));
  if (rand% 2 === 0) {
    bullet.addImage(lazer1);
    bullet.scale = 0.2

  } else {
    bullet.addImage(lazer2);
    bullet.scale = 0.4
  }
  bullet.x = rocket.x;
  bullet.velocityY = -5;
  bullet.lifetime = 150 ;
  bulletgroup.add(bullet);

}

function Rock(){
  if (frameCount % 100 === 0) {
    var rock = createSprite(100,-50,30,30)
    rock.x = Math.round(random(100,1400));
    rock.velocityY = 6;
    var rand = Math.round(random(1,3));

    switch (rand) {
      case 1:
        rock.addImage(rockimg1);
        rock.scale = 0.5
        break;

      case 2:
        rock.addImage(rockimg2)
        rock.scale = 0.5
        break;

      case 3:
        rock.addImage(rockimg3)
        rock.scale = 0.3;
        break;
    
      default:
        break;
    }
     rock.lifetime = 150 ; 
     rockgroup.add(rock);
     
  }
}

function enemy (){
  if (frameCount % 250 === 0){
    var alien1 = createSprite(Math.round(random(50,1400)),-50,50,50);
    var bullet1 = createSprite(50,50,10,10);
    bullet1.addImage(lazer1);
    bullet1.scale = 0.2;
    bullet1.x = alien1.x;
    bullet1.y = alien1.y;
    alien1.addImage(ship1);
    alien1.velocityY = 5;
    alien1.scale = 0.3;
    alien1.lifetime = 150;
    aliengroup.add(alien1);
    bullet1.velocityY = 9;
    bullet1.lifetime = 180;
    

  }
}

function gameEnd() {
  background("black");
  rocket.visible = false;
  bulletgroup.destroyEach();
  rockgroup.destroyEach();

  gameover.visible = true;
  reset.visible = true;
  
}