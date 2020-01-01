class Level1 extends Phaser.Scene{


    constructor(){

        super({key: "Level1"});
    }

    preload(){

        this.load.spritesheet("bigbad", "./IMG/bigbad.png", {frameWidth: 500, frameHeight: 500})


    }

    create(){

        gameState.bigbad = this.add.sprite(200,200, "bigbad")


    }

    update(){

        
    }
}