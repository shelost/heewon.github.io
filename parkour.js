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

const block1 = {

  x: 150,
  y: 130,
  xspeed: 0,

  width: 140,
  height: 5,

  right: true,
  left: false
}

const block2 = {

  x: 150,
  y: 115,
  xspeed: 0,


  width: 140,
  height: 5,

  right: false,
  left: true
}

const creep = {

  x: 150,
  y: 100,

  width: 10,
  height: 5

}

const chaos1 = {

  x: 150,
  y: 80,

  width: 10,
  height: 10,

  xspeed: 0
}

const chaos2 = {

  x: 150,
  y: 70,

  width: 10,
  height: 10,

  xspeed: 0
}

const line = {

  x: 0,
  y: 50,

  width: 300,
  height: 10,

  exists: true
}

const wall = {

  x: 0,
  y: 30,

  width: 285,
  height: 5
}

const door = {

  x: 285,
  y: 30,

  width: 15,
  height: 5,

  flicker: false

}

const goal = {

  x: 143,
  y: 5,

  width: 14,
  height: 7
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


var dead = false;
var win = false;


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

  
  
  // BLOCK 1 MOVEMENT

  block1.x += block1.xspeed;
  block1.xspeed *= 0.9;// friction
  
  if (block1.x < 10){

    block1.right = true;
    block1.left = false;
  }else if (block1.x > 190){
    block1.right = false;
    block1.left = true;
  };

  if (block1.right){
    block1.xspeed += 0.5;
  }else if (block1.left){
    block1.xspeed -= 0.5;

  }

  // BLOCK 2 MOVEMENT

  block2.x += block2.xspeed;
  block2.xspeed *= 0.9;// friction
  
  if (block2.x < 10){

    block2.right = true;
    block2.left = false;
  }else if (block2.x > 190){
    block2.right = false;
    block2.left = true;
  };

  if (block2.right){
    block2.xspeed += 0.5;
  }else if (block2.left){
    block2.xspeed -= 0.5;

  }


  //CREEP MOVEMENT

  creep.x += player.xspeed;

  
  //CHAOS 1 MOVEMENT
  chaos1.x += chaos1.xspeed;
  chaos1.xspeed *= 0.9;// friction

  chaos1.xspeed += (Math.random() < 0.5)? -1.5:1.5;

  if (chaos1.x > 290){

    chaos1.xspeed  *= -2;
  }else if (chaos1.x < 0){

    chaos1.xspeed  *= -2;
  }

  //CHAOS 2 MOVEMENT
  chaos2.x += chaos2.xspeed;
  chaos2.xspeed *= 0.9;// friction

  chaos2.xspeed += (Math.random() < 0.5)? -1.5:1.5;

  if (chaos2.x > 290){

    chaos2.xspeed  *= -2;
  }else if (chaos2.x < 0){

    chaos2.xspeed  *= -2;
  }
  
  

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

  // DEATH

  if (player.x < block1.x+block1.width && player.x > block1.x-player.width && player.y < block1.y+block1.height && player.y > block1.y-player.height){

    
    player.xspeed *= -1;
    player.yspeed *= -1;
    dead = true;
  };

  if (player.x < block2.x+block2.width && player.x > block2.x-player.width && player.y < block2.y+block2.height && player.y > block2.y-player.height){

    player.xspeed *= -1;
    player.yspeed *= -1;
    dead = true;
  };

  if (player.x < chaos1.x+chaos1.width && player.x > chaos1.x-player.width && player.y < chaos1.y+chaos1.height && player.y > chaos1.y-player.height){

    player.xspeed *= -1;
    player.yspeed *= -1;
    dead=true;
  };


  if (player.x < chaos2.x+chaos2.width && player.x > chaos2.x-player.width && player.y < chaos2.y+chaos2.height && player.y > chaos2.y-player.height){

    player.xspeed *= -1;
    player.yspeed *= -1;
    dead=true;
  }

  if (player.x < line.x+line.width && player.x > line.x-player.width && player.y < line.y+line.height && player.y > line.y-player.height && line.exists == true){

    player.xspeed *= -1;
    player.yspeed *= -1;
    dead=true;
  };

  if (player.x < wall.x+wall.width && player.x > wall.x-player.width && player.y < wall.y+wall.height && player.y > wall.y-player.height){

    player.xspeed *= -1;
    player.yspeed *= -1;
    dead=true;
  };

  if (player.x < creep.x+creep.width && player.x > creep.x-player.width && player.y < creep.y+creep.height && player.y > creep.y-player.height){

    player.xspeed *= -1;
    player.yspeed *= -1;
    dead=true;
  };

  if (dead){
    
    player.x = 0;
    dead = false;
    alert("You're DEAD");
    location.reload();
  }

  //WIN

  if (player.x < goal.x+goal.width && player.x > goal.x-player.width && player.y < goal.y+goal.height && player.y > goal.y-player.height){
    win=true;
  };


  

  if (win){

    player.x = 0;
    win = false;
    alert("CONGRATS! You win!");
    location.reload();


  }



  
  


  //DRAW FRAMES

  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 0, 320, 180);// x, y, width, height


  ctx.fillStyle = "white";
  ctx.fillRect(block1.x, block1.y, block1.width, block1.height);  // Blocks
  ctx.fillRect(block2.x, block2.y, block2.width, block2.height); 

  ctx.fillStyle = "orange";
  ctx.fillRect(creep.x, creep.y, creep.width, creep.height); // Ball
  ctx.fill();
  
  ctx.fillStyle = "white";
  ctx.fillRect(chaos1.x, chaos1.y, chaos1.width, chaos1.height); // Chaos
  ctx.fillRect(chaos2.x, chaos2.y, chaos2.width, chaos2.height); 

  if (line.exists == true){

  ctx.fillStyle = "white";
  ctx.fillRect(line.x, line.y, line.width, line.height); // Line

  }else{

    ctx.fillStyle = "lightgreen";
    ctx.fillRect(line.x, line.y, line.width, line.height);

  };

  ctx.fillStyle = "white";
  ctx.fillRect(wall.x, wall.y, wall.width, wall.height); // Wall

  if (door.flicker == true){

    ctx.fillStyle = "lightgray";
    ctx.fillRect(door.x, door.y , door.width, door.height); // Door
  
    }else{
  
      ctx.fillStyle = "white";
      ctx.fillRect(door.x, door.y , door.width, door.height);
      
    };
  ctx.fillRect(door.x, door.y, door.width, door.height);
  
  

  ctx.fillStyle = "cyan";
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height); // Goal

  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height); //Player 






  
  
  // call update when the brows er is ready to draw again
  window.requestAnimationFrame(loop);

};

//BALL MOVEMENTS


setInterval(function(){

  
  line.exists = false;

  setTimeout(function(){

    line.exists = true;

  }, 1000)

  
}, 2000);

setInterval(function(){

  door.flicker = true;

  setTimeout(function(){

    door.flicker = false;

  }, 100)


}, 1000);


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop)


;