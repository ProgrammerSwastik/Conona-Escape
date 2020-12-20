

//declaring the variables(global variables)
  var runner,runnerImgImg;
  var ground,groundImg;
  var invisibleGround;
  var corona,coronaImg;
  var cough,coughImg;
var invisibletop;
  var         precaution,precaution1,precaution2,precaution3,precaution4;
  var sound;
  var score=0;
  var START=2;
  var PLAY=0;
  var END=1;
  var gameState=PLAY;


function preload(){
  
//preloading the images
  runnerImg= loadAnimation("runner.gif");
  groundImg= loadImage("background.jpg");
  coronaImg=loadImage("corona.png");
  precaution1= loadImage("sanitize.png");
  precaution2= loadImage("soap.png");
  precaution3= loadImage("mask.png");
  precaution4= loadImage("socialdistance.png");
  coughImg=loadImage("cough.png");
  gameOverImg=loadImage("game-over.jpg");
  restartImg=loadImage("play_again_button.png");
  playImg=loadImage("play.png");
  sound=loadSound("sound.mp3")
  
  }


function setup() {
  createCanvas(500,250);
  
  sound.loop();
   
//creating the ground
  ground= createSprite(200,120,600,400);
  ground.addImage("ground",groundImg);
  ground.x=ground.width/2;
  
//creating the invisible ground
  invisibleGround=createSprite(390,270,900,10);
  invisibleGround.visible=false;
  
//creating the runner
  runner= createSprite(35,50,20,50);
  runner.addAnimation("running",runnerImg);
  runner.scale = 0.2;
  //runner.debug=true;
  runner.setCollider("rectangle",0,0,15,runner.width);
  
//creating gameover and restart
  gameOver = createSprite(259,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  play=createSprite(200,200);
  play.addImage(playImg);
  
  starting=createSprite(200,120,600,400);
  //starting.addImage();
  
  restart = createSprite(100,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  invisibletop = createSprite(0,00,8000,20);
  invisibletop.visible=false;
  
//creating group for obstacles and precautions
  obstaclesGroup= createGroup();
  precautionsGroup= createGroup();
     
}

function draw() {
    background("lightblue");

  runner.collide(invisibletop);
  
//textSettings
    fill("black");
    textFont("Comic Sans MS");
    textSize(15);
  
  
  
//making the functions to be excecuted when gameState is PLAY
  if(gameState===PLAY) {
    
    
    
//making gameover,play,starting and restart invisible
    gameOver.visible=false;
    restart.visible=false;
    play.visible=false;
    starting.visible=false;
    
// adding velocity to the ground
    ground.velocityX=-3;
  
// moving the ground
    if(ground.x < 160){
        ground.x =ground.width/2;
      }
        if(invisibletop.x < 160){
        invisibletop.x =invisibletop.width/2;
      }
  
//making the runner jump when the space is pressed
 if(keyDown("space")){
   runner.velocityY= -10;
 }
  
  //spawning the obstacles
  spawnObstacles();
  
    //spawning the precautions
  spawnPrecaution();
    
    //making the score system
    if(precautionsGroup.isTouching(runner)){
      score=score+1;
      precautionsGroup.destroyEach();
    }
    
    //changing the gamestate to end when the runner touches any obstacles
    if(obstaclesGroup.isTouching(runner)){
      gameState=END;
    }
   
    
  }
  
  //making the functions to be excecuted when gameState is END
  if(gameState===END){
    
    //making the gameover,play,starting and restart visible
    gameOver.visible=true;
    restart.visible=true;
     play.visible=false;
    starting.visible=false;
    
    // making ground invisible
    ground.visible=false;
    
    //changing the background color
    background("black");
    
    //stopping the movements
    ground.velocityX=0;
    runner.velocityX=0;
    
    //destroying the groups
  obstaclesGroup.destroyEach();
  precautionsGroup.destroyEach();
  
     //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    precautionsGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    precautionsGroup.setVelocityXEach(0);
    
    //executing the reset function when mouse is pressed over restart
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
  }
  //adding gravity
  runner.velocityY=runner.velocityY+0.8;
  
  //colliding the runner with the invisibleGround
  runner.collide(invisibleGround);
  
  //textSettings
  fill("black");
  textFont("Comic Sans MS");
  textSize(15);
  
  drawSprites();
  
  //displaying the score
  text("Score : "+ score,100,30);
 
}

//reset function
function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  ground.visible=true;
  
 //destroying the previous obstacles and precautions
  obstaclesGroup.destroyEach();
  precautionsGroup.destroyEach();
  
  //change score to 0
  score=0;
}

//spawnObstacles function
function spawnObstacles(){
  if (frameCount % 150 === 0) {
    
  corona= createSprite(390,210,40,10);
  corona.addImage(coronaImg);
  corona.scale = 0.1;
  corona.velocityX = -6;
   
    //adding lifetime
  corona.lifetime=300;
    
    //adjusting the depth of the runner
    runner.depth = corona.depth;
    runner.depth = runner.depth+1;
    
    //adding corona to the group
  obstaclesGroup.add(corona);
    
  
}
   if (frameCount % 270 === 0) {
    
  cough= createSprite(400,100,40,10);
  cough.addImage(coughImg);
  cough.y=Math.round(random(10,180));
  cough.scale = 0.05;
  cough.velocityX = -6
    
   //adding lifetime
  cough.lifetime=300;
    
  ////adding cough to the group
  obstaclesGroup.add(cough);   
}
    
}

//spawnPrecautions function
function spawnPrecaution(){
  
 if(frameCount%100===0){
   precaution= createSprite(450,150,40,10);
   precaution.y=Math.round(random(10,180));
   precaution.scale = 0.09;
   precaution.velocityX = -5;
   
   //adding precaution to the group
   precautionsGroup.add(precaution);
   
   // displaying various images using switch statement
       var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: precaution.addImage(precaution1);
              break;
      case 2: precaution.addImage(precaution2);
              break;
      case 3: precaution.addImage(precaution3);
              break;
      case 4: precaution.addImage(precaution4);
              break;
      default: break;
   
    }

   } 

  
}
//THANK YOU