import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

export const alert = cb => {
  socket.on('connect', this.socket);
  socket.emit('subscribeToTimer', 1000);
};

