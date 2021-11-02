require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  //chcck if autherization header is present or not
  const bearerToken = req?.headers?.authorization;

  //if not present then throw an error
  if (!bearerToken)
    return res.status(400).json({ status: "do not have the header" });

  //else check it contains bearer
  //if dont have any bearer then throw an error
  if (!bearerToken.startsWith("Bearer "))
    return res.status(400).json({ status: "do not have the bearer" });

  //extract token from the bearer
  const token = bearerToken.split(" ")[1];

  //try to fetch the user from token
  try {
    const user = await verifyToken(token);
    req.user = user.user;
    return next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
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

module.exports = authenticate;
