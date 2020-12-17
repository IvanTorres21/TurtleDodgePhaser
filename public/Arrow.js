class Arrow extends Phaser.Physics.Arcade.Sprite {

    constructor(configArrow) {

        super(configArrow.scene, configArrow.posX, configArrow.posY, configArrow.texture);

        
        // Get Scene
        this.scene = configArrow.scene;

        this.speed = configArrow.speed;

        // Add the trap to scene
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);
        this.scene.traps.add(this);

    }

    update(){

        this.move(this.speed);
        if (this.x <= 0) this.destroy();
        
    }

    /**
     * Moves the arrow in the horizontal axis
     * @param {*} speed 
     */
    move(speed){

        this.x -= speed;
    }
}