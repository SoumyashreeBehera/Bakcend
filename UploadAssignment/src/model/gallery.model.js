const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      requierd: true,
    },
    gallery_pics: [{ type: String, requierd: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Gallery = mongoose.model("gallery", gallerySchema);
module.exports = Gallery;
