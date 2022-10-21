const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const port = 8000;
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('user-connected', username => {
        users[socket.id] = username;
    });

    socket.on('send-message', data => {
        socket.broadcast.emit('send-message', {
            username: users[socket.id],
            message: data.message,
            date: data.date,
            isYourMessage: false,
        });
    });
});

server.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});