require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");
const contactsRouter = require("./routes/contact");
const chatRouter = require("./routes/chat");
const groupChatRouter = require("./routes/groupChat");
const { chat } = require("./models/chat");

const groupRouter = require("./routes/group");

const PORT = process.env.PORT;
const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  console.log("io connected!");
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
app.use("/group", groupRouter);
app.use("/groupChat", groupChatRouter);

app.listen(PORT, async () => {
  console.log(`Listening on port: ${PORT}`);
  database.connect();
});
