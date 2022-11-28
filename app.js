const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const userRouter = require("./routes/user");
const contactsRouter = require("./routes/contact");
const chatRouter = require("./routes/chat");

const PORT = process.env.PORT;
const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connected", (socket) => {
  console.log(socket.id);
});

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use("/user", userRouter);
app.use("/contact", contactsRouter);
app.use("/chat", chatRouter);

app.listen(PORT, async () => {
  console.log(`Listening on port:${PORT}`);
  database.connect();
});

//first get all chats
// get all chats for given sender receiver id
// get all chats for given sender id
// get all chats for given receiver id(optional)
//delete  chats for given chat id
