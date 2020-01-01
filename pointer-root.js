const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth-20;
ctx.canvas.height = window.innerHeight-20;



var points = 0;

var message = true;



const player = {

  x: 30,
  y: canvas.height-30,
  xspeed: 0,
  yspeed: 0,

  width: 20,
  height: 20,

  dead: false,
  onPlatform1: false,
  onPlatform2: false,
  onPlatform3: false,
  onPlatform4: false,

};

const block = {

  x: 500,
  y: canvas.height-30,
  xspeed: 0,
  yspeed: 0,

  width: 20,
  height: 20,

}

const river = {

  x: 0,
  y: canvas.height/3,

  width: canvas.width,
  height: canvas.height/2
}

const platform1 = {

  x: 0,
  y: river.y+river.height*3/4,

  xspeed: 0,
  yspeed: 0,

  right: true,

  width: canvas.width/4,
  height: river.height/4
}

const platform2 = {

  x: 800,
  y: river.y+river.height/2,

  xspeed: 0,
  yspeed: 0,

  right: false,

  width: canvas.width/5,
  height: river.height/4
}

const platform3 = {

  x: canvas.width - 800,
  y: river.y+river.height/4,

  xspeed: 0,
  yspeed: 0,

  right: true,

  width: canvas.width/6,
  height: river.height/4
}

const platform4 = {

  x: canvas.width-200,
  y: river.y,

  xspeed: 0,
  yspeed: 0,

  right: false,

  width: canvas.width/7,
  height: river.height/4
}


const target1 = {

  x: platform1.x + 100,
  y: platform1.y + 40,

  width: 20,
  height: 20,

  captured: false
}

const target2 = {

  x: platform2.x + 100,
  y: platform2.y + 40,

  width: 20,
  height: 20,

  captured: false
}

const target3 = {

  x: platform3.x + 50,
  y: platform3.y + 40,

  width: 20,
  height: 20,

  captured: false
}

const target4 = {

  x: platform4.x + 50,
  y: platform4.y + 40,

  width: 20,
  height: 20,

  captured: false
}

const goal = {

  x: canvas.width/2,
  y: 20,

  width: 30,
  height: 30
}

const gate = {

  x: canvas.width/2-35,
  y: 0,

  width: 100,
  height: 70
}






const controller = {

  left:false,
  right:false,
  up:false,
  down: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// Left
        controller.left = key_state;
        break;
      case 38:// Up 
        controller.up = key_state;
        break;
      case 39:// Right
        controller.right = key_state;
        break;
      case 40: // Down
        controller.down = key_state;
        break;

    }

  }

}



const loop = function() {

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-20;
  });
  


  window.addEventListener('click', function(event){

    var mousex = event.clientX;
    var mousey = event.clientY;

    block.x = mousex-block.width;
    block.y = mousey-block.height;


  })

  // PLAYER MOVEMENT

  if(player.x < block.x){

    player.xspeed +=0.7;
  }

  if (player.x > block.x){

    player.xspeed -= 0.7;
  }

  if (player.y < block.y){

    player.yspeed += 0.7;

  }

  if (player.y > block.y){

    player.yspeed -= 0.7;
  }
  
  player.x += player.xspeed;
  player.y += player.yspeed;
  player.xspeed *= 0.9;// friction
  player.yspeed *= 0.9;// friction

  // PLATFORM 1

  if (platform1.x <0){

    platform1.right = true;

  }else if (platform1.x > canvas.width-platform1.width){

    platform1.right = false;
  }

  if (platform1.right){

    platform1.xspeed += 0.6;
  }else{

    platform1.xspeed -= 0.6;
  }

  platform1.x += platform1.xspeed;
  platform1.xspeed *= 0.9;

  // PLATFORM 2

  if (platform2.x <0){

    platform2.right = true;

  }else if (platform2.x > canvas.width-platform2.width){

    platform2.right = false;
  }

  if (platform2.right){

    platform2.xspeed += 0.5;
  }else{

    platform2.xspeed -= 0.5;
  }

  platform2.x += platform2.xspeed;
  platform2.xspeed *= 0.9;

   // PLATFORM 3

   if (platform3.x <0){

    platform3.right = true;

  }else if (platform3.x > canvas.width-platform3.width){

    platform3.right = false;
  }

  if (platform3.right){

    platform3.xspeed += 0.5;
  }else{

    platform3.xspeed -= 0.5;
  }

  platform3.x += platform3.xspeed;
  platform3.xspeed *= 0.9;

  // PLATFORM 4

  if (platform4.x <0){

    platform4.right = true;

  }else if (platform4.x > canvas.width-platform4.width){

    platform4.right = false;
  }

  if (platform4.right){

    platform4.xspeed += 0.6;
  }else{

    platform4.xspeed -= 0.6;
  }

  platform4.x += platform4.xspeed;
  platform4.xspeed *= 0.9;

  // BLOCK + PLATFORM

  if (block.y > platform1.y-block.height && block.y < platform1.y+platform1.height && block.x < platform1.x+platform1.width && block.x > platform1.x-block.width){

    block.x += platform1.xspeed*1.1;
  }

  if (block.y > platform2.y-block.height && block.y < platform2.y+platform2.height && block.x < platform2.x+platform2.width && block.x > platform2.x-block.width){

    block.x += platform2.xspeed*1.1;
  }

  if (block.y > platform3.y-block.height && block.y < platform3.y+platform3.height && block.x < platform3.x+platform3.width && block.x > platform3.x-block.width){

    block.x += platform3.xspeed*1.1;
  }

  if (block.y > platform4.y-block.height && block.y < platform4.y+platform4.height && block.x < platform4.x+platform4.width && block.x > platform4.x-block.width){

    block.x += platform4.xspeed*1.1;
  }

  // PLAYER + PLATFORM

  if (player.y > platform1.y-player.height && player.y < platform1.y+platform1.height && player.x < platform1.x+platform1.width && player.x > platform1.x-player.width){

    player.onPlatform1 = true;

  }else{

    player.onPlatform1 = false; 
  }

  if (player.y > platform2.y-player.height && player.y < platform2.y+platform2.height && player.x < platform2.x+platform2.width && player.x > platform2.x-player.width){

    player.onPlatform2 = true;

  }else{

    player.onPlatform2 = false;
  }

  if (player.y > platform3.y-player.height && player.y < platform3.y+platform3.height && player.x < platform3.x+platform3.width && player.x > platform3.x-player.width){

    player.onPlatform3 = true;

  }else{

    player.onPlatform3 = false;

  }

  if (player.y > platform4.y-player.height && player.y < platform4.y+platform4.height && player.x < platform4.x+platform4.width && player.x > platform4.x-player.width){

    player.onPlatform4 = true;
  }else{

    player.onPlatform4 = false;
  }


  // TARGET MOVEMENT

  target1.x += platform1.xspeed*1.1;

  target2.x += platform2.xspeed*1.1;

  target3.x += platform3.xspeed*1.1;

  target4.x += platform4.xspeed*1.1;
  

  // PLAYER + TARGETS

  if (player.y > target1.y-player.height && player.y < target1.y+target1.height && player.x < target1.x+target1.width && player.x > target1.x-player.width){

    target1.captured = true;
  }

  if (player.y > target2.y-player.height && player.y < target2.y+target2.height && player.x < target2.x+target2.width && player.x > target2.x-player.width){

    target2.captured = true;
  }

  if (player.y > target3.y-player.height && player.y < target3.y+target3.height && player.x < target3.x+target3.width && player.x > target3.x-player.width){

    target3.captured = true;
  }

  if (player.y > target4.y-player.height && player.y < target4.y+target4.height && player.x < target4.x+target4.width && player.x > target4.x-player.width){

    target4.captured = true;
  }

    
  
  //DEATH

  if (player.y > river.y-player.height && player.y < river.y+river.height && player.x < river.x+river.width && player.x > river.x-player.width && !player.onPlatform1 &&  !player.onPlatform2 &&  !player.onPlatform3 &&  !player.onPlatform4){

    player.dead = true;
  }

  if (player.dead){

    target1.captured = false;
    target2.captured = false;
    target3.captured = false;
    target4.captured = false;

    player.x = 30,
    player.y = canvas.height-30
  
    block.x = 500,
    block.y = canvas.height-30;
  
    player.dead = false;

   
    

  }



  // BOUNDARY CONTROL

  if (player.x < 0) {

    player.x = 0;

  } else if (player.x > canvas.width-player.width) {

    player.x = canvas.width-player.width;
  }

  if (player.y < 0){

    player.y = 0

  }else if (player.y > canvas.height-player.height){

    player.y = canvas.height-player.height;

  }




  
  


  //DRAW FRAMES


  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);// x, y, width, height

  ctx.fillStyle = "blue";
  ctx.fillRect(river.x, river.y, river.width, river.height); // River 

  ctx.fillStyle = "black";
  ctx.fillRect(platform1.x, platform1.y, platform1.width, platform1.height); // Platforms
  ctx.fillRect(platform2.x, platform2.y, platform2.width, platform2.height); 
  ctx.fillRect(platform3.x, platform3.y, platform3.width, platform3.height); 
  ctx.fillRect(platform4.x, platform4.y, platform4.width, platform4.height); 

  ctx.fillStyle = "yellow";

  if (!target1.captured){
    ctx.fillRect(target1.x, target1.y, target1.width, target1.height); 

  }

  if (!target2.captured){
    ctx.fillRect(target2.x, target2.y, target2.width, target2.height); 
  }

  if (!target3.captured){

    ctx.fillRect(target3.x, target3.y, target3.width, target3.height); 

  }

  if (!target4.captured){

    ctx.fillRect(target4.x, target4.y, target4.width, target4.height); 


  }
  
 
  

  ctx.fillStyle = "blue";
  ctx.fillRect(gate.x, gate.y, gate.width, gate.height); 

  ctx.fillStyle = "yellow";
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height); // Goal

  ctx.fillStyle = "white";
  ctx.fillRect(block.x, block.y, block.width, block.height); //Block

  

  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height); //Player 

 
 




  
  
  // call update when the brows er is ready to draw again
  window.requestAnimationFrame(loop);

};

setTimeout(function intro(){


  message = false;
}, 5000)


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop)


;