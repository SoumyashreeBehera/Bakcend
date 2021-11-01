const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    //first check if the user exisets or not
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    //if exists throw an error
    if (user)
      return res
        .status(400)
        .json({ status: "failed", message: "user already exist" });

    //otherwise create a user and then hash the password
    user = await User.create(req.body);

    //create a token
    const token = newToken(user);

    //then send token and user information to the froentend
    console.log(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

const login = async (req, res) => {
  try {
    //check if user is already exists or not
    let user = await User.findOne({ email: req.body.email }).exec();

    //if not exist throw an error
    if (!user)
      return res
        .status(400)
        .json({ status: "failed", message: "user does not exist" });

    // check for password
    const match = user.checkPassword(req.body.password);

    //if password is not matched then throw an error
    if (!match)
      return res
        .status(400)
        .json({ status: "failed", message: "Incorrect password" });

    //if matched create an token
    const token = newToken(user);

    //return the token with the user data
    return res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

module.exports = { register, login };
