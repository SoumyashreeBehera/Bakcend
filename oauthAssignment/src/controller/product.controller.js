const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const Product = require("../model/product.model");
const { authorize, authorizeOne } = require("../middleware/authorize");

router.get(
  "",
  authenticate,
  authorize(["admin", "seller"]),
  async (req, res) => {
    try {
      const product = await Product.find().lean().exec();
      return res.status(200).json({ data: product });
    } catch (err) {
      return res.status(401).send("you are not allowed to visit this page");
    }
  }
);

router.patch("/:id", authenticate, authorizeOne(), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).json({ data: product });
  } catch (err) {
    return res.send("you are not allowed to visit this page");
  }
});

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json({ data: product });
  } catch (err) {
    return res.status(401).send("you are not allowed to visit this page");
  }
});

module.exports = router;
// , req.body, {
//       new: true,
//     }
