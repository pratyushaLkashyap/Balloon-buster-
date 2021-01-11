var PLAY=1;
var END=0;
var gameState=1;



var sword;
var background, backgroundImage;
var score;

var gameoverImage;

var fruit1,fruitImage1,fruit2,fruitImage2,fruit3,fruitImage3,fruit4,fruitImage4;

var enemy1,enemyImage1,enemy2,enemyImage2;


function preload(){
  swordImage = loadImage("sword.png");
  
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");

  enemyImage1 = loadImage("alien1.png");
  enemyImage2 = loadImage("alien2.png");
  
  gameoverImage = loadImage("gameover.png");

}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score = 0;
  fruitGroup = createGroup();
  EnemyGroup = createGroup();
}

function draw(){
  
  background("lightblue");
  
  text("Score: "+ score, 500,50);
            
  if(gameState === PLAY){
     sword.y = World.mouseY;
     sword.x = World.mouseX;
     
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      
    }
      
     if(EnemyGroup.isTouching(sword)){
       EnemyGroup.destroyEach();
       gameState = END;
       
       
       sword.addImage( gameoverImage);
      sword.x = 200;
      sword.y = 200;
     }
  
    else if (gameState === END){
      
      fruitGroup.destroyEach();
      EnemyGroup.destroyEach();
      
      fruitGroup.setVelocityEach(0);
      EnemyGroup.setVelocityEach(0);
      
      
    }
    
    
     fruits();
  Enemy();
     
   }
  
  
  
  
  
  
  drawSprites();
  
}
  
  


function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruitImage1);
    } else if  (r == 2){
      fruit.addImage(fruitImage2);
    } else if  (r == 3){
      fruit.addImage(fruitImage3);
    } else if (r == 4){
      fruit.addImage(fruitImage4);
    }
    
    fruit.y= Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
    //note to self : add the enemy images in preload and continue
  }
}

function Enemy(){
  if(World.frameCount%200===0){
  enemy = createSprite(400,200,20,20);
   enemy.addAnimation("moving",enemyImage2);
    enemy.y=Math.round(random(100,300));
    enemy.velocityX=-8;
    enemy.setLifetime=50;
    
    EnemyGroup.add(enemy);
}}