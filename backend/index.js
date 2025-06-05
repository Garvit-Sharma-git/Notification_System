// backend/index.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const setupSocket = require('./socket');

dotenv.config();

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "https://notification-system-eta.vercel.app", // <-- FRONTEND URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: "https://notification-system-eta.vercel.app", // <-- FRONTEND URL
  credentials: true,
}));

app.use(express.json());


app.get('/', (req, res) => res.send('Notification POC Running'));


setupSocket(io);


const followRoutes = require('./routes/follow');
app.use('/api/follow', followRoutes);


app.set('io', io);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
