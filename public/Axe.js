class Axe extends Phaser.Physics.Arcade.Sprite {

    /**
     * 
     * @param {*} configAxe contains the parameters needed to make an Axe
     */
    constructor (configAxe){

        super(configAxe.scene, configAxe.posX, configAxe.posY, configAxe.texture);

        // Get Scene
        this.scene = configAxe.scene;

        this.speed = configAxe.speed;

        // Add the trap to scene
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);

        this.scene.traps.add(this);
    }

    update(){
        this.moveAxe(this.speed);
        if (this.y >= config.height || this.x <= 0) {

            this.destroy();
        }
    }

    /**
     * Moves the axe in a "curved" movement and makes it rotate
     * @param {} speed 
     */
    moveAxe(speed){

        // Try to imitate a curved movement
        if (this.x > config.width/2) this.y -= speed * (this.y/config.height) * 1.5;
        else this.y += speed * (this.y/config.height) * 1.5;
        this.rotation += speed/14;
        this.x -= speed;
    }

}