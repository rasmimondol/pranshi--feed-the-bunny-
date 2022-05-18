const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var button
var bunny
var eat, blink, sad
var bkSound,cryingSound,eatingSound,cuttingSound,airSound
var muteButton,cutButton

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  eat= loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png')
  blink=loadAnimation('blink_1.png','blink_2.png','blink_3.png')
  sad=loadAnimation('sad_1.png','sad_2.png','sad_3.png')
  bkSound=loadSound('sound1.mp3')
  cryingSound=loadSound('sad.wav')
eatingSound=loadSound('eating_sound.mp3')
airSound=loadSound('air.wav')
cuttingSound=loadSound('Cutting Through Foliage.mp3')
  eat.looping=false
  sad.looping=false
}

function setup() 
{
  var iTest=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (iTest){
    canW=displayWidth
    canH=displayHeight
    createCanvas(canW+80,canH)
  }
  else{
    canW=windowWidth
    canH=windowHeight
    createCanvas(canW,canH)
  }

  frameRate(80);
  bkSound.play()
  bkSound.setVolume(0.2)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height-30,canW,20);

  rope = new Rope(6,{x:360,y:50});
  rope2=new Rope(9,{x:30,y:30})
  rope3=new Rope(5,{x:400,y:220})
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2= new Link(rope2,fruit)
  fruit_con_3=new Link(rope3,fruit)
  blink.frameDelay=20
  eat.frameDelay=10
bunny= createSprite(350,height-110,30,30)
bunny.addAnimation('blinks',blink)
bunny.addAnimation('eats',eat)
bunny.addAnimation('sads',sad)
bunny.changeAnimation('blinks')

bunny.scale=0.2
  rectMode(CENTER);
  imageMode(CENTER)
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
 
button=createImg('cut_button.png')
button.position(330,50)
button.size(35,35)
 button.mouseClicked(drop) 

button2=createImg('cut_button.png')
button2.position(30,30)
button2.size(35,35)
button2.mouseClicked(drop2)

button3=createImg('cut_button.png')
button3.position(370,200)
button3.size(35,35)
button3.mouseClicked(drop3)

 balloon=createImg('balloon.png')
 balloon.position(20,250)
 balloon.size(150,100)
balloon.mouseClicked(balloonForce)

muteButton=createImg('mute.png')
muteButton.position(450,20)
muteButton.size(35,35)
muteButton.mouseClicked(mutes)


}

function distance(body,sprite){
if (body!=null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if (d<100){
World.remove(world,fruit)
fruit=null
return true
  }
else{
  return false
}
}
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con=null
  cuttingSound.play()
}

function drop2(){
  rope2.break()
  fruit_con_2.detach()
  fruit_c_2=null
  cuttingSound.play()
}

function drop3(){
  rope3.break()
  fruit_con_3.detach()
  fruit_c_3=null
  cuttingSound.play()
}

function balloonForce(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  airSound.play()
}

function mutes(){
  if (bkSound.isPlaying()){
    bkSound.stop()
  }
  else {
    bkSound.play()
  }
}
function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,canW,canH);

if (fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}

if (distance(fruit,bunny)==true){
bunny.changeAnimation('eats')
eatingSound.play()
}
if (distance(fruit,ground.body)==true){
bunny.changeAnimation('sads')
bkSound.stop()
cryingSound.play()
}

  rope.show();
  rope2.show()
  rope3.show()
  Engine.update(engine);
  ground.show();
  
drawSprites()
 
   
}
