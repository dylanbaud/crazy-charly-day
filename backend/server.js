const path = require("path");
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server, {
    pingInterval: 30000,
    pingTimeout: 5000,
});

const port = 3000;

// -- Used to solve some problems ----------------
app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Display the sockets coming to the server, which are then sent to the robot
server.listen(port);

io.sockets.on("connection", function (socket) {
    console.log("Socket connected: " + socket.conn.remoteAddress);

    socket.on("disconnect", function () {
        console.log("Socket disconnected : ", socket.handshake.address);
    });
});

console.log(`Server is running on http://localhost:${port}`);