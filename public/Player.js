class Player extends Phaser.Physics.Arcade.Sprite {

    /**
     * Player class manager
     * @param {*} configPlayer contains all the parameters
     */
    constructor(configPlayer) {

        super(configPlayer.scene, configPlayer.posX, configPlayer.posY, configPlayer.texture);



        // Scene property
        this.scene = configPlayer.scene;

        // jumping stuff
        this.speed = configPlayer.speed * 100;
        this.jumpS = configPlayer.jumpS * 100;

        // Add the player to the current scene
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);

        this.setCollideWorldBounds(true);

        // Add key bindings
        this.playerKeys = this.scene.input.keyboard.createCursorKeys();

        this.alive = true;
    }

    update() {

        if (this.alive) {
            this.movePlayerManager();
        }
    }

    /**
     * Manages de player movement
     */
    movePlayerManager() {

        this.setVelocity(0);

        if (this.playerKeys.left.isDown) this.setVelocityX(-this.speed);
        else if (this.playerKeys.right.isDown) this.setVelocityX(+this.speed);
        if (this.playerKeys.up.isDown) this.setVelocityY(-this.jumpS); //Makes the player jump


    }

    die() {
        this.alive = false;
        this.destroy();
    }
}