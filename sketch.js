const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var boy, boyRunningAnimation, boyOpRunAnimation;
var platform, platformGroup;
var gameState = "menu";
var playButton, playButtonImage;
var line1Image, line2Image, line3Image, line4Image, line5Image;
var blockImage;
var subState = "runningright";
var boyFallAnimation;
var boyDashAnimation;
var engine, world;
var usingSling = false;
var sling;
var bug, error;
var correct;

var slingArray = [];
var bugArray = [];
var errorArray = [];

var maxErrors = 2;
var maxBugs = 6;
var sT = 0;

var rB;

var pBImage;
var score = 0;

var a = 0;

function preload() {
  // line images
  line1Image = loadImage("coding lines/line1.png");
  line2Image = loadImage("coding lines/line2.png");
  line3Image = loadImage("coding lines/line3.png");
  line4Image = loadImage("coding lines/line4.png");
  line5Image = loadImage("coding lines/line5.png");

  //blockImages
  blockImage = loadImage("coding lines/block1.png");

  //boy animation
  boyRunningAnimation =  loadAnimation("boy/boyrun1.png", "boy/boyrun2.png", "boy/boyrun3.png", "boy/boyrun4.png", 
  "boy/boyrun5.png", "boy/boyrun6.png", "boy/boyrun7.png");

  
  //boyOpRunAnimation = loadAnimation("boy/boyoprun1.png", "boy/boyoprun2.png", "boy/boyoprun3.png", "boy/boyoprun4.png", 
  //"boy/boyoprun5.png", "boy/boyoprun6.png", "boy/boyoprun7.png");

boyOpRunAnimation = loadAnimation("boy/boyoprun2.png", "boy/boyoprun3.png");
 
  pbImage = loadImage("pbImage.png");

}

function setup() {
  createCanvas(1200,800);

  engine = Engine.create();
    world = engine.world;

  boy  = createSprite(600, -500, 20, 20);
  //boy.addAnimation("running", boyRunningAnimation);
  boy.scale = 1.4;

  rB = createSprite(600, 600, 200, 50);
  rB.visible = false;

  playButton = createSprite(600, 400, 100, 50);
  playButton.visible = false;
  playButton.addImage("image", pbImage);

  platformGroup = new Group();

  
  correct = new Correct(100, 400, 30, 30);
  sling = new Sling(correct.body, {x: 150, y:650});


  if (frameCount % 500 == 0) {
    for (var i = 0; i < maxBugs; i++) {
    bug = new Bug(Math.round(random(10, 1110)), 0, 30, 30);
    bugArray.push(bug)
    }
  }

  if (frameCount % 500 == 0) {
    for (var i = 0; i < maxErrors; i++) {
    error = new Error(Math.round(random(10, 1110)), 0, 50, 50);
    errorArray.push(error)
    }
  }


 
 

}

function draw() {
  background(0,0,0); 

  Engine.update(engine);

  
  console.log(score);
  

  console.log(subState)
  
  //menu with controls
  if (gameState == "menu") {
    playButton.visible = true;
    boy.visible = false;
    //displaying text
    stroke("yellow");
    fill("yellow");
    textSize(23)
    text("CODE JUMP", 550, 200);

    //story text
    text("STORY: THERE IS A BOY WHO IS LEARNING TO CODE AND IS FACING", 300,  250);
    text("DIFFICULTY, HELP HIM BY SHOOTING THE ERRORS OUT OF THE SKY", 300, 300)


    //text for controls
    text("CONTROLS", 550, 550);
    text("USE ARROW KEYS TO MOVE AND PRESS SPACE TO JUMP", 300, 600);
    text("USE W TO USE THE SLINGSHOT TO SHOOT ERRORS", 300, 650);
    text("DRAG THE SHOOTER TO SLING IT AT THE ERRORS", 300, 700);
    text("PRESS R TO USE SLINGSHOT AGAIN", 300, 750);
    

    //if the player presses the play button
    if (mousePressedOver(playButton)) {
      gameState = "play";
    }
  }

  //playing the game
  if (gameState == "play") {
  
    sT += 0.5;

    correct.display();
    sling.display();

    stroke("white");
    fill("white");
    text("press w to use the slingshot", 10, 30);
    text("press r to attach the slingshot", 10, 60);
    text("Survival Time: " + sT, 10, 90);
    //checking if sling is being used
    if (keyDown("w")) {
      usingSling = true;
    }

    //spawing platforms
    spawnPlatforms()
    //setiting visibility
    boy.visible = true;
    playButton.visible = false;

    //movement
    if (keyDown("right")) {
      subState = "runningRight"

      boy.x += 5;
      console.log(boy.x);
    } else if (keyDown("left")) {
      boy.x -= 5;
      subState = "runningLeft";
    }

    if (keyWentDown("space")) {
      boy.velocityY  = -12;
  

    }
    

    for (var i = 0; i < maxErrors; i++) {
      errorArray[i].display();

    }



  

    //checking whether game has ended
    if (boy.y > 800) {
      gameState = "end"

    }

    // chenging animation according to substate
    /*if (subState == "runningRight") {
      boy.addAnimation("run", boyRunningAnimation)
    }*/
    
    if (subState == "runningLeft") {
      changeLeft();
      //boy.addAnimation("oprun", bloyOpRunAnimation)
    } else if (subState == "runningRight") {
      changeRight();
    }

    
    //showing errors
    

 
      for (var i = 0; i < bugArray.length; i++) {
        bugArray[i].display();
        bugArray[i].update();
      } 
  

    //sling display
    sling.display();


    for (var i = 0; i < errorArray.length; i++) {
      if (errorArray[i].Visibility < 5 && errorArray[i].body.position.y > 800) {
        gameState = "end";
      }
    }

    

    boy.velocityY = boy.velocityY + 0.9;

  }

  if (gameState == "end") {

    textSize(30);

    stroke("red");
    fill("yellow");
    text("GAME OVER", 350, 350);
    text("SURVIVAL TIME: " + sT + " SECONDS", 350, 400);
    
    text("don't worry if you failed", 350, 450);
    text("you will be a great person one day", 350, 500);
    text("keep trying and you will succeed", 350, 550);
    text("click here to restart", 475, 600);

    console.log("GAME OVER");
    platformGroup.destroyEach();  
    
    boy.velocityY = 0;
    boy.x = 600;
    boy.y = 100;



  if (mousePressedOver(rB)) {
    reset();
  }

}

boy.collide(platformGroup);

  drawSprites();
}

function spawnPlatforms() {
  if (frameCount % 60 == 0) {
    platform = createSprite(0, 0, 200, 20);
    platform.lifetime
    platform.velocityY = 4;
    platform.depth = boy.depth;
    boy.depth += 1;

    var randPos = Math.round(random(1, 2));
    if (randPos == 1) {
      platform.x = Math.round(random(100, 1100));
    } else if (randPos == 2) {
      platform.x = Math.round(random(100, 1100));
    }
    var randImage = Math.round(random(1, 6));

    //displaying images
    switch(randImage) {
      case 1:
        platform.addImage(line1Image);
        break;
      case 2:
        platform.addImage(line2Image);
        break;
      case 3:
        platform.addImage(line3Image);
        break;
      case 4:
        platform.addImage(line4Image);
        break;
      case 5:
        platform.addImage(line5Image);
        break;
      case 6:
        platform.addImage(blockImage);
        break;
    }
    platformGroup.add(platform);
  }
}

function changeLeft() {
     boyOpRunAnimation.play();
   // boy.changeAnimation("running","boy/boyoprun7.png", "boy/boyoprun2.png", "boy/boyoprun3.png", "boy/boyoprun4.png", 
   /// "boy/boyoprun5.png", "boy/boyoprun6.png", "boy/boyoprun7.png");


}

function changeRight() {
  boy.addAnimation("running", boyRunningAnimation);
}

function mouseDragged(){
  //if (gameState == "play" && usingSling == true){
      Matter.Body.setPosition(correct.body, {x: mouseX , y: mouseY});
      boy.velocityY = boy.velocityY + 0.3;
      platformGroup.setVelocityYEach(3);
  //}
}


function mouseReleased(){
  if (gameState == "play" && usingSling == true){
    usingSling = false;
    sling.fly();
 
  }
}

function keyPressed() {
  if (keyCode == 82) {
    sling.attach(correct.body)
  }
}

function reset() {
  sT = 0;
  gameState = "play";
  score = 0;

}
