const express = require("express");
const router = express.Router();
const Product = require("../model/user.model");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("name").isLength({ min: 2 }).withMessage("yes good you did it"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ data: errors.array() });
      }
      const product = await Product.create(req.body);
      return res.status(201).json({ data: product });
    } catch (err) {
      res.status(400).json({ status: "failed", message: err });
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    return res.status(200).json({ data: product });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err });
  }
});

module.exports = router;
