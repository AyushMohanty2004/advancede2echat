const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register', (username) => {
    users[socket.id] = username;
    io.emit('user list', Object.values(users));
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      user: users[socket.id],
      message: msg
    });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('user list', Object.values(users));
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});