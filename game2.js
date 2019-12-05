const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

canvas.style.width = "1000px";
canvas.style.height = "500px";

const start = document.getElementById("start");


const player1 = {

  x: 50,
  y: 0,
  xspeed: 0,
  yspeed: 0,

  jumping: true,

  width: 20,
  height: 20,

}


const eye1 = {

  xadd: 12,
  yadd: 3


}

const eye2 = {

  xadd: 3,
  yadd: 3

}

const player2 = {

  x: 230,
  y: 0,
  xspeed: 0,
  yspeed: 0,

  jumping: true,

  width: 20,
  height: 20,

}

const platform1 = {


  x: 50,
  y: 100,
  width: 200,
  height: 5,


}

const controller1 = {

  left:false,
  right:false,
  up:false,
  fire: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 65:// A key
        controller1.left = key_state;
      break;
      case 87:// W key 
        controller1.up = key_state;
      break;
      case 68:// D key
        controller1.right = key_state;
      case 83: // S Key
        controller1.fire = key_state;
      break;

    }

  }

}

const controller2 = {

  left:false,
  right:false,
  up:false,
  fire: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller2.left = key_state;
      break;
      case 38:// up key
        controller2.up = key_state;
      break;
      case 39:// right key
        controller2.right = key_state;
      case 83: 
        controller2.fire = true;
      break;

    }

  }

}


const loop = function() {

  // PLAYER 1 MECHANICS
  
  if (controller1.up && player1.jumping == false) {

    player1.yspeed -= 20;
    player1.jumping = true;
   

  }

  if (controller1.left) {

    player1.xspeed -= 0.1;
    eye1.xadd = 3;
    eye1.yadd = 3;
    

  }

  if (controller1.right) {

    player1.xspeed += 0.1;
    eye1.xadd = 12;
    eye1.yadd = 3;


  }


  // P1 PHYSICS

  player1.yspeed += 1.0;// gravity
  player1.x += player1.xspeed;
  player1.y += player1.yspeed;
  player1.xspeed *= 0.9;// friction
  player1.yspeed *= 0.9;// friction



  // if rectangle is falling below floor line
  if (player1.y > 180 - 16 - 32) {

    player1.jumping = false;
    player1.y = 180 - 16 - 32;
    player1.yspeed = 0;

  }

  // if rectangle is going off the left of the screen
  if (player1.x < -20) {

    player1.x = 320;

  } else if (player1.x > 320) {// if rectangle goes past right boundary

    player1.x = -20;

  }

  // PLAYER 2 MECHANICS

  if (controller2.up && player2.jumping == false) {

    player2.yspeed -= 20;
    player2.jumping = true;

  }

  if (controller2.left) {

    player2.xspeed -= 0.5;
    eye2.xadd = 3;
    eye2.yadd = 3;

  }

  if (controller2.right) {

    player2.xspeed += 0.5;
    eye2.xadd = 12;
    eye2.yadd = 3;

  }

  // P2 PHYSICS

  player2.yspeed += 1.0;// gravity
  player2.x += player2.xspeed;
  player2.y += player2.yspeed;
  player2.xspeed *= 0.9;// friction
  player2.yspeed *= 0.9;// friction

  // if rectangle is falling below floor line
  if (player2.y > 180 - 16 - 32) {

    player2.jumping = false;
    player2.y = 180 - 16 - 32;
    player2.yspeed = 0;

  }

  // if rectangle is going off the left of the screen
  if (player2.x < -20) {

    player2.x = 320;

  } else if (player2.x > 320) {// if rectangle goes past right boundary

    player2.x = -20;

  }

  if (player1.x == player2.x) {

      player1.x = 0;

  }

// COLLISION

 if (player1.x > player2.x-player2.width && player1.x < player2.x + player2.width && player1.y > player2.y-player2.height && player1.y < player2.y+player2.height) {

      player1.xspeed *= -2;
      player1.yspeed *= -2;

 }


 if (player2.x > player1.x-player1.width && player2.x < player1.x + player1.width && player2.y > player1.y-player1.height && player2.y < player1.y+player1.height) {

  player2.xspeed *= -2;
  player2.yspeed *= -2;

}




  //DRAW FRAMES

  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, 320, 180);// x, y, width, height

  ctx.fillStyle = "red";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height); //Player 1
  ctx.fillStyle = "yellow";
  ctx.fillRect(player1.x + eye1.xadd, player1.y + eye1.yadd, 5, 7); //Player 1 Eye


  ctx.fillStyle = "blue";
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height); //Player 2
  ctx.fillStyle = "yellow";
  ctx.fillRect(player2.x + eye2.xadd, player2.y + eye2.yadd, 5, 7); //Player 2 Eye


  ctx. fillStyle = "yellow";
  ctx.fillRect(platform1.x, platform1.y, platform1.width, platform1.height);
  


  
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};


window.addEventListener("keydown", controller1.keyListener);
window.addEventListener("keyup", controller1.keyListener);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller2.keyListener);
window.requestAnimationFrame(loop)


;