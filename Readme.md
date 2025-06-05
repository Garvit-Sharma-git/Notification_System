#  Insyd Notification System —

---

## 1.  Overview

This system enables users to follow each other and receive real-time notifications when someone follows them. The architecture uses:

- **MongoDB** for data storage (Users, Follows, Notifications)
- **Express.js** as the backend framework
- **Socket.IO** for real-time communication
- **React (Vite + Tailwind)** for the frontend interface

---

## 2.  Tech-Stack

| Component                    | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| **Express Server**           | Handles HTTP API for follow actions and notifications     |
| **MongoDB**                  | Stores users, follow relationships, and notifications     |
| **Socket.IO**                | Enables real-time notification push to clients            |
| **In-memory event handler**  | Simulates queuing system in POC; handles event-based flow |
| **React Frontend** _(later)_ | Displays notifications, registers for WebSocket updates   |

---

## 3.  Components Involved

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

## 4.  Flow of Execution

### Follow Flow

1. **User A** clicks "Follow" on **User B**
2. A POST request is sent to `/api/follow`
3. Backend stores this in the `Follow` collection
4. A **notification** is created for User B
5. If User B is online, it is **pushed via WebSocket**
6. If not, it is stored in MongoDB until the user comes online

---

## 5.  Database Collections (MondoDB)

 `User`
 `Follows`
 `Notifications`

## 6.  Tech Stack

| Layer     | Technology        |
| --------- | ----------------- |
| Frontend  | React             |
| Backend   | Node.js + Express |
| Database  | MongoDB           |
| Real-time | Socket.IO         |

---

## 7. AI Implentation Ideas 

-  **Recommendation Notification**:
 Use collaborative filtering or graph-based recommendations to notify:
"People who follow Alice also follow Bob."
Can show a notification like:
"3 of your followed users just followed Rahul. Follow him too?"

-    **Summarized Daily Digest**:
Use AI (LLMs) to generate a summary of daily notifications.
Prompt:
"Summarize these 15 notifications in 3 sentences in a casual tone for the user Garvit."

-   **User Clustering & Behavior Prediction**:
 Predict what kind of notifications a user likes.
Cluster users using K-Means or DBSCAN on:
Activity frequency
Interests
Engagement level
Then, tailor notification types:
"User seems highly engaged — increase notifications."

##  Author

**Garvit Sharma**  
Insyd — [https://insyd.app/](https://insyd.app/)
