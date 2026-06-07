const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const http = require("http");

dotenv.config();

const app = express();

const server = http.createServer(app);

// SOCKET
const socket = require("./socket");

const io = socket.init(server);

require(
  "./cron/reminders.js"
);
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
const taskRoutes = require("./routes/taskRoutes");

const authRoutes = require("./routes/authRoutes");

app.use("/api/tasks", taskRoutes);

app.use("/api/auth", authRoutes);

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    server.listen(5000, () => {
      console.log(
        "Server running on port 5000"
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });