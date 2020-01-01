
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


const s = {

  activelvl: true


}

const g = {

  player: {

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
  
  },
  
  block: {
  
    x: 500,
    y: canvas.height-30,
    xspeed: 0,
    yspeed: 0,
  
    width: 20,
    height: 20,
  
  },
  
  river: {
  
    x: 0,
    y: canvas.height/3,
  
    width: canvas.width,
    height: canvas.height/2
  },
  
  platform1: {
  
    x: 0,
    y: river.y+river.height*3/4,
  
    xspeed: 0,
    yspeed: 0,
  
    right: true,
  
    width: canvas.width/4,
    height: river.height/4
  },
  
  platform2: {
  
    x: 800,
    y: river.y+river.height/2,

    xspeed: 0,
    yspeed: 0,
  
    right: false,
  
    width: canvas.width/5,
    height: river.height/4
  },
  
  platform3: {
  
    x: canvas.width - 800,
    y: river.y+river.height/4,
  
    xspeed: 0,
    yspeed: 0,
  
    right: true,
  
    width: canvas.width/6,
    height: river.height/4
  },
  
  platform4: {
  
    x: canvas.width-200,
    y: river.y,
  
    xspeed: 0,
    yspeed: 0,
  
    right: false,
  
    width: canvas.width/7,
    height: river.height/4
  },
  
  target1: {
  
    x: platform1.x + 100,
    y: platform1.y + 40,
  
    width: 20,
    height: 20,
  
    captured: false
  },
  
  target2: {
  
    x: platform2.x + 100,
    y: platform2.y + 40,
  
    width: 20,
    height: 20,
  
    captured: false
  },
  
  target3: {
  
    x: platform3.x + 50,
    y: platform3.y + 40,
  
    width: 20,
    height: 20,
  
    captured: false
  },
  
  target4: {
  
    x: platform4.x + 50,
    y: platform4.y + 40,
  
    width: 20,
    height: 20,
  
    captured: false
  },
  
  goal: {
  
    x: canvas.width/2,
    y: 20,
  
    width: 30,
    height: 30
  },
  
  gate: {
  
    x: canvas.width/2-35,
    y: 0,
  
    width: 100,
    height: 70
  }


};



const loop = function() {

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-20;
  });
  


  window.addEventListener('click', function(event){

    var mousex = event.clientX;
    var mousey = event.clientY;

    g.block.x = mousex-g.block.width;
    g.block.y = mousey-g.block.height;


  })

  // PLAYER MOVEMENT

  if(g.player.x < g.block.x){

    g.player.xspeed +=0.7;
  }

  if (g.player.x > g.block.x){

    g.player.xspeed -= 0.7;
  }

  if (g.player.y < g.block.y){

    g.player.yspeed += 0.7;

  }

  if (g.player.y > g.block.y){

    g.player.yspeed -= 0.7;
  }
  
  g.player.x += g.player.xspeed;
  g.player.y += g.player.yspeed;
  g.player.xspeed *= 0.9;// friction
  g.player.yspeed *= 0.9;// friction

  // PLATFORM 1

  if (g.platform1.x <0){

    g.platform1.right = true;


    g.platform1.right = false;
  }

  if (g.platform1.right){

    g.platform1.xspeed += 0.6;
  }else{

    g.platform1.xspeed -= 0.6;
  }

  g.platform1.x += g.platform1.xspeed;
  g.platform1.xspeed *= 0.9;

  // PLATFORM 2

  if (g.platform2.x <0){

    g.platform2.right = true;

  }else if (g.platform2.x > canvas.width-g.platform2.width){

    g.platform2.right = false;
  }

  if (g.platform2.right){

    g.platform2.xspeed += 0.5;
  }else{

    g.platform2.xspeed -= 0.5;
  }

  g.platform2.x += g.platform2.xspeed;
  g.platform2.xspeed *= 0.9;

   // PLATFORM 3

   if (g.platform3.x <0){

    g.platform3.right = true;

  }else if (g.platform3.x > canvas.width-g.platform3.width){

    g.platform3.right = false;
  }

  if (g.platform3.right){

    g.platform3.xspeed += 0.5;
  }else{

    g.platform3.xspeed -= 0.5;
  }

  g.platform3.x += g.platform3.xspeed;
  g.platform3.xspeed *= 0.9;

  // PLATFORM 4

  if (g.platform4.x <0){

    g.platform4.right = true;

  }else if (g.platform4.x > canvas.width-g.platform4.width){

    g.platform4.right = false;
  }

  if (g.platform4.right){

    g.platform4.xspeed += 0.6;
  }else{

    g.platform4.xspeed -= 0.6;
  }

  g.platform4.x += g.platform4.xspeed;
  g.platform4.xspeed *= 0.9;

  // BLOCK + PLATFORM

  if (g.block.y > g.platform1.y-g.block.height && g.block.y < g.platform1.y+g.platform1.height && g.block.x < g.platform1.x+g.platform1.width && g.block.x > g.platform1.x-g.block.width){

    g.block.x += g.platform1.xspeed*1.1;
  }

  if (g.block.y > g.platform2.y-g.block.height && g.block.y < g.platform2.y+g.platform2.height && g.block.x < pg.latform2.x+g.platform2.width && g.block.x > g.platform2.x-g.block.width){

    g.block.x += g.platform2.xspeed*1.1;
  }

  if (g.block.y > g.platform3.y-g.block.height && g.block.y < g.platform3.y+g.platform3.height && g.block.x < g.platform3.x+g.platform3.width && g.block.x > g.platform3.x-g.block.width){

    g.block.x += g.platform3.xspeed*1.1;
  }

  if (g.block.y > g.platform4.y-g.block.height && g.block.y < g.platform4.y+g.platform4.height && g.block.x < g.platform4.x+g.platform4.width && g.block.x > g.platform4.x-g.block.width){

    g.block.x += g.platform4.xspeed*1.1;
  }

  // PLAYER + PLATFORM

  if (g.player.y > g.platform1.y-g.player.height && g.player.y < g.platform1.y+g.platform1.height && g.player.x < g.platform1.x+g.platform1.width && g.player.x > pg.latform1.x-g.player.width){

    g.player.onPlatform1 = true;

  }else{

    g.player.onPlatform1 = false; 
  }

  if (g.player.y > g.platform2.y-g.player.height && g.player.y < g.platform2.y+g.platform2.height && g.player.x < g.platform2.x+g.platform2.width && g.player.x > g.platform2.x-g.player.width){

    g.player.onPlatform2 = true;

  }else{

    g.player.onPlatform2 = false;
  }

  if (g.player.y > g.platform3.y-g.player.height && g.player.y < g.platform3.y+g.platform3.height && g.player.x < g.platform3.x+g.platform3.width && g.player.x > g.platform3.x-g.player.width){

    g.player.onPlatform3 = true;

  }else{

    g.player.onPlatform3 = false;

  }

  if (g.player.y > g.platform4.y-player.height && g.player.y < g.platform4.y+g.platform4.height && g.player.x < g.platform4.x+g.platform4.width && g.player.x > g.platform4.x-g.player.width){

    g.player.onPlatform4 = true;
  }else{

    g.player.onPlatform4 = false;
  }


  // TARGET MOVEMENT

  g.target1.x += g.platform1.xspeed*1.1;

  g.target2.x += g.platform2.xspeed*1.1;

  g.target3.x += g.platform3.xspeed*1.1;

  g.target4.x += g.platform4.xspeed*1.1;
  

  // PLAYER + TARGETS

  if (g.player.y > g.target1.y-g.player.height && g.player.y < g.target1.y+g.target1.height && g.player.x < g.target1.x+g.target1.width && g.player.x > g.target1.x-g.player.width){

    g.target1.captured = true;
  }

  if (g.player.y > g.target2.y-g.player.height && g.player.y < g.target2.y+g.target2.height && g.player.x < g.target2.x+g.target2.width && g.player.x > g.target2.x-g.player.width){

    g.target2.captured = true;
  }

  if (g.player.y > g.target3.y-g.player.height && g.player.y < g.target3.y+g.target3.height && g.player.x < g.target3.x+g.target3.width && g.player.x > g.target3.x-g.player.width){

    g.target3.captured = true;
  }

  if (g.player.y > g.target4.y-g.player.height && g.player.y < g.target4.y+g.target4.height && g.player.x < g.target4.x+g.target4.width && g.player.x > g.target4.x-g.player.width){

    g.target4.captured = true;
  }

    
  
  //DEATH

  if (g.player.y > g.river.y-g.player.height && g.player.y < g.river.y+g.river.height && g.player.x < g.river.x+g.river.width && g.player.x > g.river.x-g.player.width && !g.player.onPlatform1 &&  !g.player.onPlatform2 &&  !g.player.onPlatform3 &&  !g.player.onPlatform4){

    g.player.dead = true;
  }

  if (g.player.dead){

    g.target1.captured = false;
    g.target2.captured = false;
    g.target3.captured = false;
    g.target4.captured = false;

    g.player.x = 30,
    g.player.y = canvas.height-30
  
    g.block.x = 500,
    g.block.y = canvas.height-30;
  
    g.player.dead = false;

   
    

  }



  // BOUNDARY CONTROL

  if (g.player.x < 0) {

    g.player.x = 0;

  } else if (g.player.x > canvas.width-g.player.width) {

    g.player.x = canvas.width-g.player.width;
  }

  if (g.player.y < 0){

    g.player.y = 0

  }else if (g.player.y > canvas.height-g.player.height){

    g.player.y = canvas.height-g.player.height;

  }

  // NEXT LEVEL

  if (g.player.y > g.goal.y-g.player.height && g.player.y < g.goal.y+g.goal.height && g.player.x < g.goal.x+g.goal.width && g.player.x > g.goal.x-g.player.width){

    s.activelvl = false;
  }





  //DRAW FRAMES


  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);// x, y, width, height

  ctx.fillStyle = "blue";
  ctx.fillRect(g.river.x, g.river.y, g.river.width, g.river.height); // River 

  ctx.fillStyle = "black";
  ctx.fillRect(g.platform1.x, g.platform1.y, g.platform1.width, g.platform1.height); // Platforms
  ctx.fillRect(g.platform2.x, g.platform2.y, g.platform2.width, g.platform2.height); 
  ctx.fillRect(g.platform3.x, g.platform3.y, g.platform3.width, g.platform3.height); 
  ctx.fillRect(g.platform4.x, g.platform4.y, g.platform4.width, g.platform4.height); 

  ctx.fillStyle = "yellow";

  if (!g.target1.captured){
    ctx.fillRect(g.target1.x, g.target1.y, g.target1.width, g.target1.height); 

  }

  if (!g.target2.captured){
    ctx.fillRect(g.target2.x, g.target2.y, g.target2.width, g.target2.height); 
  }

  if (!g.target3.captured){

    ctx.fillRect(g.target3.x, g.target3.y, g.target3.width, g.target3.height); 

  }

  if (!g.target4.captured){

    ctx.fillRect(g.target4.x, g.target4.y, g.target4.width, g.target4.height); 


  }
  
 
  

  ctx.fillStyle = "blue";
  ctx.fillRect(g.gate.x, g.gate.y, g.gate.width, g.gate.height); 

  ctx.fillStyle = "yellow";
  ctx.fillRect(g.goal.x, g.goal.y, g.goal.width, g.goal.height); // Goal

  ctx.fillStyle = "white";
  ctx.fillRect(g.block.x, g.block.y, g.block.width, g.block.height); //Block\

  ctx.fillStyle = "red";
  ctx.fillRect(g.player.x, g.player.y, g.player.width, g.player.height); //Player 




  window.requestAnimationFrame(loop)

};


export {s, g, loop}


