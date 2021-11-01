require("dotenv").config();
const jwt = require("jsonwebtoken");

const atuhenticate = async (req, res, next) => {
  //check if authrization header is present
  const bearerToken = req?.headers?.authorization;

  //if not throw an error
  if (!bearerToken)
    return res.status(400).json({ message: "Dont have any header" });

  //check if autherization token has a bearer token if not throw an error
  if (!bearerToken.startsWith("Bearer "))
    return res.status(400).json({ message: "Dont have any Bearer" });

  //extract the token from the bearer token
  const token = bearerToken.split(" ")[1];

  //decrypt the token and try to fetch the user
  try {
    const user = await verifyToken(token);
    console.log("user", user.user);
    req.user = user.user;
    return next();
  } catch (err) {
    return res.status(400).json({ message: err.message, status: "failed" });
  }
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, user) {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

module.exports = atuhenticate;
