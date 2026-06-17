# Chat App

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?logo=mongodb)

A modern full-stack real-time messaging application inspired by platforms like WhatsApp and Discord. Built with React, TypeScript, Node.js, and MongoDB, featuring instant messaging, group conversations, file sharing, and a responsive user experience.

<p align="center">
  <img src="./assets/demo.gif" alt="Chat App Demo" width="900" />
</p>

---

## ✨ Features

### Real-Time Messaging

* Instant messaging with Socket.IO
* Direct and group conversations
* Message editing and deletion
* Typing indicators
* Online presence tracking
* Message history and timestamps

### Authentication & Security

* User registration and login
* Email verification
* JWT authentication with access and refresh tokens
* Secure password hashing with bcrypt
* Security middleware with Helmet
* MongoDB sanitization against injection attacks

### File Sharing

* Image and file uploads
* Cloudinary integration for secure file storage

### User Experience

* Responsive design for desktop and mobile devices
* Dark mode support
* Emoji picker
* User search functionality
* Real-time notifications
* Smooth and intuitive interface

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Redux Toolkit + Redux Persist
* React Router
* Socket.IO Client
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Socket.IO
* JWT
* Cloudinary
* Resend
* Helmet
* Morgan

---

## 📂 Project Structure

```text
chat-app/
├── client/          # React frontend
├── server/          # Node.js backend
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB 6+
* Cloudinary account
* Resend API key

### Installation

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the `server` directory:

```env
DATABASE_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
EMAIL_TOKEN_SECRET=
RESEND_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=http://localhost:5173
```

---

## 📸 Screenshots

You can add screenshots or GIF demonstrations here.

* Login & Registration
* Real-Time Messaging
* Group Conversations
* Image Uploads
* Dark Mode

---

## 🗺️ Roadmap

* [ ] WebRTC video calls
* [ ] Message reactions
* [ ] Voice messages
* [ ] Push notifications
* [ ] End-to-end encryption
* [ ] React Native mobile application

---

## 📄 License

This project is licensed under the MIT License.
