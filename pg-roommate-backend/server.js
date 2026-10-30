
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const authRoutes = require("./routes/authRoutes");
const pgRoutes = require("./routes/pgRoutes");
const roommateRoutes = require("./routes/roommateRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const Message = require("./models/Message");
const protect = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://127.0.0.1:8081",
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) =>
    console.error("MongoDB Connection Error:", error.message)
  );

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/pg", pgRoutes);
app.use("/api/roommate", roommateRoutes);
app.use("/api/favorite", favoriteRoutes);

// GET CHAT HISTORY
app.get("/api/messages/:otherUserId", protect, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.otherUserId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Chat history error:", error.message);
    res.status(500).json({ message: "Unable to load chat history" });
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:8081",
      "http://127.0.0.1:8081",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    if (!userId) {
      console.log("Cannot join room: user ID missing");
      return;
    }

    socket.join(String(userId));
    console.log(`User ${userId} joined chat room`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { sender, receiver, text } = data || {};

      if (!sender || !receiver || !text?.trim()) {
        console.log("Message rejected: sender, receiver, or text missing");
        return;
      }

      const message = await Message.create({
        sender,
        receiver,
        text: text.trim(),
      });

      io.to(String(receiver)).emit("receiveMessage", message);
      io.to(String(sender)).emit("receiveMessage", message);
    } catch (error) {
      console.error("Message Error:", error.message);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket Disconnected:", socket.id, reason);
  });

  socket.on("error", (error) => {
    console.error("Socket Error:", error.message);
  });
});

// Start HTTP and Socket.IO together
server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
