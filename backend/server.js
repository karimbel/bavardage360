const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const MAX_ACTIVE = 4;
let activeUsers = new Set();
let waitingQueue = [];

io.on('connection', (socket) => {
  console.log('Utilisateur connecté:', socket.id);
  
  socket.on('join', (username) => {
    const user = { id: socket.id, username, timestamp: Date.now() };
    socket.username = username; // Stocke username pour messages
    if (activeUsers.size < MAX_ACTIVE) {
      activeUsers.add(user.id);
      socket.join('chat');
      socket.emit('joinedChat', { message: 'Vous avez rejoint le salon !' });
      io.to('chat').emit('userJoined', `L’utilisateur ${username} a rejoint le salon`);
    } else {
      waitingQueue.push(user);
      socket.join('waiting');
      updateWaitingList();
    }
  });

  function updateWaitingList() {
    const list = waitingQueue.map((u, index) => ({ username: u.username, position: index + 1 }));
    io.to('waiting').emit('waitingUpdate', `Liste d’attente :\n${list.map(u => `${u.position}. ${u.username}`).join('\n')}`);
  }

  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté: ${socket.id} (${socket.username || 'inconnu'})`);
    if (activeUsers.has(socket.id)) {
      activeUsers.delete(socket.id);
      if (waitingQueue.length > 0) {
        const nextUser = waitingQueue.shift();
        activeUsers.add(nextUser.id);
        io.to(nextUser.id).emit('joinedChat', { message: 'Votre tour ! Vous entrez dans le salon.' });
        io.sockets.sockets.get(nextUser.id)?.join('chat');
        io.to('chat').emit('userJoined', `L’utilisateur ${nextUser.username} a rejoint le salon`);
        updateWaitingList();
      }
    } else {
      waitingQueue = waitingQueue.filter(u => u.id !== socket.id);
      updateWaitingList();
    }
  });

  socket.on('sendMessage', (msg) => {
    if (activeUsers.has(socket.id)) {
      io.to('chat').emit('newMessage', { username: socket.username, message: msg });
    }
  });
});

server.listen(3000, () => console.log('Serveur démarré'));