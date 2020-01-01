// ORBIT SHOOTER
// By Heewon Ahn

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth-20;
ctx.canvas.height = window.innerHeight-20;


var centerx = canvas.width/2;
var centery = canvas.height/2;

var scl = 0.00017*canvas.height; // The scale factor helps to adjust for different screen sizes 

var showStats = false;

var startScene = true;

const deadMessages = ["DEAD", "Are you serious", "How are you this bad", "Try again", "Wow...", "You've got to be joking"];

var randi = Math.floor(Math.random() * deadMessages.length);

var winMessage = false;


const player = {

  x: 0,
  y: 0,

  radius: canvas.height*0.4,

  theta: Math.PI*3/2,

  level: 1,

  width: 400*scl,
  height: 400*scl,

  dead: false,

};

const orbits = {

  one: canvas.height*0.45,

  two: canvas.height*0.35,

  three: canvas.height*0.25,

  four: 140
}


// Enemy object contains sub-objects for individuals


const enemy = {

  width: 400*scl,
  height: 400*scl,

  thetaOne: 0,
  thetaTwo: 0,
  thetaThree: 0,

  one: {
    x: 0,
    y: 0,
  },

  two: {
    x: 0,
    y: 0,
  },

  three: {
    x: 0,
    y: 0,
  },

  four: {
    x: 0,
    y: 0,
  },

  five: {
    x: 0,
    y: 0,
  },

  six: {
    x: 0,
    y: 0,
  },

  seven: {
    x: 0,
    y: 0,
  },

  eight: {
    x: 0,
    y: 0
  },

  nine: {
    x: 0,
    y: 0,
  }

}

const blast = {

  fired: false,
  size: canvas.height*0.015,

  theta: Math.PI * 3/2,
  radius: canvas.height*0.4,

  width: 250*scl,
  height: 250*scl,


  x: 0,
  y: 0
}

const planet = {

  lives: 5
}

// IMAGES

const ship = new Image();
ship.src = './IMG/spaceship.png';

const cometA = new Image();
cometA.src = './IMG/comet-1.png';

const cometB = new Image();
cometB.src = './IMG/comet-2.png';

const cometC = new Image();
cometC.src = './IMG/comet-3.png';

const starA = new Image();
starA.src = './IMG/star-5.png';

const starB = new Image();
starB.src = './IMG/star-4.png';

const starC = new Image();
starC.src = './IMG/star-3.png';

const starD = new Image();
starD.src = './IMG/star-2.png';

const starE = new Image();
starE.src = './IMG/star-1.png';

const starF = new Image();
starF.src = './IMG/star-0.png';

// Handle Input

const controller = {

  left:false,
  right:false,
  up:false,
  down: false,
  fire: false,

  keyListener:function(event) {

    var key_down = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// Left
        controller.left = key_down;
        break;

      case 39:// Right
        controller.right = key_down;
        break;

      case 38:// Up
        controller.up = key_down;
        break;
      
      case 40: // Down
        controller.down = key_down;
        break;

      case 32: // Spacebar
        controller.fire = key_down;
        break;

      case 83: // S Key
        showStats = true;
        break;

      case 88: // X Key
        showStats = false;
        break;

    }
  }
}

// Main Animation Loop

const loop = function(time) {

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-20;
  });

  // Handle Input

  if (controller.up) {

    player.level +=1;
  }

  if (controller.down){

    player.level -= 1;
  }

  if (controller.left) {

    player.theta += 0.02;
  }

  if (controller.right) {

    player.theta += -0.02;
  }


  if (controller.fire){

    blast.fired = true;
  }

  player.x = -player.radius*Math.cos(player.theta) + centerx;
  player.y = -player.radius*Math.sin(player.theta) + centery;

  // Inter-Orbit Movement
  // Bit sloppy, but it works

  if (player.level < 0){

    player.level = 0;

  }else if (0 <= player.level && player.level < 7){

    player.radius = orbits.one;

  }else if (7 <= player.level && player.level < 14){

    player.radius = orbits.two;

  }else if (14 <= player.level && player.level < 21){

    player.radius = orbits.three;

  }else if (21 <= player.level){

    player.level = 20;
  }

  // Enemy Movement

  if (!startScene){

    enemy.thetaOne += 0.03;
    enemy.thetaTwo += 0.03;
    enemy.thetaThree += 0.03;

  }

  enemy.one.x = -orbits.one * Math.cos(enemy.thetaOne + Math.PI/2) + centerx;
  enemy.one.y = -orbits.one * Math.sin(enemy.thetaOne + Math.PI/2) + centery;

  enemy.two.x = -orbits.one * Math.cos(enemy.thetaOne + Math.PI*7/6) + centerx;
  enemy.two.y = -orbits.one * Math.sin(enemy.thetaOne + Math.PI*7/6) + centery;

  enemy.three.x = -orbits.one * Math.cos(enemy.thetaOne + Math.PI*11/6) + centerx;
  enemy.three.y = -orbits.one * Math.sin(enemy.thetaOne + Math.PI*11/6) + centery;

  enemy.four.x = -orbits.two * Math.cos(enemy.thetaTwo + Math.PI*2/3) + centerx;
  enemy.four.y = orbits.two * Math.sin(enemy.thetaTwo + Math.PI*2/3) + centery;

  enemy.five.x = -orbits.two * Math.cos(enemy.thetaTwo + Math.PI*4/3) + centerx;
  enemy.five.y = orbits.two * Math.sin(enemy.thetaTwo + Math.PI*4/3) + centery;

  enemy.six.x = -orbits.two * Math.cos(enemy.thetaTwo + Math.PI*2) + centerx;
  enemy.six.y = orbits.two * Math.sin(enemy.thetaTwo + Math.PI*2) + centery;

  enemy.seven.x = -orbits.three * Math.cos(enemy.thetaThree + Math.PI/2) + centerx;
  enemy.seven.y = -orbits.three * Math.sin(enemy.thetaThree + Math.PI/2) + centery;

  enemy.eight.x = -orbits.three * Math.cos(enemy.thetaThree + Math.PI*7/6) + centerx;
  enemy.eight.y = -orbits.three * Math.sin(enemy.thetaThree + Math.PI*7/6) + centery;

  enemy.nine.x = -orbits.three * Math.cos(enemy.thetaThree + Math.PI*11/6) + centerx;
  enemy.nine.y = -orbits.three * Math.sin(enemy.thetaThree + Math.PI*11/6) + centery;

  // Blasts

  blast.x = -blast.radius * Math.cos(blast.theta) + centerx;
  blast.y = -blast.radius * Math.sin(blast.theta) + centery;

  if (!blast.fired){

    blast.radius = player.radius;
    blast.theta = player.theta;

  }else if (blast.fired){

    blast.radius -= 8;
    blast.size *= 1.01;
  }

  if (blast.radius < starA.height*scl/2 && blast.fired){

    blast.fired = false;
    blast.size = canvas.height*0.015;
    planet.lives -= 1;

  }




  // Death
  // There's definitely a better way to do this
  // I just didn't want to deal with classes and factories

  if (player.x < enemy.one.x+enemy.width && player.x > enemy.one.x-player.width && 
    player.y < enemy.one.y+enemy.height && player.y > enemy.one.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaOne += 0.1;
  };

  if (player.x < enemy.two.x+enemy.width && player.x > enemy.two.x-player.width && 
    player.y < enemy.two.y+enemy.height && player.y > enemy.two.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaOne += 0.1;
  };

  if (player.x < enemy.three.x+enemy.width && player.x > enemy.three.x-player.width && 
    player.y < enemy.three.y+enemy.height && player.y > enemy.three.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaOne += 0.1;
  };

  if (player.x < enemy.four.x+enemy.width && player.x > enemy.four.x-player.width && 
    player.y < enemy.four.y+enemy.height && player.y > enemy.four.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaTwo += 0.5;
  };

  if (player.x < enemy.five.x+enemy.width && player.x > enemy.five.x-player.width && 
    player.y < enemy.five.y+enemy.height && player.y > enemy.five.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaTwo += 0.5;
  };

  if (player.x < enemy.six.x+enemy.width && player.x > enemy.six.x-player.width && 
    player.y < enemy.six.y+enemy.height && player.y > enemy.six.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaTwo += 0.5;
  };

  if (player.x < enemy.seven.x+enemy.width && player.x > enemy.seven.x-player.width && 
    player.y < enemy.seven.y+enemy.height && player.y > enemy.seven.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaThree += 0.5;
  };

  if (player.x < enemy.eight.x+enemy.width && player.x > enemy.eight.x-player.width && 
    player.y < enemy.eight.y+enemy.height && player.y > enemy.eight.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaThree += 0.5;
  };

  if (player.x < enemy.nine.x+enemy.width && player.x > enemy.nine.x-player.width && 
    player.y < enemy.nine.y+enemy.height && player.y > enemy.nine.y-player.height && !player.dead){

    player.dead = true;
    enemy.thetaThree += 0.5;
  };

  if (player.dead){ // Handle Death

    reset();
  
    setTimeout(function(){
      player.dead = false;
      randi = Math.floor(Math.random() * deadMessages.length);
      
    }, 300)
  
  }

  if (planet.lives <= 0){

    restart(); 

  }

  

  // DRAW FRAMES

  if (!player.dead){
    ctx.fillStyle = "#98A6FF";

  }else{

    ctx.fillStyle = "#6F83FF";


  }

  
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Background

  // Collision Boxes
  
  if (showStats){

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x-player.width/2 , player.y-player.height/2, player.width, player.height);

    ctx.fillRect(enemy.one.x-enemy.width/2, enemy.one.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.two.x-enemy.width/2, enemy.two.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.three.x-enemy.width/2, enemy.three.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.four.x-enemy.width/2, enemy.four.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.five.x-enemy.width/2, enemy.five.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.six.x-enemy.width/2, enemy.six.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.seven.x-enemy.width/2, enemy.seven.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.eight.x-enemy.width/2, enemy.eight.y - enemy.height/2, enemy.width, enemy.height);
    ctx.fillRect(enemy.nine.x-enemy.width/2, enemy.nine.y - enemy.height/2, enemy.width, enemy.height);

    ctx.fillRect(blast.x-blast.width/2, blast.y - blast.height/2, blast.width, blast.height);
  }

  // Sprites

  ctx.strokeStyle = "#A6B3FF";
  ctx.beginPath();
  ctx.arc(centerx, centery, orbits.one, 0, 2*Math.PI), false; // Orbit 1
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.closePath();

  ctx.strokeStyle = "#B8C2FF";
  ctx.beginPath();
  ctx.arc(centerx, centery, orbits.two, 0, 2*Math.PI), false; // Orbit 2
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.closePath();

  ctx.strokeStyle = "#CAD2FF";
  ctx.beginPath();
  ctx.arc(centerx, centery, orbits.three, 0, 2*Math.PI), false; // Orbit 3
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.closePath();

  rotate(cometA, enemy.one.x, enemy.one.y, scl, time/1000); // Comets
  rotate(cometB, enemy.two.x, enemy.two.y, scl, time/1000);
  rotate(cometC, enemy.three.x, enemy.three.y, scl, time/1000);
  rotate(cometA, enemy.four.x, enemy.four.y, scl*1.15, time/700);
  rotate(cometB, enemy.five.x, enemy.five.y, scl*1.15, time/700);
  rotate(cometC, enemy.six.x, enemy.six.y, scl*1.15, time/700);
  rotate(cometA, enemy.seven.x, enemy.seven.y, scl*1.3, time/700);
  rotate(cometB, enemy.eight.x, enemy.eight.y, scl*1.3, time/700);
  rotate(cometC, enemy.nine.x, enemy.nine.y, scl*1.3, time/700);



  if (planet.lives === 5){

    ctx.drawImage(starA, centerx-starA.width*scl/2, centery-starA.height*scl/2, starA.width*scl, starA.height*scl) // Star

  }else if (planet.lives === 4){

    ctx.drawImage(starB, centerx-starB.width*scl/2, centery-starB.height*scl/2, starB.width*scl, starB.height*scl)

  }else if (planet.lives === 3){

    ctx.drawImage(starC, centerx-starC.width*scl/2, centery-starC.height*scl/2, starC.width*scl, starC.height*scl)

  }else if (planet.lives === 2){

    ctx.drawImage(starD, centerx-starD.width*scl/2, centery-starD.height*scl/2, starD.width*scl, starD.height*scl)

  }else if (planet.lives === 1){

    ctx.drawImage(starE, centerx-starE.width*scl/2, centery-starE.height*scl/2, starE.width*scl, starE.height*scl)
  }else{

    ctx.drawImage(starF, centerx-starF.width*scl/2, centery-starF.height*scl/2, starF.width*scl, starF.height*scl)
  }

  

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(blast.x, blast.y, blast.size, 0, 2*Math.PI), false; // Blast
  ctx.lineWidth = 5;
  ctx.fill();
  ctx.closePath();

  rotate(ship, player.x, player.y, scl*0.8, player.theta+Math.PI/2); // Player

  // TEXT

  if (showStats){

    ctx.fillStyle = "black"; // Stats
    ctx.font = "20px Arial";
    ctx.fillText("player.theta", 20, 30);
    ctx.fillText("player.radius", 20, 90);
    ctx.fillText("blast.fired?", 20, 150);
    ctx.fillText("planet.lives", 20, 210);
    ctx.fillText("player.dead?", 20, 270);
    
    ctx.fillStyle = "purple";
    ctx.fillText(player.theta, 20, 60);
    ctx.fillText(player.radius, 20, 120);
    ctx.fillText(blast.fired, 20, 180);
    ctx.fillText(planet.lives, 20, 240);
    ctx.fillText(player.dead, 20, 300);
  }

  if (player.dead){

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(deadMessages[randi], canvas.width-400, canvas.height-20) //  Dead Message

  }

  // call update when the brows er is ready to draw again
  window.requestAnimationFrame(loop);

};

function rotate(img, x, y, scale, rot){
  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(rot);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function reset(){

  player.theta = Math.PI*3/2;
  player.level = 1;
  planet.lives = 5;

  controller.right = false;
  controller.left = false;

  blast.radius = player.radius;
  blast.theta = player.theta;
  blast.size = canvas.height*0.015;
  blast.fired = false;
  
}

function restart(){

  var restart = confirm("You win! Press OK to restart.");

  if (restart){

    reset();
  }

}



setTimeout(function(){

  startScene = false;

},3000)




// Initialize

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);