class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
        console.log("BootScene loaded"); // See if it's working
    }

    init(){}

    preload(){

        this.socket = io();
        // Load background
        this.load.image("bg", "assets/bg.png");

        // Load traps
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("axe", "assets/axe.png");
        this.load.image("saw", "assets/saw.png");

        // Load player
        this.load.image("player", "assets/player.png");

    }
    
    create(){

        this.add.text(20, 50, "Loading Game...");

        this.scene.start("Menu", {socket: this.socket});
    }

    update(){}
}