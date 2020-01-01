

var config = {

    type: Phaser.AUTO,
    width: 500,
    height: 500,
    scene: {
        preload,
        create,
        update
    }
}

var game = new Phaser.Game(config);

function preload(){


    this.load.image('ship', './IMG/spaceship.png');
    this.load.image('bg', './IMG/background.png');


}

var player, cursors;

function create(){

    player = this.add.sprite(200,200, 'ship');

    cursors = game.input.keyboard.createCursorKeys();

}

function update(){

 
    player.x += 10;


}