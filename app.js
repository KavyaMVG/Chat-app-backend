require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");
const contactsRouter = require("./routes/contact");
const chatRouter = require("./routes/chat");
const { chat } = require("./models/chat");

const PORT = process.env.PORT;
const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  socket.on("message", async (payload) => {
    const { msg, senderId, receiverId } = payload.data;
    const data = {
      msg,
      senderId,
      users: [senderId, receiverId],
    };
    const chatModel = new chat(data);
    const response = await chatModel.save();
    io.emit("message", response);
  });
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/user", userRouter);
app.use("/contact", contactsRouter);
app.use("/chat", chatRouter);

app.listen(PORT, async () => {
  console.log(`Listening on port: ${PORT}`);
  database.connect();
});
