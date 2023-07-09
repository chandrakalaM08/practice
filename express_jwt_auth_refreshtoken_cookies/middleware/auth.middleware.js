const secretKey = process.env.secretKey;

var jwt = require("jsonwebtoken");
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // When your token is stored in cookies
  const { token } = req.cookies;
  console.log("token inside middleware", token);
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.send({ "Forbidden request, not able to verify token": error }); // Forbidden
  }
};

module.exports = { verifyToken };
