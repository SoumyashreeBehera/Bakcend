const express = require("express");
const sendMail = require("../utils/sendMail");
const User = require("../models/user.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    await sendMail({
      to: user.email,
      subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
      text: `Hi ${user.first_name}, Please confirm your email address`,
    });
    return res.status(201).json({ data: user });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const user = await User.create(req.body); //middleware will be used here to convert req body to json object

    await sendMail({
      to: user.email,
      subject: `${user.first_name} ${user.last_name} has registered with us`,
      text: `Please welcome ${user.first_name} ${user.last_name}`,
    });

    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    const offset = (page - 1) * size;

    const user = await User.find().skip(offset).limit(size).lean().exec();
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err });
  }
});

module.exports = router;
