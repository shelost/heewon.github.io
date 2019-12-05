const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


var points = 0;

const player = {

  x: 150,
  y: 75,
  xspeed: 0,
  yspeed: 0,

  width: 10,
  height: 5,

};


const portal1 = {

    x: 20,
    y: 10,
    width: 20,
    height: 10

}

const portal2 = {

    x: 260,
    y: 130,
    width: 20,
    height: 10

}


const wall1 = {

    x: 80,
    y: 40,

    width: 10,
    height: 40,
}

const wall2 = {

    x: 90,
    y: 40,

    width: 70,
    height: 5

}

const wall3 = {

    x: 210,
    y: 70,

    width: 10,
    height: 40
}

const wall4 = {

    x: 140,
    y: 105,

    width: 70,
    height: 5

}


const snitch = {

    x: Math.floor(Math.random() * 300),
    y: Math.floor(Math.random() * 150),

    width: 10,
    height: 5,

    xspeed: 0,
    yspeed: 0
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

    player.yspeed -= 0.3;
   

  }

  if (controller.left) {

    player.xspeed -= 0.3;


  }

  if (controller.right) {

    player.xspeed += 0.3;


  }

  if (controller.down){

    player.yspeed += 0.3;
  }


  //PHYSICS
  player.x += player.xspeed;
  player.y += player.yspeed;
  player.xspeed *= 0.9;// friction
  player.yspeed *= 0.9;// friction

  snitch.x += snitch.xspeed;
  snitch.y += snitch.yspeed;
  snitch.xspeed *= 0.9;// friction
  snitch.yspeed *= 0.9;// friction

  snitch.xspeed += Math.floor(Math.random() * 3) -1;
  snitch.yspeed += Math.floor(Math.random() * 3) -1;

  



  

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

  // SNITCH BOUNDARIES

  if (snitch.x < -20) {

    snitch.x = 320;

  } else if (snitch.x > 320) {

    snitch.x = -20;

  }

  if (snitch.y < -snitch.height){

    snitch.y = canvas.height
  }else if (snitch.y > canvas.height + snitch.height){

    snitch.y = -player.height;

  }



  // PORTALS

  if (player.x < portal1.x+portal1.width && player.x > portal1.x-portal1.width && player.y < portal1.y+portal1.height && player.y > portal1.y-player.height){

    player.x = portal2.x - 10;
    player.y = portal2.y - 10;
  }

  if (player.x < portal2.x+portal2.width && player.x > portal2.x-portal2.width && player.y < portal2.y+portal2.height && player.y > portal2.y-player.height){

    player.x = portal1.x + portal1.width + 10;
    player.y = portal1.y + portal1.height + 10;
  }

  // WALL COLLISION

  if (player.x < wall1.x+wall1.width && player.x > wall1.x-player.width && player.y < wall1.y+wall1.height && player.y > wall1.y-player.height){

    player.xspeed *= -1.5;
    player.yspeed *= -1.5;
  }

  if (player.x < wall2.x+wall2.width && player.x > wall2.x-player.width && player.y < wall2.y+wall2.height && player.y > wall2.y-player.height){

    player.xspeed *= -1.5;
    player.yspeed *= -1.5;
  }

  if (player.x < wall3.x+wall3.width && player.x > wall3.x-player.width && player.y < wall3.y+wall3.height && player.y > wall3.y-player.height){

    player.xspeed *= -1.5;
    player.yspeed *= -1.5;
  }
  
  if (player.x < wall4.x+wall4.width && player.x > wall4.x-player.width && player.y < wall4.y+wall4.height && player.y > wall4.y-player.height){

    player.xspeed *= -1.5;
    player.yspeed *= -1.5;
  }
  
  // POINTS

  if (player.x < snitch.x+snitch.width && player.x > snitch.x-player.width && player.y < snitch.y+snitch.height && player.y > snitch.y-player.height){

    player.xspeed = 0;
    player.yspeed = 0;
    points += 1;
    
}
  
  

 

  //DRAW FRAMES

  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, 320, 180);// x, y, width, height

  if (points == 0){
      
    ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height); //Player 

  } else if (points > 0){

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height); //Player 
    alert("Congrats! You got the Snitch!");
    points = 0;
    player.x = 150;
    player.y = 75;
    player.xspeed = 0;
    player.yspeed = 0;
    location.reload();
  }

  

  ctx.fillStyle = "cyan";
  ctx.fillRect(portal1.x, portal1.y, portal1.width, portal1.height); // Portals
  ctx.fillRect(portal2.x, portal2.y, portal2.width, portal2.height);

  ctx.fillStyle = "white";
  ctx.fillRect(wall1.x, wall1.y, wall1.width, wall1.height); // Walls
  ctx.fillRect(wall2.x, wall2.y, wall2.width, wall2.height);
  ctx.fillRect(wall3.x, wall3.y, wall3.width, wall3.height);
  ctx.fillRect(wall4.x, wall4.y, wall4.width, wall4.height);
  
  ctx.fillStyle = "gold";
  ctx.fillRect(snitch.x, snitch.y, snitch.width, snitch.height);
  
  

  
  // call update when the brows er is ready to draw again
  window.requestAnimationFrame(loop);

};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop)


;