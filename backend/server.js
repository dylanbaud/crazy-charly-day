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
//app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];
    res.json(users);
});