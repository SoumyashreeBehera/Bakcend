const express = require("express");
const router = express.Router();
const upload = require("../middleware/file-upload");
const fs = require("fs");
const Gallery = require("../model/gallery.model");
// const path = require("path");

router.post("/multiple", upload.any("productImages"), async (req, res) => {
  const files = req.files.map((el) => el.path);
  try {
    const gallery = await Gallery.create({
      userId: req.body.userId,
      gallery_pics: files,
    });
    return res.status(201).json({ data: gallery });
  } catch (err) {
    files.map((path) => {
      fs.unlinkSync(path);
    });
    return res.status(401).json({ status: "failed", message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id).exec();
    return res.status(201).json({ data: gallery });
  } catch (err) {
    return res.status(401).json({ status: "failed", message: err });
  }
});
router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.find().populate("userId").lean().exec();
    return res.status(201).json({ data: gallery });
  } catch (err) {
    return res.status(401).json({ status: "failed", message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id).exec();
    gallery.gallery_pics.map((el) => fs.unlinkSync(el));

    Gallery.findByIdAndDelete(req.params.id).lean().exec();
    let galleryPics = gallery.gallery_pics;

    //if gallery pics name is in filename then use below

    // galleryPics.map((filepath) => {
    //   fs.unlinkSync(path.join(__dirname, `../uploads/${filepath}`));
    // });
    return res.status(201).json({ data: gallery });
  } catch (err) {
    return res.status(401).json({ status: "failed", message: err });
  }
});

module.exports = router;
