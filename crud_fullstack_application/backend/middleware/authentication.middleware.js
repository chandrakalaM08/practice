var jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;
const { BlackListModel } = require("../models/blackListModel");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1] || null;

    let existingBlacklist = await BlackListModel.find({
      tokens: { $in: token },
    });

    if (existingBlacklist[0]?.tokens.includes(token)) {
      res
        .status(400)
        .send({ msg: "You are not logged in , Please login again !!" });

      return;
    }

    let decoded = jwt.verify(token, secretKey);

    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (error) {
    res
      .status(500)
      .send({ msg: `Something went wrong inside middleware , ${error}` });
  }
};

module.exports = { authMiddleware };
