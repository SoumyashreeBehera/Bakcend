const express = require("express");
const connect = require("./config/db");
const userController = require("./controller/user.controller");
const app = express();
app.use(express.json());
app.use("/users", userController);

app.use(function (req, res, next) {
  return res.status(404).send("No route found yeah");
});
app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});
