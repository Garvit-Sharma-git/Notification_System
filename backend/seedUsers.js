// seedUsers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User'); // Ensure you have this model

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected...');

    // Only insert users if they don't already exist
    const existing = await User.find({});
    if (existing.length === 0) {
      const user1 = await User.create({ name: 'Alice', email: 'alice@example.com' });
      const user2 = await User.create({ name: 'Bob', email: 'bob@example.com' });
      // const user3 = await User.create({ name: 'Charlie', email: 'charlie@example.com' });

      console.log('Sample users inserted:');
      console.log('Alice:', user1);
      console.log('Bob:', user2);
      // console.log('Charlie:', user3);
    } else {
      console.log('Users already exist, skipping insertion.');
    }
  })
  .catch(err => console.error('MongoDB Error:', err));
