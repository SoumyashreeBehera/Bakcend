const express = require("express");
const app = express();
const connect = require("./config/db");
const { register, login } = require("./controller/user.controller");
const postController = require("./controller/post.controller");

app.use(express.json());
app.post("/register", register);
app.post("/login", login);
app.use("/post", postController);

app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});
