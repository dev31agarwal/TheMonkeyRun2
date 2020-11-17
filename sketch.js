var monkey, scene, invisibleGround, score, stone, gameState 
var stoneGroup, bananaGroup

var monkeyImage, bananaImage, jungleImage, stoneImage, monkeyStopImage

function preload(){
  monkeyImage =loadAnimation ("Monkey_01.png","Monkey_02.png",
  "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
 "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");

  jungleImage=loadImage("jungle.jpg");
  
  stoneImage=loadImage("stone.png");
  
  


}

function setup() {
  
  createCanvas(500, 400);
  
  scene=createSprite(90, 200);
  scene.addImage(jungleImage);
  
  scene.x=scene.width/2;
  
  invisibleGround=createSprite(250, 380, 500, 20 )
  invisibleGround.visible=false
  
  monkey=createSprite(100, 340);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.14;
  

  bananaGroup=createGroup();
  stoneGroup=createGroup();
  score=0

  gameState="play"
}

function draw() {
  
 background("jungleImage"); 
  
  drawSprites();
  
  monkey.collide(invisibleGround);
  
  
  if(gameState==="play"){
    
  fill("black");
  textSize(40);
  textFont("Agency FB");  
  text("SCORE: "+ score, 200, 50);
    
  if(scene.x<0){
    scene.x=scene.width/2;
  }
  scene.velocityX=-(score/10+9);
  if(keyDown(UP_ARROW)&&monkey.y>260) {
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.depth=6;
  

  if(frameCount%60===0){
    spawnBananas();
  }
  
  if(frameCount%80===0){
    spawnStone();
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  
 switch(score){
   case 10: monkey.scale=0.16;
     break;
   case 20: monkey.scale=0.18;
     break;
   case 30: monkey.scale=0.20;
     break;
   case 40: monkey.scale=0.22;
     break;
 }
        
     if(stoneGroup.isTouching(monkey)){
   
      gameState="end";
    }
   
    
    console.log(gameState);
  }
  
  if(gameState==="end"){
    scene.velocityX=0;
    monkey.x=250;
    monkey.y=60;
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    
    fill("black");
    textSize(60);
    textFont("Agency FB");
    text("TOTAL SCORE: "+ score, 100, 200);
    
  }

  
    
}  

function spawnBananas(){
  
  var banana=createSprite(550, 200)
  banana.addImage(bananaImage);
  banana.scale=0.055;
  banana.velocityX=-(score/10+9);
  banana.y=random(200, 250);
  bananaGroup.add(banana);
  banana.lifetime=100;
  
}

function spawnStone(){
  stone=createSprite(550, 380);
  stone.addImage(stoneImage);
  stone.scale=0.23
  stone.collide(invisibleGround);
  stone.y=350
  stone.velocityX=-(score/10+9)
  stone.depth=7;
  stoneGroup.add(stone);
  stone.lifetime=100;
  stone.setCollider("rectangle", 0, 0,50, 30);
}








