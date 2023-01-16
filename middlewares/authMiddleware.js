const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const apiMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    if (!authHeader) {
      return res.status(401).json({ meg: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .json({ sucess: false, msg: "Forbidden accesssss!!" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({ meg: "Unauthorized access" });
  }
};
const verifyAdminMiddleware = async (req, res, next) => {
  try {
    const requestEmail = req.decoded.email;
    const requesterAccount = await User.findOne({ email: requestEmail });
    if (requesterAccount.role === "admin") {
      next();
    } else {
      res.status(403).send({ message: "forbidden access" });
    }
  } catch (error) {
    res.status(403).send({ message: "forbidden access" });
  }
};
module.exports = { apiMiddleware, verifyAdminMiddleware };
