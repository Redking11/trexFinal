var ground
var groundans
var groundans2
var clans
var trex ,trex_running;
var c1,c2,c3,c4,c5,c6
var score=0
var gameState="play"
var cloudgroup,cactusgroup
var gameover,restart
var gi,ri
var trexend
var jump,die,check
function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png") 
groundans=loadImage("ground2.png")
clans=loadImage("cloud.png")
c1=loadImage("obstacle1.png")
c2=loadImage("obstacle2.png")
c3=loadImage("obstacle3.png")
c4=loadImage("obstacle4.png")
c5=loadImage("obstacle5.png")
c6=loadImage("obstacle6.png")

gi=loadImage("gameOver.png")
ri=loadImage("restart.png")
trexend=loadImage("trex_collided.png")

jump = loadSound("jump.mp3")
check = loadSound("checkpoint.mp3")
die = loadSound("die.mp3")
}

function setup(){
  createCanvas(window.innerWidth,window.innerHeight)
  
  //create a trex sprite
 trex = createSprite(40,150,20,20);
trex.addAnimation("trex",trex_running)
trex.addAnimation("trexend",trexend)

ground = createSprite(width/2.,150,width,15);
trex.scale=0.5
ground.addImage("G",groundans)
ground.velocityX=-3

groundans2=createSprite(width/2,165,width,15);
groundans2.visible=false

gameover=createSprite(width/2,70,10,10);
restart=createSprite(width/2,100,10,10);

gameover.addImage("gameOver",gi)
restart.addImage("gameOver",ri)
cactusgroup=new Group()
cloudgroup=new Group()

gameover.scale=0.6
restart.scale=0.6


gameover.visible=false
restart.visible=false

}


function draw(){

  background("white")

trex.debug=false
trex.setCollider("circle",0,0,45)


if (gameState==="play"){

  if( touches.length>0 || keyDown("space")&&trex.isTouching(ground)){
    trex.velocityY=-10
    jump.play()
    touches=[]
   } 
   if (score%100===0&&score>0){
check.play()

   }
   

   trex.velocityY=trex.velocityY+0.5
   if (ground.x<0){
    ground.x=ground.width/2
    }
    clouds()
cactus()

score=score+Math.round(getFrameRate()/60 )
 
if(trex.isTouching(cactusgroup)){   
gameState="end"
die.play()
}
 ground.velocityX= -3


}
else if (gameState==="end"){

trex.velocityY=0

trex.changeAnimation("trexend",trexend)

cactusgroup.setLifetimeEach(-10000000)

cloudgroup.setLifetimeEach(-10000000) 

ground.velocityX=0

cactusgroup.setVelocityXEach(0)
cloudgroup.setVelocityXEach(0)

gameover.visible=true
restart.visible=true

if(mousePressedOver(restart)){
score=0

gameState="play"
cactusgroup.destroyEach()
cloudgroup.destroyEach()
restart.visible=false
gameover.visible=false
trex.changeAnimation("trex",trex_running)
}

}





trex.collide(groundans2)



 

console.log(trex.y)

text("score="+score,width-100,29)


 drawSprites()

}
function clouds  (){

if(frameCount%80===0){
  var cl= createSprite (width,random(60,80),20,20);
  cl.velocityX=-5
cl.addImage("cloudy",clans)
cl.scale=0.5
cl.lifetime=350
trex.depth=cl.depth
trex.depth=trex.depth+1
cloudgroup.add(cl)
}
}

//speed=distance/timen 
//if numerator is less than denominator than ans is numerator\\

function cactus()
{
if(frameCount%70===0){
  var cac = createSprite(width,135,20,20); 
  cac.velocityX=-5
  cac.lifetime=350
var r=Math.round(random(1,6))
switch(r){
case 1:cac.addImage("c1",c1)
break;
case 2:cac.addImage("c2",c2)
break;
case 3:cac.addImage("c3",c3)
break;
case 4:cac.addImage("c4",c4)
break;
case 5:cac.addImage("c5",c5)
break;
case 6:cac.addImage("c6",c6)
break;

}
cac.scale=0.55
cactusgroup.add(cac)

}


}








