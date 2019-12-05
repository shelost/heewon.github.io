
var context, controller1,controller2,  player1, player2, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

player1 = {

  height:32,
  jumping:true,
  width:32,
  x:50, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

}

player2 = {
	
  height:32,
  jumping:true,
  width:32,
  x:250, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0
	
}

// PLAYER 1 CONTROLS

controller1 = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller1.left = key_state;
      break;
      case 38:// up key
        controller1.up = key_state;
      break;
      case 39:// right key
        controller1.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (controller1.up && player1.jumping == false) {

    player1.y_velocity -= 20;
    player1.jumping = true;

  }

  if (controller1.left) {

    player1.x_velocity -= 0.5;

  }

  if (controller1.right) {

    player1.x_velocity += 0.5;

  }

  player1.y_velocity += 1.0;// gravity
  player1.x += player1.x_velocity;
  player1.y += player1.y_velocity;
  player1.x_velocity *= 0.9;// friction
  player1.y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (player1.y > 180 - 16 - 32) {

    player1.jumping = false;
    player1.y = 180 - 16 - 32;
    player1.y_velocity = 0;

  }

  // if rectangle is going off the left of the screen
  if (player1.x < -32) {

    player1.x = 320;

  } else if (player1.x > 320) {// if rectangle goes past right boundary

    player1.x = -32;

  }


  //PLAYER 2 CONTROLS


  controller2 = {

    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
  
      var key_state = (event.type == "keydown")?true:false;
  
      switch(event.keyCode) {
  
        case 65:// A key
          controller2.left = key_state;
        break;
        case 87:// W key
          controller2.up = key_state;
        break;
        case 68:// D key
          controller2.right = key_state;
        break;
  
      }
  
    }
  
  };


  





  // DRAW FRAMES
  
  context.fillStyle = "#202020";
  context.fillRect(0, 0, 320, 180);// x, y, width, height
  context.fillStyle = "#ff0000";// hex for red
  context.beginPath();
  context.rect(player1.x, player1.y, player1.width, player1.height);
  context.fill();
  context.beginPath();
  context.rect(player2.x, player2.y, player2.width, player2.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller1.keyListener);
window.addEventListener("keyup", controller1.keyListener);
window.requestAnimationFrame(loop)};
