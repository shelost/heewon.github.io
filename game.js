const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth-20;
ctx.canvas.height = window.innerHeight-20;



var points = 0;

var message = true;

var speedround  = false;

const player = {

  x: 30,
  y: canvas.height-30,
  xspeed: 0,
  yspeed: 0,

  width: 20,
  height: 20,

};

const chaser1 = {

  x: 150,
  y: 140,
  xspeed: 0,
  yspeed: 0,

  width: 30,
  height: 30,

}

const chaser2 = {

  x: 400,
  y: 140,
  xspeed: 0,
  yspeed: 0,

  width: 30,
  height: 30,

}

const chaser3 = {

  x: 600,
  y: 200,
  xspeed: 0,
  yspeed: 0,

  width: 30,
  height: 30,

}

const brute = {

  x: 700,
  y: 500,
  xspeed: 0,
  yspeed: 0,

  width: 90,
  height: 90,
}


const chaos = {

  x: 500,
  y: 600,
  xspeed: 0,
  yspeed: 0,

  width: 40,
  height: 40,
}

var chaoscommand = 0;



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
  

  if (controller.up) {

    player.yspeed -= 0.5;
   
  }

  if (controller.down){

    player.yspeed += 0.5;
  }

  if (controller.left) {

    player.xspeed -= 0.5;

  }

  if (controller.right) {

    player.xspeed += 0.5;

  }

  

/x
  // PLAYER MOVEMENT
  player.x += player.xspeed;
  player.y += player.yspeed;
  player.xspeed *= 0.9;// friction
  player.yspeed *= 0.9;// friction

  

  //CHASER 1

  if (speedround){

    if (player.x < chaser1.x){

      chaser1.xspeed -=0.4;
  
    }else if (player.x > chaser1.x){
  
      chaser1.xspeed +=0.4;
    }
  
    if (player.y < chaser1.y){
  
      chaser1.yspeed -=0.4;
  
    }else if (player.y > chaser1.y){
  
      chaser1.yspeed +=0.4;
    }


  }else{


    if (player.x < chaser1.x){

      chaser1.xspeed -=0.3;
  
    }else if (player.x > chaser1.x){
  
      chaser1.xspeed +=0.3;
    }
  
    if (player.y < chaser1.y){
  
      chaser1.yspeed -=0.3;
  
    }else if (player.y > chaser1.y){
  
      chaser1.yspeed +=0.3;
    }


  }

  

  chaser1.x += chaser1.xspeed;
  chaser1.y += chaser1.yspeed;
  chaser1.xspeed *= 0.9;// friction
  chaser1.yspeed *= 0.9;// friction


  // CHASER 2

  if (speedround){

    if (player.x < chaser2.x){

      chaser2.xspeed -=0.5;
  
    }else if (player.x > chaser2.x){
  
      chaser2.xspeed +=0.5;
    }
  
    if (player.y < chaser2.y){
  
      chaser2.yspeed -=0.5;
  
    }else if (player.y > chaser2.y){
  
      chaser2.yspeed +=0.5;
    }
  
  }else{

    if (player.x < chaser2.x){

      chaser2.xspeed -=0.3;
  
    }else if (player.x > chaser2.x){
  
      chaser2.xspeed +=0.3;
    }
  
    if (player.y < chaser2.y){
  
      chaser2.yspeed -=0.3;
  
    }else if (player.y > chaser2.y){
  
      chaser2.yspeed +=0.3;
    }
  

  }

  
  chaser2.x += chaser2.xspeed;
  chaser2.y += chaser2.yspeed;
  chaser2.xspeed *= 0.9;// friction
  chaser2.yspeed *= 0.9;// friction
  

  // CHASER 3

  
  if(speedround){

    if (player.x < chaser3.x){

      chaser3.xspeed -=0.4;
  
    }else if (player.x > chaser3.x){
  
      chaser3.xspeed +=0.4;
    }
  
    if (player.y < chaser3.y){
  
      chaser3.yspeed -=0.4;
  
    }else if (player.y > chaser3.y){
  
      chaser3.yspeed +=0.4;
    }



  }else{

    if (player.x < chaser3.x){

      chaser3.xspeed -=0.3;
  
    }else if (player.x > chaser3.x){
  
      chaser3.xspeed +=0.3;
    }
  
    if (player.y < chaser3.y){
  
      chaser3.yspeed -=0.3;
  
    }else if (player.y > chaser3.y){
  
      chaser3.yspeed +=0.3;
    }



  }


  chaser3.x += chaser3.xspeed;
  chaser3.y += chaser3.yspeed;
  chaser3.xspeed *= 0.9;// friction
  chaser3.yspeed *= 0.9;// friction



   // BRUTE

   if(speedround){


   if (player.x < brute.x){

    brute.xspeed -=0.3;

  }else if (player.x > brute.x){

    brute.xspeed +=0.3;
  }

  if (player.y < brute.y){

    brute.yspeed -=0.3;

  }else if (player.y > brute.y){

    brute.yspeed +=0.3;
  }
    
   }else{


   if (player.x < brute.x){

    brute.xspeed -=0.2;

  }else if (player.x > brute.x){

    brute.xspeed +=0.2;
  }

  if (player.y < brute.y){

    brute.yspeed -=0.2;

  }else if (player.y > brute.y){

    brute.yspeed +=0.2;
  }

   }

  brute.x += brute.xspeed;
  brute.y += brute.yspeed;
  brute.xspeed *= 0.9;// friction
  brute.yspeed *= 0.9;// friction


  // CHAOS

  if (chaoscommand%4 === 0){

    chaos.xspeed = Math.random()*10;
    chaos.yspeed = Math.random()*10;

  }else if (chaoscommand%4 === 1){

    chaos.xspeed = Math.random()*-10;
    chaos.yspeed = Math.random()*10;

  }else if (chaoscommand%4 === 2){

    chaos.xspeed = Math.random()*10;
    chaos.yspeed = Math.random()*-10;

  }else if (chaoscommand%4 === 3){

    chaos.xspeed = Math.random()*-10;
    chaos.yspeed = Math.random()*-10;
  }

  chaos.x += chaos.xspeed;
  chaos.y += chaos.yspeed;
  chaos.xspeed *= 0.9;// friction
  chaos.yspeed *= 0.9;// friction

  
  



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

  if (chaos.x < 0) {

    chaos.x = canvas.width-chaos.width;

  } else if (chaos.x > canvas.width-chaos.width) {

    chaos.x = 0;
  }

  if (chaos.y < 0){

    chaos.y = canvas.height-chaos.height

  }else if (chaos.y > canvas.height-chaos.height){

    chaos.y = 0;

  }


  // DEATH



  //WIN

 

  
  


  //DRAW FRAMES


  ctx.fillStyle = "black";;
  ctx.fillRect(0, 0, canvas.width, canvas.height);// x, y, width, height

  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height); //Player 

  
  if(speedround){
    
    ctx.fillStyle = "cyan";

  }else{

    ctx.fillStyle = "orange";

  }

  ctx.fillRect(chaser1.x, chaser1.y, chaser1.width, chaser1.height);
  ctx.fillRect(chaser2.x, chaser2.y, chaser2.width, chaser2.height);
  ctx.fillRect(chaser3.x, chaser3.y, chaser3.width, chaser3.height);

  ctx.fillRect(brute.x, brute.y, brute.width, brute.height);

  ctx.fillRect(chaos.x, chaos.y, chaos.width, chaos.height);

  if (message){

    ctx.font = "40px Arial";
    ctx.fillStyle = "white";

    ctx.fillText("RUN", 30, 70);

  }

  if (message){

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";

    ctx.fillText("The Game", 280, 70);

  }

  if (message){

    ctx.font = "20px Arial";
    ctx.fillStyle = "gray";

    ctx.fillText("I don't know what you did, but everyone is after you. Avoid capture for as long as you can.", 30, 110);

  }

  if (message){

    ctx.font = "20px Arial";
    ctx.fillStyle = "gray";

    ctx.fillText("Use Arrow Keys to move.", 30, 130);

  }
  




  
  
  // call update when the brows er is ready to draw again
  window.requestAnimationFrame(loop);

};

setInterval(function chaos(){

  chaoscommand = Math.floor(Math.random()*5)
}, 500)


setInterval(function speedround(){

  speedround = true;

  setTimeout(function(){


    speedround = false;

  }, 5000)
}, 15000)

setTimeout(function intro(){

  message = false;
}, 5000)




window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop)


;