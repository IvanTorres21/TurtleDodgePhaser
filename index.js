let express = require('express');
let app = express();//referencia a lo de arriba
var http = require('http').createServer(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 3000;

var players = {};
var requestPlayersAr = 0;
var requestPlayersAx = 0;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
http.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});


io.on('connection', (socket) => {

  console.log("An user connected: " + socket.id);

  players[socket.id] = {
    playerId: socket.id,
    x: 100,
    y: 10,
    active: false
  };


  // When a user disconnects from the server
  socket.on('disconnect', () => {
    console.log("User " + socket.id + " disconnected");
    // If the user was playing tell the other player
    if (players[socket.id].active) {
      io.emit('playerDisconnected');
    }
    delete players[socket.id];
    io.emit('playerLoaded', players);
  });

  // So that new users get the active players
  socket.on('waitingMenu', () => {
    io.emit('playerLoaded', players);
  });

  // When a user starts the game
  socket.on('playerInGame', () => {
    console.log("Player " + socket.id + " is waiting");
    players[socket.id].active = true;
    io.emit('playerLoaded', players);
    io.emit('getPlayers', players);
  });

  //Move player
  socket.on('playerMoving', (player) => {
    players[socket.id].x = player.x;
    players[socket.id].y = player.y;
    socket.broadcast.emit('playerMoved', player);
  });

  //Player dies
  socket.on('died', () => {
    socket.broadcast.emit('playerDied'); // Delete the object only if it isn't you who died
  });

  // Game has started

  /**
   * When players ask give out arrow coordinates
   */
  socket.on('getArrow', () => {
    requestPlayersAr++;
    if (requestPlayersAr === 2) {
      var posY = Math.floor(Math.random() * 240 + 10);
      io.emit('giveArrow', posY);
      posY = Math.floor(Math.random() * 260 + 10);
      io.emit('giveArrow2', posY);
      posY = Math.floor(Math.random() * 260 + 10);
      io.emit('giveArrow3', posY);
      posY = Math.floor(Math.random() * 260 + 10);
      io.emit('giveArrow4', posY);
      posY = Math.floor(Math.random() * 260 + 10);
      io.emit('giveArrow5', posY);
      posY = Math.floor(Math.random() * 260 + 10);
      io.emit('giveArrow6', posY);
      posY = Math.floor(Math.random() * 260 + 10);
      io.emit('giveArrow7', posY);
      requestPlayersAr = 0;
    }
  });

  /**
   * When players ask give out axe coordinates
   */
  socket.on('getAxe', () => {
    requestPlayersAx++;
    if (requestPlayersAx === 2) {
      var posY = Math.floor(Math.random() * 240 + 10);
      io.emit('giveAxe', posY);
      posY = Math.floor(Math.random() * 240 + 10);
      io.emit('giveAxe2', posY);
      posY = Math.floor(Math.random() * 240 + 10);
      io.emit('giveAxe3', posY);
      posY = Math.floor(Math.random() * 240 + 10);
      io.emit('giveAxe4', posY);
      requestPlayersAx = 0;
    }
  });
});

