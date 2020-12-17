class Level extends Phaser.Scene {

    constructor() {
        super("Level");

    }

    init(data) {
        this.socket = data.socket;
        const userId = this.socket.id;
        this.socket.emit('playerInGame');
    }

    create() {
        this.ready = false;

        this.socket.on('loadedPlayer', (players) => {
            Object.keys(players).forEach(function (id) {
                if (players[id].active) {
                    this.ready = true;
                }
            });
        });

        // Set background image
        this.bgScene = this.add.tileSprite(0, 0, config.width, config.height, "bg")
            .setOrigin(0, 0);

        // Adding traps
        this.traps = this.add.group();

        // Add traps

        // Axes
        this.axe = new Axe({
            scene: this,
            posX: config.width + 40,
            posY: 250,
            speed: 2,
            texture: "axe"
        });

        this.axe2 = new Axe({
            scene: this,
            posX: config.width + 40,
            posY: 250,
            speed: 2,
            texture: "axe"
        });

        this.axe3 = new Axe({
            scene: this,
            posX: config.width + 40,
            posY: 250,
            speed: 2,
            texture: "axe"
        });

        this.axe4 = new Axe({
            scene: this,
            posX: config.width + 40,
            posY: 250,
            speed: 2,
            texture: "axe"
        });
        this.axe5 = new Axe({
            scene: this,
            posX: config.width + 70,
            posY: 250,
            speed: 2,
            texture: "axe"
        });
        // Arrows
        this.arrow = new Arrow({
            scene: this,
            posX: config.width,
            posY: 100,
            speed: 8,
            texture: "arrow"
        });

        this.arrow2 = new Arrow({
            scene: this,
            posX: config.width + 40,
            posY: 100,
            speed: 8,
            texture: "arrow"
        });

        this.arrow3 = new Arrow({
            scene: this,
            posX: config.width + 40,
            posY: 100,
            speed: 8,
            texture: "arrow"
        });

        this.arrow4 = new Arrow({
            scene: this,
            posX: config.width + 40,
            posY: 100,
            speed: 8,
            texture: "arrow"
        });

        // Add Saws

        this.saw = new Saw({
            scene: this,
            posX: config.width + 40,
            posY: 0,
            speed: 5,
            texture: "saw",
            rotation: 180,
            bottom: true
        })

        this.saw2 = new Saw({
            scene: this,
            posX: config.width + 40,
            posY: config.height - 40,
            speed: 5,
            texture: "saw",
            rotation: 0,
            bottom: false
        })
        // Add player
        this.player = new Player({
            scene: this,
            posX: 200,
            posY: 20,
            texture: "player",
            speed: 2,
            jumpS: 3
        });
        this.player.setGravityY(8000);
        //place the ground
        let groundX = this.sys.game.config.width / 2;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.sprite(groundX, groundY);
        //size the ground
        ground.displayWidth = this.sys.game.config.width * 1.1;
        //make the ground stay in place
        ground.setImmovable();
        //add the colliders
        this.physics.add.collider(this.player, ground);
        this.physics.add.overlap(this.traps, this.player, () => {
            this.socket.emit("died");
            this.player.die();
        }, null, this);
        // Timer to control the amount of enemies in screen
        this.time = Math.floor(game.getTime());
        this.timeAux = this.time;

    }


    update() {
        // When two players are ready
        if (this.ready) {
            // While the player is still alive
            if (this.player != null) {
                this.axe.update();
                this.arrow.update();
                this.player.update();
                this.saw2.update();
                this.time = Math.floor(game.getTime());
                // Controls the difficulty
                if (this.time >= this.timeAux + 11300) {
                    this.axe2.update();
                    this.arrow2.update();
                    this.saw.update();
                }
                if (this.time >= this.timeAux + 21000) {
                    this.axe3.update();
                    this.arrow3.update();
                    this.arrow4.update();
                    this.player.speed = 300;
                    this.player.jumpS = 400;

                }
                if (this.time >= this.timeAux + 31000) {
                    this.axe4.update();
                    this.axe5.update();
                }
                if (this.time >= this.timeAux + 41000) {
                    this.player.speed = 400;
                    this.player.jumpS = 500;
                    this.arrow.speed = 10;
                    this.arrow2.speed = 11.5;
                    this.arrow3.speed = 13;
                }
                if (this.time >= this.timeAux + 51000) {
                    this.saw.speed = 7;
                    this.saw2.speed = 6;
                }
                if (this.time >= this.timeAux + 61000) {
                    this.axe2.speed = 3;
                    this.axe3.speed = 2.4;
                    this.axe4.speed = 5;
                    this.axe5.speed = 4;
                }
            }
        }
    }
}