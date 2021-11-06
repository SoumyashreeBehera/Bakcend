const express = require("express");
const connect = require("./config/db");
const {
  register,
  login,
  getOne,
  getEveryOne,
} = require("./controller/user.controller");
const productController = require("./controller/product.controller");
const passport = require("./config/passport");
const app = express();

app.use(express.json());
app.post("/register", register);
app.post("/login", login);
app.get("/login", getEveryOne);

app.patch("/user/:id", getOne);
app.use(passport.initialize());
app.use("/product", productController);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/auth/google/failure", function (req, res) {
  return res.send("something went wrong");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    return res.send(req.user);
  }
);

app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});
