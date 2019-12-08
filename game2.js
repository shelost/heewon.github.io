const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

canvas.style.width = "1000px";
canvas.style.height = "500px";

const start = document.getElementById("start");

var shrooms1 = false;
var shrooms2 = false;

const shroom = {

  x: 145,
  y: 100,

  width: 6,
  height: 6

}


const player1 = {

  x: 50,
  y: 130,
  xspeed: 0,
  yspeed: 0,

  jumping: true,

  width: 20,
  height: 20,

  dead: false

}


const eye1 = {

  xadd: 6,
  yadd: 2,

  width: 4,
  height: 8


}

const eye2 = {

  xadd: 2,
  yadd: 2,

  width: 4,
  height: 8

}

const player2 = {

  x: 240,
  y: 130,
  xspeed: 0,
  yspeed: 0,

  jumping: true,

  width: 20,
  height: 20,

  dead: false

}

const platform1 = {


  x: 50,
  y: 100,
  width: 200,
  height: 5,


}

const snow1 = {

  x: Math.floor(Math.random()*300),
  y: 0,

  width: 20,
  height: 20
}


const snow2 = {

  x: Math.floor(Math.random()*300),
  y: 0,

  width: 20,
  height: 20
}

const snow3 = {

  x: Math.floor(Math.random()*300),
  y: 0,

  width: 20,
  height: 20
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

    player1.yspeed -= 15;
    player1.jumping = true;
   

  }

  if (controller1.left) {

    player1.xspeed -= 0.3;
    if (shrooms1){

      eye1.xadd = 2;
      eye1.yadd = 2;

    }else if (!shrooms1){

      eye1.xadd = 4;
      eye1.yadd = 4;
    };
   

  }

  if (controller1.right) {

    player1.xspeed += 0.3;
    if (shrooms1){

      eye1.xadd = 6;
      eye1.yadd = 2;

    }else if (!shrooms1){

      eye1.xadd = 12;
      eye1.yadd = 4;
    };


  }


  // P1 PHYSICS

  player1.yspeed += 1.0;// gravity
  player1.x += player1.xspeed;
  player1.y += player1.yspeed;
  player1.xspeed *= 0.9;// friction
  player1.yspeed *= 0.9;// friction



  // if rectangle is falling below floor line
  if (shrooms1 && player1.y > 180 - 16 - 24) {

    player1.jumping = false;
    player1.y = 180 - 16 - 24;
    player1.yspeed = 0;

  }else if (!shrooms1 && player1.y > 180 - 16 - 32){

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

    player2.yspeed -= 15;
    player2.jumping = true;

  }

  if (controller2.left) {

    player2.xspeed -= 0.5;

    if (shrooms2){

      eye2.xadd = 2;
      eye2.yadd = 2;

    }else if (!shrooms2){

      eye2.xadd = 4;
      eye2.yadd = 4;
    };
   

  }

  if (controller2.right) {

    player2.xspeed += 0.5;

    if (shrooms2 == 1){

      eye2.xadd = 6;
      eye2.yadd = 2;

    }else if (shrooms2 == 0){

      eye2.xadd = 12;
      eye2.yadd = 4;
    };

  }

  // P2 PHYSICS

  player2.yspeed += 1.0;// gravity
  player2.x += player2.xspeed;
  player2.y += player2.yspeed;
  player2.xspeed *= 0.9;// friction
  player2.yspeed *= 0.9;// friction

  // if rectangle is falling below floor line
  if (shrooms2 && player2.y > 180 - 16 - 24) {

    player2.jumping = false;
    player2.y = 180 - 16 - 24;
    player2.yspeed = 0;

  }else if (!shrooms2 && player2.y > 180 - 16 - 32){

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

//SHROOM

if (player2.x > shroom.x-shroom.width && player2.x < shroom.x + shroom.width && player2.y > shroom.y-shroom.height && player2.y < shroom.y+shroom.height){

  shrooms2 = true;

}

if (player1.x > shroom.x-shroom.width && player1.x < shroom.x + shroom.width && player1.y > shroom.y-shroom.height && player1.y < shroom.y+shroom.height){

  shrooms1 = true;

}

if (shrooms2){

  player2.width = 10;
  player2.height = 10;

  eye2.width = 2;
  eye2.height = 4;



};

if (shrooms1){

  player1.width = 10;
  player1.height = 10;

  eye1.width = 2;
  eye1.height = 4;


};


shroom.y += 2.5;

if(shroom.y > 150 - shroom.height){

  shroom.y = 0;
  shroom.x = Math.floor(Math.random()*150);
}


//SNOW 

snow1.y += 2;

if(snow1.y > 150 - snow1.height){

  snow1.y = 0;
  snow1.x = Math.floor(Math.random()*150);
}

snow2.y += 1.5;

if(snow2.y > 150 - snow2.height){

  snow2.y = 0;
  snow2.x = Math.floor(Math.random()*150)+150;
}

snow3.y += 2.5;

if(snow3.y > 150 - snow3.height){

  snow3.y = 0;
  snow3.x = Math.floor(Math.random()*300);
}

//DEATH


var signal = false;

if (player1.x < snow1.x+snow1.width && player1.x > snow1.x-player1.width && player1.y < snow1.y+snow1.height && player1.y > snow1.y-player1.height && !player1.dead){
  signal = true;
  player1.dead=true;
  snow1.y = 0;
};

if (player1.x < snow2.x+snow2.width && player1.x > snow2.x-player1.width && player1.y < snow2.y+snow2.height && player1.y > snow2.y-player1.height && !player1.dead){
  signal = true;
  player1.dead=true;
  snow2.y = 0;
};

if (player1.x < snow3.x+snow3.width && player1.x > snow3.x-player1.width && player1.y < snow3.y+snow3.height && player1.y > snow3.y-player1.height && !player1.dead){
  signal = true;
  player1.dead=true;
  snow3.y = 0;
};

if (player2.x < snow1.x+snow1.width && player2.x > snow1.x-player2.width && player2.y < snow1.y+snow1.height && player2.y > snow1.y-player2.height && !player2.dead){

  signal = true;
  player2.dead=true;
  snow1.y = 0;
};

if (player2.x < snow2.x+snow2.width && player2.x > snow2.x-player2.width && player2.y < snow2.y+snow2.height && player2.y > snow2.y-player2.height &&!player2.dead){
  signal = true;
  player2.dead=true;
  snow2.y = 0;
};

if (player2.x < snow3.x+snow3.width && player2.x > snow3.x-player2.width && player2.y < snow3.y+snow3.height && player2.y > snow3.y-player2.height&& !player2.dead){
  signal = true;
  player2.dead=true;
  snow3.y = 0;
};

if (player1.dead && !player2.dead && signal){

  alert("Red is dead. Good luck, Blue!");
  signal = false;
}else if (player2.dead && !player1.dead && signal){

  alert("Blue is dead. Good luck, Red!");
  signal = false;
}else if (player2.dead && !player1.dead && signal){

  alert("Better luck next time!");
  signal = false;
  location.reload();
}




  //DRAW FRAMES

  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, 320, 180);// x, y, width, height

  
  if (!player1.dead){
    ctx.fillStyle = "red";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height); //Player 1
    ctx.fillStyle = "yellow";
    ctx.fillRect(player1.x + eye1.xadd, player1.y + eye1.yadd, eye1.width, eye1.height); //Player 1 Eye

  }else{

    ctx.fillStyle = "gray";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height); //Player 1

  }
 
  if(!player2.dead){
  ctx.fillStyle = "blue";
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height); //Player 2
  ctx.fillStyle = "yellow";
  ctx.fillRect(player2.x + eye2.xadd, player2.y + eye2.yadd, eye2.width, eye2.height); //Player 2 Eye


}else{

  ctx.fillStyle = "gray";
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}




ctx.fillStyle = "cyan";
ctx.fillRect(shroom.x, shroom.y, shroom.width, shroom.height); // Shroom
  
  
 

  ctx.fillStyle = "white";
  ctx.fillRect(snow1.x, snow1.y, snow1.width, snow1.height);
  ctx.fillRect(snow2.x, snow2.y, snow2.width, snow2.height);
  ctx.fillRect(snow3.x, snow3.y, snow3.width, snow3.height);


  
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};





window.addEventListener("keydown", controller1.keyListener);
window.addEventListener("keyup", controller1.keyListener);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller2.keyListener);
window.requestAnimationFrame(loop)


;