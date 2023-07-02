const auth = (req, res, next) => {
  if (req.query.role === "admin" && req.query.pass === "saveEarth") {
    next();
  } else {
    res.send({ message: "Not Authorized" });
  }
};

module.exports = {
  auth,
};

//+1
