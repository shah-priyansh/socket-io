import express from "express";

import dotenv from "dotenv";
dotenv.config();

import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";

import morgan from "morgan";

import "express-async-errors";

import { createServer } from "http";

//socket
import { Server } from "socket.io";

//connect DB
import connectDB from "./db/connect.js";

import cors from "cors";

//routes
import chatRoute from "./routes/chat.js";
import messageRoute from "./routes/message.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("Server Running!");
});

app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/message", messageRoute);

const port = process.env.PORT || 5000;
const server = createServer(app);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server Running on port : ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //connected to correct id
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
