# 🛠️ Insyd Notification System — 

---

## 1. 📌 Overview

The purpose of this system is to provide a lightweight, scalable, real-time notification system for **Insyd**, a social platform for architects. Notifications will be triggered by key events such as:
- Follow actions
- (Later) Blog discovery or job postings
- Activity from people they follow or who follow them

This document outlines the architecture, data flow, scale strategy, and limitations of the Proof-of-Concept (POC) notification system.

---

## 2. 🧩 Components Involved

| Component | Description |
|----------|-------------|
| **Express Server** | Handles HTTP API for follow actions and notifications |
| **MongoDB** | Stores users, follow relationships, and notifications |
| **Socket.IO** | Enables real-time notification push to clients |
| **In-memory event handler** | Simulates queuing system in POC; handles event-based flow |
| **React Frontend** *(later)* | Displays notifications, registers for WebSocket updates |

---

## 3. 🔄 Flow of Execution

### Follow Flow

1. **User A** clicks "Follow" on **User B**
2. A POST request is sent to `/api/follow`
3. Backend stores this in the `Follow` collection
4. A **notification** is created for User B
5. If User B is online, it is **pushed via WebSocket**
6. If not, it is stored in MongoDB until the user comes online

---

## 4. 📊 Database Schema (Simplified)

### `User`
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String
}
```

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
