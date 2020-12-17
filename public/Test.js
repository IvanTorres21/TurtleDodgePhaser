class Test extends Phaser.Scene {

    constructor() {
        super("Test");
    }

    init(data) {
        this.socket = data.socket;
        const userId = this.socket.id;
        this.socket.emit('playerInGame');
    }

    create() {
         
        var self = this
        this.scene = this;
        // Waiting for players text
        this.waitTxt = this.add.text(200, 50, "Waiting for other players...");
        this.ready = false;
        this.started = false;
        this.died = false;
        this.won = false;

        this.requestTimeAr = 2500;
        this.requestTimeAx = 5000;
        // Set background image
        this.bgScene = this.add.tileSprite(0, 0, config.width, config.height, "bg")
            .setOrigin(0, 0);
        // Get players
        this.socket.on('getPlayers', (players) => {
            console.log("GETTING PLAYERS");
            Object.keys(players).forEach((id) => {
                if (players[id].active) {
                    if (id != this.socket.id) {
                        this.ready = true;
                        this.addOtherPlayer(this, players[id]);
                    }
                }
            });
        });
        this.socket.on('playerDisconnected', () => {
            this.won = true;
            this.otherPlayer.destroy();
        });
        // Add player
        this.player = new Player({
            scene: this,
            posX: 30,
            posY: 50,
            texture: "player",
            speed: 2,
            jumpS: 3
        });
        this.player.setGravityY(8000);

        // Place the ground
        let groundX = this.sys.game.config.width / 2;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.sprite(groundX, groundY);

        // Size the ground
        ground.displayWidth = this.sys.game.config.width * 1.1;

        // Make the ground stay in place
        ground.setImmovable();

        // Adding traps
        this.traps = this.add.group();

        // Add collisions
        this.physics.add.collider(this.player, ground);
        this.physics.add.overlap(this.traps, this.player, () => {
            this.socket.emit("died");
            this.died = true;
            if (this.won) {
                this.add.text(200, 50, "YOU WON", { fill: "#00ff00" });
            } else {
                this.add.text(200, 50, "YOU LOST", { fill: "#ff0000" })
            }
            this.add.text(200, 90, "You survived for: " + this.time / 1000 + "s");
            this.add.text(200, 120, "Go back to menu").setInteractive().on("pointerdown", () => {
                window.location.reload(true)
            });
            this.player.die();
        }, null, this);

        // If the other player dies
        this.socket.on("playerDied", () => {
            this.won = true;
            this.otherPlayer.destroy();
        });

        // ARROWS
        this.arrow;
        this.arrow2;
        this.arrow3;
        this.arrow4;
        this.arrow5;
        this.arrow6;

        this.socket.on('giveArrow', (y) => {
            this.arrow = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 12,
                texture: "arrow"
            });
        });
        this.socket.on('giveArrow2', (y) => {
            this.arrow2 = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 12,
                texture: "arrow"
            });
        });
        this.socket.on('giveArrow3', (y) => {
            this.arrow3 = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 12,
                texture: "arrow"
            });
        });
        this.socket.on('giveArrow4', (y) => {
            this.arrow4 = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 9,
                texture: "arrow"
            });
        });
        this.socket.on('giveArrow5', (y) => {
            this.arrow5 = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 9,
                texture: "arrow"
            });
        });
        this.socket.on('giveArrow6', (y) => {
            this.arrow6 = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 9,
                texture: "arrow"
            });
        });
        this.socket.on('giveArrow7', (y) => {
            this.arrow7 = new Arrow({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 9,
                texture: "arrow"
            });
        });
        // AXES

        this.axe;
        this.axe2;
        this.axe3;
        this.axe4;

        this.socket.on('giveAxe', (y) => {
            console.log("Got axe");
            this.axe = new Axe({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 2,
                texture: "axe"
            });
        });
        this.socket.on('giveAxe2', (y) => {
            this.axe2 = new Axe({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 2,
                texture: "axe"
            });
        });
        this.socket.on('giveAxe3', (y) => {
            this.axe3 = new Axe({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 2,
                texture: "axe"
            });
        });
        this.socket.on('giveAxe4', (y) => {
            this.axe4 = new Axe({
                scene: this,
                posX: config.width + 40,
                posY: y,
                speed: 2,
                texture: "axe"
            });
        });

        // Saws (can be managed from client side since their locations don't change)
        this.saw = new Saw({
            scene: this,
            posX: config.width + 40,
            posY: 0,
            speed: 5,
            texture: "saw",
            rotation: 180,
            bottom: true
        });

        this.saw2 = new Saw({
            scene: this,
            posX: config.width + 40,
            posY: config.height - 40,
            speed: 5,
            texture: "saw",
            rotation: 0,
            bottom: false
        });
    }

    update() {

        if (this.ready) {
            
            if (!this.started) {
                
                // Set up the timer
                this.startTime = Math.floor(game.getTime())
                this.timeAuxA = 0;
                this.timeAuxB = 0;
                this.started = true;
            }
            console.log(this.time);
            // Set up players movement
            if (!this.died) this.player.update();
            this.socket.emit("playerMoving", this.player);
            this.socket.on("playerMoved", (pl) => {
                this.otherPlayer.x = pl.x;
                this.otherPlayer.y = pl.y;
            });
            this.waitTxt.setAlpha(0);

            // Managing Traps positions
            this.time = Math.floor(game.getTime()) - this.startTime; //Syncs both clients to the same game time
            if (this.time >= this.timeAuxA + this.requestTimeAr) {
                this.socket.emit("getArrow");
                this.timeAuxA = this.time + this.requestTimeAr;
            }

            if (this.time >= this.timeAuxB + this.requestTimeAx) {
                this.socket.emit("getAxe");
                this.timeAuxB = this.time + this.requestTimeAx * 2;
            }

            // Handle all the updates for the traps
            if (this.arrow != null) {
                this.arrow.update();
                this.arrow2.update();
                if (this.time > 8000) {
                    this.saw.update();
                }
                if (this.time > 15000) {
                    this.arrow3.update();
                    if (this.axe != null) {
                        this.axe.update();
                    }
                }
                if (this.time > 20000) {
                    this.saw2.update();
                }
                if (this.time > 30000) {
                    this.axe2.update();
                    this.axe3.update();
                    if (!this.died) {
                        this.player.speed = 400;
                        this.player.jumpS = 600;
                        this.player.setGravityY(14000);
                    }
                    this.requestTimeAr = 1800;
                    this.arrow.speed = 15;
                    this.arrow2.speed = 15;
                    this.arrow3.speed = 15;
                }
                if (this.time > 45000) {
                    this.arrow4.speed = 15;
                    this.axe.speed = 4;
                    this.axe2.speed = 4;
                    this.axe3.speed = 4;
                    this.requestTimeAx = 3000;
                    this.arrow4.update();
                }
                if (this.time > 55000) { //Honestly, I don't think someone can survive this
                    this.axe4.update();
                    this.axe4.speed = 4;
                }
                if (this.time > 65000) {
                    this.arrow5.update();
                    this.arrow6.update();
                }
                if (this.time > 80000) {
                    this.arrow7.update();
                }
            }

        } else {
            this.waitTxt.setAlpha(1);
        }
    }

    /**
     * Adds another player sprite
     * @param {*} self 
     * @param {*} playerInfo 
     */
    addOtherPlayer(self, playerInfo) {
        console.log("Added other player");
        this.otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, "player").setOrigin(0.5, 0.5);
        this.otherPlayer.tint = 0xff0000
    }

}