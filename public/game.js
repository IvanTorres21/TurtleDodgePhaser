var config = {
    width: 500,
    height: 300,
    backgroundColor: 0x000000,
    scene: [BootScene, Menu, Level, Test],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            debugShowVelocity: false
        }

    }
}
var game = new Phaser.Game(config);