import React from 'react';

export default function NotificationPanel({ notifications }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n, idx) => (
            <li key={idx} className="bg-gray-100 p-2 rounded">{n.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
