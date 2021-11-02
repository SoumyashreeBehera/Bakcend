const Product = require("../model/product.model");
const authorize = (givenRoles) => {
  return function (req, res, next) {
    const user = req.user;
    const isPermittedArray = user.roles.filter((role) =>
      givenRoles.includes(role)
    );
    if (isPermittedArray.length == 0)
      return res.status(401).send("ypu are not permitted");
    return next();
  };
};
const authorizeOne = () => {
  return async function (req, res, next) {
    let product = await Product.findById(req.params.id).lean().exec();
    // console.log("product:", product);
    const user = req.user;
    if (user.roles.includes("admin")) return next();
    else if (user.roles.includes("seller") && user._id === product.sellerId)
      return next();
    // if (isPermittedArray.length == 0)
    return res.status(401).send("ypu are not permitted");
  };
};

module.exports = { authorize, authorizeOne };
