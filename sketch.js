var bg_img,bg,obstacle,runner,coin;
var c_img,s_img,r_img,r_i,border1,border2,gameImage,restartImage,collect;
var score;
var PLAY=1
var END=0
var gameState=PLAY
function preload()
{
bg_img=loadImage("Road.png");

gameImage=loadImage("gameover.png");

restartImage=loadImage("restart.png");

collect=loadSound("cmusic.mp3");

g_img=loadImage("grass.png");

c_img=loadAnimation("Coin/coin1.gif","Coin/coin2.gif","Coin/coin3.gif","Coin/coin4.gif","Coin/coin5.gif","Coin/coin6.gif","Coin/coin7.gif","Coin/coin8.gif","Coin/coin9.gif",
 "Coin/coin9.gif","Coin/coin10.gif","Coin/coin11.gif","Coin/coin12.gif","Coin/coin13.gif","Coin/coin14.gif","Coin/coin15.gif","Coin/coin16.gif","Coin/coin17.gif","Coin/coin18.gif","Coin/coin19.gif","Coin/coin20.gif",
 "Coin/coin21.gif","Coin/coin22.gif");
 
r_img= loadAnimation("Runner/runner1.gif","Runner/runner2.gif","Runner/runner3.gif","Runner/runner4.gif","Runner/runner5.gif","Runner/runner6.gif","Runner/runner7.gif")
r_i=loadAnimation("images.png");

s_img=loadAnimation("Spider/spider1.gif","Spider/spider2.gif","Spider/spider3.gif","Spider/spider4.gif","Spider/spider5.gif","Spider/spider6.gif",
"Spider/spider7.gif","Spider/spider8.gif","Spider/spider9.gif","Spider/spider10.gif","Spider/spider11.gif")
}

function setup() {
 createCanvas(1800,600);
 bg=createSprite(100,300)
 bg.addImage(bg_img)
 bg.velocityX=-5

 runner = createSprite(70,200,20,50);
 runner.addAnimation("running",r_img);
 runner.addAnimation("collided",r_i);
 runner.scale = 0.4;
  

 //create obstacles and coin group
 obstaclesGroup=new Group();
 coinGroup=new Group();
  

 border1=createSprite(100,10,1800,10);  
 border1.visible=false

 border2=createSprite(100,600,1800,10)
 border2.visible=false
 
 runner.setCollider("rectangle",0,0,200,runner.height)
  
 score=0

 gameOver=createSprite(700,290);
 gameOver.addImage(gameImage);
 gameOver.scale=0.7

 restart=createSprite(710,360);
 restart.addImage(restartImage);
 restart.scale=0.1
}


function draw() {
background(0);  
  
if(gameState===PLAY){
  bg.velocityX=-5

  gameOver.visible=false
  restart.visible=false

  if(bg.x < 0 ){
   bg.x = width/2;
  }
  if(keyDown("up")){
   runner.y=runner.y-5
  }
  if(keyDown("down")){
   runner.y=runner.y+5
  }

  /*if(coin.isTouching(runner)){
    coin.visible=false
    score=score+1
  }*/

  spawnObstacles()
  spawnCoins()

  if(obstaclesGroup.isTouching(runner))
  {
   gameState=END
  }
 }
 else if(gameState===END)
 {
  bg.velocityX=0
    
  runner.changeAnimation("collided",r_i)

  obstaclesGroup.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)

  obstaclesGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)

  gameOver.visible=true;
  restart.visible=true;

  if(mousePressedOver(restart))
  {
    reset();
  }
  }
 
  runner.collide(border1)
  runner.collide(border2) 
   
  drawSprites();
  textSize(45)
  text("Score: "+score,1200,100)
 
   
};

function spawnObstacles()
{
  if(frameCount%60===0){
    obstacle = createSprite(1600,180,10,40);
    obstacle.y=Math.round(random(60,500))
    obstacle.addAnimation("spider",s_img);
    obstacle.velocityX=-5;
    obstacle.scale=0.4
    obstacle.setCollider("rectangle",0,0,90,obstacle.height);
    obstaclesGroup.add(obstacle)
  }}

  function spawnGrass()
 {
  if(frameCount%60===0)
  {
    grass = createSprite(1600,20,10,40);
    grass.y=Math.round(random(1600,200))
    grass.addImage(g_img);
    grass.velocityX=-5;
    grass.scale=0.4
  }
}

function spawnCoins()
{
  if(frameCount%60===0)
  {
   coin=createSprite(1600,200,10,30);
   coin.visible=true
   coin.y=Math.round(random(50,575))
   coin.addAnimation("coin",c_img);
   coin .velocityX=-5
   coin.scale=0.5
   coin.setCollider("circle",0,0,30)
   coinGroup.add(coin)
   
  }
}

function reset()
{
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  score=0;
  runner.changeAnimation("running");
}