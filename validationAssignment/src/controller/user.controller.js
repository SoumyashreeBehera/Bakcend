const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("first_name")
    .isLength({ min: 2 })
    .withMessage("Please give a valid first name"),
  body("last_name")
    .isLength({ min: 2 })
    .withMessage("Please give a valid last name"),
  body("email").isEmail().withMessage("required and should be a valid email"),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("required and should be exactly 6 numbers"),
  body("age")
    .notEmpty()
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("required and should be between 1 and 100");
      }
      return true;
    }),
  body("gender")
    .notEmpty()
    .custom((value) => {
      if (value != "Male" && value != "Female" && value != "Others")
        throw new Error("required and should be either Male, Female or Others");
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ data: errors.array() });
      }
      const user = await User.create(req.body);
      return res.status(201).json({ data: user });
    } catch (err) {
      res.status(400).json({ status: "failed", message: err });
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err });
  }
});

module.exports = router;
