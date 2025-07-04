import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app)

// Create Socket.IO server
export const io = new Server (server, {
  cors: {origin: "*"}
});

//store online users
export const userSocketMap = {}; //{userId: socketId}

// Handle socket connection
io.on("connection", (socket) => {
   const  userId  = socket.handshake.query.userId;
   console.log(`User connected: ${userId}`);

   if (userId) {
     userSocketMap[userId] = socket.id; // Store the user's socket ID
   }

   // Emit online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
      delete userSocketMap[userId]; // Remove the user's socket ID
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users

})
})

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

//Routes setup
app.use("/api/status", (req, res)=> res.send("Server is live"));
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter)

//connect to the database
await connectDB();


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the server for vercel
export default server;