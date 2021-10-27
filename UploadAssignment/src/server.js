const express = require("express");
const connect = require("./config/db");
const userController = require("./controller/user.controller");
const galleryController = require("./controller/gallery.controller");
const app = express();
app.use(express.json());
app.use("/users", userController);
app.use("/gallery", galleryController);

app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});
