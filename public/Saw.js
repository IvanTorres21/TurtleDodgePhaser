class Saw extends Phaser.Physics.Arcade.Sprite {

    constructor(configSaw) {

        super(configSaw.scene, configSaw.posX, configSaw.posY, configSaw.texture);

        
        // Get Scene
        this.scene = configSaw.scene;

        this.speed = configSaw.speed;

        this.angle = configSaw.rotation;

        if (configSaw.rotation != 0) this.flipX = true;
        
        // Add the trap to scene
        
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);
        
        
        // Change the hitbox position depending on where the saw is placed
       
        this.scene.traps.add(this);

    }

    update(){

        this.move(this.speed);
        if (this.x <= 0) this.resetPos();
        
    }

    /**
     * Moves the saw in the x axis
     */
    move(){

        this.x -= this.speed;
    }

    /**
     * Resets the postion of the saw
     */
    resetPos(){

        this.x = config.width+100;
    }
}