// server.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = new Set();

server.on('connection', (socket) => {
  clients.add(socket);
  console.log('New client connected.');

  socket.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected.');
    clients.delete(socket);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
