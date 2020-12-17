class Menu extends Phaser.Scene {

    constructor(){
        super("Menu");
        console.log("Menu loaded");
    }
    init(data) {
        this.socket = data.socket;
        this.socket.emit('waitingMenu');
    }
    create(){

        var actives = 0;
        // Title Text
        this.add.text(200, 50, "Turtle Dodge");
        var playersTxt = this.add.text(200, 70, "Players: " + actives);
        // Start Text
        var startTxt = this.add.text(220, 200, "Start", {font: "20px Arial"})
            .setInteractive().on("pointerdown", ()=> {
                this.scene.start("Test", {socket: this.socket});
        });
        var maxTxt = this.add.text(150, 200, "Max players reached", {font: "20px Arial"}).setAlpha(0);
        // Manage number of players
        this.socket.on("playerLoaded", function(players) {
            actives = 0;
            // Count actual amount of active players
            Object.keys(players).forEach(function (id) {
                if (players[id].active) {
                    actives++;
                }

            if (actives >= 2) {
                startTxt.setAlpha(0)
                maxTxt.setAlpha(1);
            } else {
                startTxt.setAlpha(1)
                maxTxt.setAlpha(0);
            }
            });
            // Set text
            playersTxt.setText("Players: " + actives);
            console.log("Player loaded");
        });
    }
}