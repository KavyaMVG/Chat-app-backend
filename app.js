require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");
const contactsRouter = require("./routes/contacts");
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
