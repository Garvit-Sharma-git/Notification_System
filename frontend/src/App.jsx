import React, { useEffect, useState } from 'react';
import socket from './socket';
import NotificationPanel from './components/NotificationPanel';
import UserList from './components/UserList';

const users = [
  { id: '684014413f535d4938cc24a3', name: 'Alice' },
  { id: '684014413f535d4938cc24a4', name: 'Bob' },
  { id: '684041e1839aed2e32d19a0a', name: 'Charlie' },
  { id: '6840491f070a05479522ba49', name: 'Garvit' }
];

export default function App() {
  const [currentUserId, setCurrentUserId] = useState(users[0].id);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit('register', currentUserId);

    socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => socket.off('notification');
  }, [currentUserId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">📬 Insyd Notification POC</h1>

      <div className="mb-6 text-center">
        <label className="mr-2 font-semibold">🔓 Select Current User:</label>
        <select
          className="px-3 py-2 border rounded"
          value={currentUserId}
          onChange={e => setCurrentUserId(e.target.value)}
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserList currentUserId={currentUserId} users={users} />
        <NotificationPanel notifications={notifications} />
      </div>
    </div>
  );
}
