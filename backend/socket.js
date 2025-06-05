// backend/socket.js
const globalUsers = new Map();
global.onlineUsers = globalUsers;

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`📲 New client connected: ${socket.id}`);

    socket.on('register', (userId) => {
      global.onlineUsers.set(userId, socket.id);
      console.log(`✅ Registered user ${userId} with socket ID ${socket.id}`);
    });

    socket.on('disconnect', () => {
      
      for (const [userId, id] of global.onlineUsers.entries()) {
        if (id === socket.id) {
          global.onlineUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};
