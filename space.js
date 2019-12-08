const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


var points = 0;

const player = {

  x: 150,
  y: 140,
  xspeed: 0,
  yspeed: 0,

  width: 10,
  height: 5,

};

const blast = {

  fired: false,

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

  if (controller.up) {

    player.yspeed -= 0.15;
   

  }

  if (controller.left) {

    player.xspeed -= 0.15;


  }

  if (controller.right) {

    player.xspeed += 0.15;


  }

  if (controller.down){

    player.yspeed += 0.15;
  }


  // PLAYER MOVEMENT
  player.x += player.xspeed;
  player.y += player.yspeed;
  player.xspeed *= 0.9;// friction
  player.yspeed *= 0.9;// friction

  
  

  // BOUNDARY CONTROL

  if (player.x < 0) {

    player.x = 0;

  } else if (player.x > 290) {

    player.x = 290;
  }

  if (player.y < 0){

    player.y = 0

  }else if (player.y > 145){

    player.y = 145;

  }

  



  
  


  //DRAW FRAMES

  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, 320, 180);// x, y, width, height


  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.ellipse(player.x-10,player.y-3,6,3,0, 2*Math.PI, false);
  ctx.fill();


  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(player.x-10, player.y-10);
  ctx.lineTo(player.x-20, player.y);
  ctx.fill();






  
  
  // call update when the brows er is ready to draw again
  window.requestAnimationFrame(loop);

};

//BALL MOVEMENTS



window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop)


;