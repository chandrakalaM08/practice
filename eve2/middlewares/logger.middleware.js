const fs = require("fs");
const logger = (req, res, next) => {
  let logText = `URL: ${req.url}, Method: ${
    req.method
  }, Timestamp: ${new Date().toString()}\n`;

  fs.appendFileSync("./logs.txt", logText);
  next();
};

module.exports = {
  logger,
};

//+0.5
