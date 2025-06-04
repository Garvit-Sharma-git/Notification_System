import React from 'react';
import axios from 'axios';

export default function UserList({ users, currentUserId }) {
  const handleFollow = async (targetUserId) => {
    try {
      const res = await axios.post('http://localhost:5000/api/follow', {
        followerId: currentUserId,
        followingId: targetUserId
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Follow failed');
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">👥 Other Users</h2>
      {users.filter(user => user.id !== currentUserId).map(user => (
        <div key={user.id} className="flex justify-between items-center mb-3">
          <span>{user.name}</span>
          <button
            onClick={() => handleFollow(user.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
