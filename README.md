# 💬 Chat App

A real-time chat application built from scratch using **React**, **Node.js**, **Express**, **Socket.IO**, and **MongoDB**. It supports user authentication, live one-on-one messaging, image sharing, online presence tracking, and seen/unseen message indicators.

🔗 **Live Demo:** [https://chat-app-theta-lilac.vercel.app/](https://chat-app-theta-lilac.vercel.app/)

---

## 🧱 Tech Stack

* **Frontend**: React, Context API, Tailwind CSS, Axios
* **Backend**: Node.js, Express
* **Database**: MongoDB with Mongoose
* **Authentication**: JWT (JSON Web Tokens)
* **Real-time**: Socket.IO
* **Media Upload**: Cloudinary (via base64 encoding)

---

## ✅ Key Features

* 🔐 User Sign Up / Login with hashed passwords (bcrypt + JWT)
* 📡 Real-time messaging with Socket.IO
* 🟢 Online/offline status indicators
* 🖼️ Image upload support in messages
* 👁️ Seen/unseen message tracking
* 🔍 Search bar to filter users
* 🚪 Logout and profile editing options
* 💅 Clean and responsive UI (built with Tailwind CSS)

---

## ⚙️ Setup Instructions

### 📁 Backend

```bash
git clone https://github.com/ManozBachhav/Chat-App.git
cd Chat-App/backend

# Install dependencies
npm install

# Create .env file with:
# MONGODB_URI=<your_mongodb_uri>
# JWT_SECRET=<your_jwt_secret>

npm run dev
```

### 💻 Frontend

```bash
cd ../frontend
npm install

# Create .env file:
# VITE_BACKEND_URL=http://localhost:5000

npm run dev
```

Visit: `http://localhost:3000`

---

## 🗂️ Project Structure

```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── lib/
└── server.js

frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── assets/
└── main.jsx
```

---

## 📡 Real-Time Messaging Flow

1. User logs in → token stored in `localStorage`
2. User connects to Socket.IO server with their ID
3. Sidebar fetches users and unseen message count
4. Chat messages are sent/received in real-time and marked seen automatically if active
5. Message images are uploaded to Cloudinary

---

## 🌟 Live Demo

Try it out here:
👉 **[chat-app-theta-lilac.vercel.app](https://chat-app-theta-lilac.vercel.app/)**

> Note: Use two browser tabs or devices to test real-time functionality.
> Refresh the page if any of fuction not working and wait for seconds.
> Its take little time for uploading an image as it connected to cloudinary.

---

## 🔮 Future Enhancements

* ✅ Group chat support
* ✅ Message deletion/editing
* ✅ Better mobile responsiveness
* ✅ Typing indicators
* ✅ Push notifications
* ✅ File upload (PDF, docs, etc.)

---

## 🤝 Author

Built with ❤️ by [**Manoz Bachhav**](https://github.com/ManozBachhav)
📬 \[email : manojbachhav281@gmail.com]

---

