const express = require("express");
const router = express.Router();
const fs = require("fs");
const upload = require("../middleware/file-upload");
const Gallery = require("../model/gallery.model");
const User = require("../model/user.model");

router.post("/single", upload.single("productImages"), async (req, res) => {
  const files = req.file.path;
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: files,
    });
    return res.status(201).json({ data: user });
  } catch (err) {
    fs.unlinkSync(files);
    return res.status(400).json({ status: "failed", message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    // console.log(user);
    return res.status(201).json({ data: user });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err });
  }
});

router.patch("/:id", upload.single("productImages"), async (req, res) => {
  const files = { profile_pic: req.file.path };
  try {
    const user = await User.findById(req.params.id).lean().exec();
    fs.unlinkSync(user.profile_pic);
    const newUser = await User.findByIdAndUpdate(req.params.id, files, {
      new: true,
    });
    return res.status(201).json({ data: newUser });
  } catch (err) {
    fs.unlinkSync(files);
    return res.status(400).json({ status: "failed", message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    fs.unlinkSync(user.profile_pic);

    const [gallery] = await Gallery.find({ userId: req.params.id })
      .lean()
      .exec();
    if (gallery) gallery.gallery_pics.map((el) => fs.unlinkSync(el));
    if (gallery) {
      await Gallery.find({ userId: req.params.id }).deleteOne().lean().exec();
    }
    await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).json({ data: user });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
});

module.exports = router;
