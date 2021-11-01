const express = require("express");
const router = express.Router();
const Post = require("../model/post.model");
const atuhenticate = require("../middleware/authenticate");

router.post("", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json({ data: post });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err });
  }
});

router.get("", atuhenticate, async (req, res) => {
  try {
    const post = await Post.find(req.body).lean().exec();
    return res.status(201).json({ data: post });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err });
  }
});

module.exports = router;
