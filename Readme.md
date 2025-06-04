# 🛠️ Insyd Notification System — 

---

## 1. 📌 Overview

This system enables users to follow each other and receive real-time notifications when someone follows them. The architecture uses:

- **MongoDB** for data storage (Users, Follows, Notifications)
- **Express.js** as the backend framework
- **Socket.IO** for real-time communication
- **React (Vite + Tailwind)** for the frontend interface

---

## 2. 🧩 Tech-Stack

| Component | Description |
|----------|-------------|
| **Express Server** | Handles HTTP API for follow actions and notifications |
| **MongoDB** | Stores users, follow relationships, and notifications |
| **Socket.IO** | Enables real-time notification push to clients |
| **In-memory event handler** | Simulates queuing system in POC; handles event-based flow |
| **React Frontend** *(later)* | Displays notifications, registers for WebSocket updates |

---

## 🧩 Components Involved

### Frontend (React)
- **App.jsx**: Sets current user, connects socket, renders UI
- **UserList.jsx**: Displays other users, lets the user follow them
- **NotificationPanel.jsx**: Displays received notifications
- **socket.js**: Manages Socket.IO connection

### Backend (Node + Express)
- **/api/follow**: REST API to follow a user and create a notification
- **socket.io handlers**: Maintains online user socket mappings and emits events
- **Models**:
  - **User**: Stores user info
  - **Follow**: Stores follower-following relationships
  - **Notification**: Stores notification messages

## 3. 🔄 Flow of Execution

### Follow Flow

1. **User A** clicks "Follow" on **User B**
2. A POST request is sent to `/api/follow`
3. Backend stores this in the `Follow` collection
4. A **notification** is created for User B
5. If User B is online, it is **pushed via WebSocket**
6. If not, it is stored in MongoDB until the user comes online

---

## 4. 📊 Database Schema (MondoDB)

### `User`
### `Follows`
### `Notifications`


## 🧰 Tech Stack

| Layer         | Technology                  |
|---------------|-----------------------------|
| Frontend      | React                       |
| Backend       | Node.js + Express           |
| Database      | MongoDB                     |
| Real-time     | Socket.IO                   |

---

## 📄 Deliverables

- ✅ This system design document (Markdown file / hosted on GitHub)
- 🔜 POC App with basic working notification system

---

## ✍️ Author

**Garvit Sharma**  
AI Fullstack Software Developer Intern Application  
Insyd — [https://insyd.app/](https://insyd.app/)











flowchart TD

%% FRONTEND
A[User selects current user] --> B[App.jsx loaded]
B --> C1[Emit add-user via Socket.io]
B --> C2[Render UserList and NotificationPanel]

C2 --> D1[UserList Component]
C2 --> D2[NotificationPanel Component]

D1 --> E1[Click Follow button]
E1 --> F1[POST /api/follow with followerId and followingId]

D2 --> G1[Receive notification from socket]
G1 --> G2[Update notifications state]

%% BACKEND
F1 --> H1[Express /api/follow route]
H1 --> I1[Check if self-follow or already followed]
I1 --> J1[Save follow to MongoDB]
J1 --> K1[Create notification in MongoDB]

K1 --> L1{Is following user online?}
L1 -->|Yes| M1[Emit notification to socketId]
L1 -->|No| N1[Skip emit, only save notification]

C1 --> O1[Backend socket.on add-user]
O1 --> P1[Save socketId to onlineUsers Map]

