const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const Notification = require('../models/Notification');

const User = require('../models/User');

router.post('/add-user', async (req, res) => {
  const { name, email } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  console.log('POST /api/follow route hit');
  try {
    const { followerId, followingId } = req.body;

    // Avoid self-follow
    if (followerId === followingId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
    if (existingFollow) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    // Save follow
    const follow = new Follow({ follower: followerId, following: followingId });
    await follow.save();

    // Create notification
    const notification = new Notification({
      to: followingId,
      message: `User ${followerId} followed you.`,
      type: 'follow',
    });
    await notification.save();

    // Log online users map and socket ID for debug
    console.log('🔌 Online Users Map:', global.onlineUsers);
    const toSocketId = global.onlineUsers.get(followingId);
    console.log(`🔔 Sending notification to socket ID: ${toSocketId} for user: ${followingId}`);

    // Send real-time notification via Socket.io
    if (toSocketId) {
      req.app.get('io').to(toSocketId).emit('notification', notification);
    } else {
      console.log(`User ${followingId} not online, notification saved but not sent real-time`);
    }

    res.status(201).json({ message: 'Followed successfully', follow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;