const secretKey = process.env.secretKey;

var jwt = require("jsonwebtoken");
const BlacklistedTokenModel = require("../models/blacklistedModel");

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // When your token is stored in cookies
    const { token } = req.cookies;
    console.log("token inside middleware", token);
    // Check if the token is blacklisted
    const blacklistedToken = await BlacklistedTokenModel.find({});

    if (blacklistedToken.includes(token)) {
      return res.status(401).json({
        message: "Invalid token , already exists in blacklist.",
        error: error.message,
      });
    }
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.send({ "Forbidden request, not able to verify token": error }); // Forbidden
  }
};

module.exports = { verifyToken };
